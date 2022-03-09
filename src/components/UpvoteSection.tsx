import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'

interface Props {
  post: PostSnippetFragment
}

enum LoadingState {
  Upvote = 'Upvote',
  Downvote = 'Downvote',
  None = 'None'
}

export const UpvoteSection: React.FC<Props> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.None)
  const [_, vote] = useVoteMutation()
  return (
    <Flex alignItems='center' flexDirection='column' justifyContent='center' mr={4}>
      <IconButton
        aria-label='upvote'
        size='sm'
        icon={<ChevronUpIcon boxSize={6} />}
        isLoading={loadingState === LoadingState.Upvote}
        colorScheme={post.voteStatus === 1 ? 'green' : 'gray'}
        onClick={async () => {
          if (post.voteStatus === 1) return
          setLoadingState(LoadingState.Upvote)
          await vote({ value: 1, postId: post.id })
          setLoadingState(LoadingState.None)
        }}
      />
      {post.points}
      <IconButton
        aria-label='downvote'
        size='sm'
        icon={<ChevronDownIcon boxSize={6} />}
        isLoading={loadingState === LoadingState.Downvote}
        colorScheme={post.voteStatus === -1 ? 'red' : 'gray'}
        onClick={async () => {
          if (post.voteStatus === -1) return
          setLoadingState(LoadingState.Downvote)
          await vote({ value: -1, postId: post.id })
          setLoadingState(LoadingState.None)
        }}
      />
    </Flex>
  )
}
