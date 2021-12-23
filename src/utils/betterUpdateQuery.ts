import { Cache, QueryInput } from '@urql/exchange-graphcache'

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateFunc: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(queryInput, data => updateFunc(result, data as any) as any)
}
