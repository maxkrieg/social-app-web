import { DeletePostMutationVariables, VoteMutationVariables } from './../generated/graphql'
import { devtoolsExchange } from '@urql/devtools'
import { gql } from '@urql/core'
import { cacheExchange, Resolver } from '@urql/exchange-graphcache'
import Router from 'next/router'
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from 'urql'
import { pipe, tap } from 'wonka'
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { isServer } from './isServer'

const errorExchange: Exchange =
  ({ forward }) =>
  ops$ => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.toLowerCase().includes('unauthenticated')) {
          Router.replace('/login')
        }
      })
    )
  }

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info
    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const postsInCache = cache.resolve(cache.resolve(entityKey, fieldKey) as string, 'posts')
    info.partial = !postsInCache
    let hasMore = true
    const results: string[] = []
    fieldInfos.forEach(field => {
      const key = cache.resolve(entityKey, field.fieldKey) as string
      const data = cache.resolve(key, 'posts') as string[]
      const _hasMore = cache.resolve(key, 'hasMore') as boolean
      if (!_hasMore) {
        hasMore = _hasMore
      }
      results.push(...data)
    })

    return {
      __typename: 'PaginatedPosts',
      hasMore,
      posts: results
    }
  }
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = ''
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie
  }
  return {
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie ? { cookie } : undefined
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null
        },
        resolvers: {
          Query: {
            posts: cursorPagination()
          }
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, _info) => {
              cache.invalidate({ __typename: 'Post', id: (args as DeletePostMutationVariables).id })
            },
            vote: (result, args, cache, _info) => {
              console.log({ result, args })
              const { postId } = args as VoteMutationVariables
              const fragment = gql`
                fragment _ on Post {
                  id
                  points
                  voteStatus
                }
              `
              const postToUpdate = cache.readFragment(fragment, { id: postId })
              if (postToUpdate && result.vote) {
                cache.writeFragment(fragment, {
                  id: postId,
                  points: postToUpdate.points + result.vote,
                  voteStatus: args.value
                })
              }
            },
            createPost: (_result, _args, cache, _info) => {
              const allFields = cache.inspectFields('Query')
              const fieldInfos = allFields.filter(info => info.fieldName === 'posts')
              fieldInfos.forEach(fieldInfo => {
                const { arguments: fieldArguments } = fieldInfo
                cache.invalidate('Query', 'posts', fieldArguments)
              })
            },
            login: (queryResult, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                queryResult,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return {
                      currentUser: result.login.user
                    }
                  }
                }
              )
            },
            register: (queryResult, _args, cache, _info) => {
              betterUpdateQuery<RegisterMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                queryResult,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return {
                      currentUser: result.register.user
                    }
                  }
                }
              )
            },
            logout: (queryResult, _args, cache, _info) => {
              betterUpdateQuery<LogoutMutation, CurrentUserQuery>(
                cache,
                { query: CurrentUserDocument },
                queryResult,
                (result, query) => {
                  if (!result.logout) {
                    return query
                  } else {
                    return {
                      currentUser: null
                    }
                  }
                }
              )
            }
          }
        }
      }),
      errorExchange,
      ssrExchange,
      fetchExchange
    ]
  }
}
