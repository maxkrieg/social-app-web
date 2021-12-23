import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange } from 'urql'
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation
} from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
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
    ssrExchange,
    fetchExchange
  ],
  fetchOptions: {
    credentials: 'include' as const
  }
})
