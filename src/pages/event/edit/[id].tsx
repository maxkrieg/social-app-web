import { Heading, Box, Button, Flex, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { format } from 'date-fns'
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
  dateTime: string
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
    try {
      const { error } = await updateEvent({ id: event.id, ...values })
      if (error) {
        throw new Error('Error updating event')
      }
      toast({
        title: 'Event updated',
        status: 'success'
      })
      router.push(`/event/${event.id}`)
    } catch (err: any) {
      toast({
        title: err?.message || 'Error saving event',
        status: 'error'
      })
    }
  }

  const handleDeleteEvent = async () => {
    if (!event) return
    try {
      const { data, error } = await deleteEvent({ id: event.id })
      if (!data?.deleteEvent || error) {
        throw new Error('Error deleting event')
      }
      toast({
        title: 'Event deleted',
        status: 'success'
      })
      router.push('/')
    } catch (err: any) {
      toast({
        title: err.message || 'Error deleting event',
        status: 'error'
      })
    }
  }

  if (fetching || userDataFetching) {
    return <Layout>Loading...</Layout>
  }

  if (!event) {
    return <Layout>Could not find event</Layout>
  }

  const isCurrentUserHost = event?.eventUsers.some(
    ({ role, user }) => role === 'host' && user.id === userData?.currentUser?.id
  )

  if (!isCurrentUserHost) {
    return <Layout>Not authorized to edit this event</Layout>
  }

  const formattedDatetime = format(new Date(event.dateTime), "yyyy-MM-dd'T'HH:mm:ss")
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
            description: event.description,
            dateTime: formattedDatetime
          } as EditEventValues
        }
        onSubmit={handleUpdateEvent}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField name='title' placeholder='Event title' label='Title' />
              <Box mt={4}>
                <InputField name='location' placeholder='Event location' label='Location' />
              </Box>
              <Box mt={4}>
                <InputField
                  name='dateTime'
                  placeholder='Select Date and Time'
                  label='Date and Time'
                  type='datetime-local'
                />
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
          )
        }}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(EditEvent)
