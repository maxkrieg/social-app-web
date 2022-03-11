import { useRouter } from 'next/router'
import { usePostQuery } from '../generated/graphql'

export const useGetPost = () => {
  const router = useRouter()
  const { id } = router.query
  const parsedId = id && typeof id === 'string' && parseInt(id.toString()) !== NaN ? id : ''
  return usePostQuery({ pause: !parsedId, variables: { id: parsedId } })
}
