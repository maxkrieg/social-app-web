import React, { useState } from 'react'
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'

import { EditDeletePostButtons } from '../components/EditDeletePostButtons'
import Layout from '../components/Layout'
import { UpvoteSection } from '../components/UpvoteSection'
import { useCurrentUserQuery, usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [queryVariables, setQueryVariables] = useState({
    limit: 15,
    cursor: null as string | null
  })
  const [{ data, fetching, error }] = usePostsQuery({ variables: queryVariables })
  const [{ data: userData }] = useCurrentUserQuery()

  if (!fetching && !data && error) {
    return <div>Error getting posts: {error?.message}</div>
  }
  return (
    <Layout>
      <Flex justifyContent='center'>
        <Heading mt={5} mb={10} fontSize={28}>
          All Posts
        </Heading>
      </Flex>
      {!data && fetching && <div>loading...</div>}
      {data && (
        <>
          <Stack>
            {data.posts.posts.map(post => {
              if (!post) return null
              const isUserOwnPost = userData?.currentUser?.id === post.user.id
              return (
                <Flex key={post.id} p={5} shadow='md' borderWidth='1px'>
                  <UpvoteSection post={post} />
                  <Box flex={1}>
                    <NextLink href='/post/[id]' as={`/post/${post.id}`}>
                      <Link>
                        <Heading fontSize='xl'>{post.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text mt={2} fontSize={12}>
                      posted by {post.user.username} on{' '}
                      {new Date(parseInt(post.createdAt)).toLocaleString()}
                    </Text>
                    <Flex mt={4} align='center'>
                      <Text>{post.textSnippet}</Text>
                      {!isUserOwnPost ? null : (
                        <Box ml='auto'>
                          <EditDeletePostButtons postId={post.id} />
                        </Box>
                      )}
                    </Flex>
                  </Box>
                </Flex>
              )
            })}
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
