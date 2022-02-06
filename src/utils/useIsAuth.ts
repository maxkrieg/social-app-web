import router from 'next/router'
import { useEffect } from 'react'
import { useCurrentUserQuery } from '../generated/graphql'

export const useIsAuth = () => {
  const [{ data, fetching }] = useCurrentUserQuery()
  useEffect(() => {
    if (!fetching && !data?.currentUser) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [fetching, data, router])
}
