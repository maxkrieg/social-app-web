import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { useDeletePostMutation } from '../generated/graphql'

interface Props {
  postId: string
}

export const EditDeletePostButtons: React.FC<Props> = ({ postId }) => {
  const [_, deletePost] = useDeletePostMutation()
  return (
    <Box>
      <NextLink href='/post/edit/[id]' as={`/post/edit/${postId}`}>
        <IconButton
          href={`/post/edit/${postId}`}
          aria-label='Delete post'
          size='sm'
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label='Delete post'
        size='sm'
        ml={2}
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({ id: postId })
        }}
      />
    </Box>
  )
}
