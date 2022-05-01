import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { useRouter } from 'next/router'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons'
import Layout from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPost } from '../../utils/useGetPost'

interface Props {}

const Post: React.FC<Props> = () => {
  const router = useRouter()
  const [{ data, fetching }] = useGetPost()

  const { post } = data || {}

  const onDelete = () => {
    router.push('/')
  }

  if (fetching) {
    return <Layout>Loading...</Layout>
  }

  if (!post) {
    return <Layout>Could not find post</Layout>
  }
  return (
    <Layout>
      <Heading mb={4}>{post.title}</Heading>
      <Box mb={4}>{post.text}</Box>
      <EditDeletePostButtons postId={post.id} onDelete={onDelete} />
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
