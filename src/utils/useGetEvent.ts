import { useRouter } from 'next/router'
import { useEventQuery } from '../generated/graphql'

export const useGetEvent = () => {
  const router = useRouter()
  const { id } = router.query
  const parsedId = id && typeof id === 'string' && parseInt(id.toString()) !== NaN ? id : ''
  return useEventQuery({ pause: !parsedId, variables: { id: parsedId } })
}
