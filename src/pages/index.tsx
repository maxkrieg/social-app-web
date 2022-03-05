import React, { useState } from 'react'
import NextLink from 'next/link'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { withUrqlClient } from 'next-urql'

import Layout from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [queryVariables, setQueryVariables] = useState({
    limit: 15,
    cursor: null as string | null
  })
  const [{ data, fetching }] = usePostsQuery({ variables: queryVariables })

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
            {data.posts.posts.map(post => (
              <Flex key={post.id} p={5} shadow='md' borderWidth='1px'>
                <Flex alignItems='center' flexDirection='column' justifyContent='center' mr={4}>
                  <ChevronUpIcon boxSize={8} />
                  {post.points}
                  <ChevronDownIcon boxSize={8} />
                </Flex>
                <Box>
                  <Heading fontSize='xl'>{post.title}</Heading>
                  <Text mt={4}>{post.textSnippet}</Text>
                  <Text mt={4}>posted by {post.user.username}</Text>
                  <Text mt={4} fontSize={12}>
                    {new Date(parseInt(post.createdAt)).toLocaleString()}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Stack>
          {data && data.posts.hasMore && (
            <Flex>
              <Button
                onClick={() => {
                  setQueryVariables({
                    limit: queryVariables.limit,
                    cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
                  })
                }}
                isLoading={fetching}
                m='auto'
                my={8}
                variantColor='teal'
              >
                load more
              </Button>
            </Flex>
          )}
        </>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
