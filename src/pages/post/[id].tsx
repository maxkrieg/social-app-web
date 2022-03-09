import { Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'

interface Props {}

const Post: React.FC<Props> = () => {
  const router = useRouter()
  const { id } = router.query
  const parsedId = id && typeof id === 'string' && parseInt(id.toString()) !== NaN ? id : ''
  const [{ data, fetching }] = usePostQuery({ pause: !parsedId, variables: { id: parsedId } })

  const { post } = data || {}

  if (fetching) {
    return <Layout>Loading...</Layout>
  }

  if (!post) {
    return <Layout>Could not find post</Layout>
  }
  return (
    <Layout>
      <Heading mb={4}>{post.title}</Heading>
      {post.text}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
