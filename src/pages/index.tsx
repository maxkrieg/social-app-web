import React from 'react'
import { Link } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link>Create Post</Link>
      </NextLink>
      <br />
      {data &&
        data.posts.map(post => (
          <div id={post.id} key={post.id}>
            {post.title}
          </div>
        ))}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
