import React from 'react'
import { Link, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [{ data }] = usePostsQuery({ variables: { limit: 30 } })
  return (
    <Layout>
      <NextLink href='/create-post'>
        <Link>Create Post</Link>
      </NextLink>
      <div style={{ height: '50px' }} />
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.posts.map(post => (
              <Tr id={post.id} key={post.id}>
                <Td>{post.title}</Td>
                <Td>{new Date(parseInt(post.createdAt)).toLocaleString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
