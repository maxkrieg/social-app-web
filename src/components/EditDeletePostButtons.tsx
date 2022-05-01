import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton, useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { useDeletePostMutation } from '../generated/graphql'

interface Props {
  postId: string
  onDelete?: () => void
}

export const EditDeletePostButtons: React.FC<Props> = ({ postId, onDelete = () => {} }) => {
  const toast = useToast()
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
        onClick={async () => {
          await deletePost({ id: postId })
          toast({
            title: 'Post deleted',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
          onDelete()
        }}
      />
    </Box>
  )
}
