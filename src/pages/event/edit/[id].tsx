import { Heading, Box, Button, Flex, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../../components/InputField'
import Layout from '../../../components/Layout'
import {
  useCurrentUserQuery,
  useDeleteEventMutation,
  useUpdateEventMutation
} from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { isServer } from '../../../utils/isServer'
import { useGetEvent } from '../../../utils/useGetEvent'

interface Props {}

interface EditEventValues {
  title: string
  location: string
  description: string
}

const EditEvent: React.FC<Props> = () => {
  const router = useRouter()
  const toast = useToast()
  const [{ data, fetching }] = useGetEvent()
  const [{ data: userData, fetching: userDataFetching }] = useCurrentUserQuery({
    pause: isServer()
  })
  const [, updateEvent] = useUpdateEventMutation()
  const [, deleteEvent] = useDeleteEventMutation()
  const { event } = data || {}

  const handleUpdateEvent = async (values: EditEventValues) => {
    if (!event) return
    const { error } = await updateEvent({ id: event.id, ...values })
    if (!error) {
      toast({
        title: 'Event saved',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      router.push('/')
    } else {
      toast({
        title: 'Error saving event',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleDeleteEvent = async () => {
    if (!event) return
    const { error } = await deleteEvent({ id: event.id })
    if (!error) {
      toast({
        title: 'Event deleted',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      router.push('/')
    } else {
      toast({
        title: 'Error deleting event',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  if (fetching || userDataFetching) {
    return <Layout>Loading...</Layout>
  }

  if (!event) {
    return <Layout>Could not find event</Layout>
  }

  if (event.user.id !== userData?.currentUser?.id) {
    return <Layout>Not authorized to edit this event</Layout>
  }

  return (
    <Layout variant='small'>
      <Heading size='lg' mb={4}>
        Update Event
      </Heading>
      <Formik
        initialValues={
          {
            title: event.title,
            location: event.location,
            description: event.description
          } as EditEventValues
        }
        onSubmit={handleUpdateEvent}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='Event title' label='Title' />
            <Box mt={4}>
              <InputField name='location' placeholder='Event location' label='Location' />
            </Box>
            <Box mt={4}>
              <InputField
                name='description'
                label='Description'
                placeholder='description...'
                textarea
              />
            </Box>
            <Flex flex={1}>
              <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
                Update
              </Button>
              <Button mt={4} ml='auto' onClick={handleDeleteEvent}>
                Delete
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(EditEvent)
