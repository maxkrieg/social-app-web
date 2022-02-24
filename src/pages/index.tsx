import React from 'react'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'

import Layout from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({ variables: { limit: 30 } })

  if (!fetching && !data) {
    return <div>Error getting posts</div>
  }
  return (
    <Layout>
      <Flex align='center'>
        <Heading>Social App</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>+ create post</Link>
        </NextLink>
      </Flex>
      <div style={{ height: '50px' }} />
      {!data && fetching && <div>loading...</div>}
      {data && (
        <>
          <Stack>
            {data.posts.map(post => (
              <Box key={post.id} p={5} shadow='md' borderWidth='1px'>
                <Heading fontSize='xl'>{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
                <Text mt={4} fontSize={12}>
                  {new Date(parseInt(post.createdAt)).toLocaleString()}
                </Text>
              </Box>
            ))}
          </Stack>
          <Flex>
            <Button isLoading={fetching} m='auto' my={8}>
              Load more
            </Button>
          </Flex>
        </>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
