import { ChakraProvider } from '@chakra-ui/react'
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache'
import { devtoolsExchange } from '@urql/devtools'
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation
} from '../generated/graphql'

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateFunc: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(queryInput, data => updateFunc(result, data as any) as any)
}

const client = createClient({
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
    fetchExchange
  ],
  fetchOptions: {
    credentials: 'include'
  }
})

import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
