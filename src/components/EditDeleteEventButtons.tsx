import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton, useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { useDeleteEventMutation } from '../generated/graphql'

interface Props {
  eventId: string
  onDelete?: () => void
}

export const EditDeleteEventButtons: React.FC<Props> = ({ eventId, onDelete = () => {} }) => {
  const toast = useToast()
  const [_, deleteEvent] = useDeleteEventMutation()
  return (
    <Box>
      <NextLink href='/event/edit/[id]' as={`/event/edit/${eventId}`}>
        <IconButton
          href={`/event/edit/${eventId}`}
          aria-label='Edit event'
          size='sm'
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label='Delete event'
        size='sm'
        ml={2}
        icon={<DeleteIcon />}
        onClick={async () => {
          await deleteEvent({ id: eventId })
          toast({
            title: 'Event deleted',
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
