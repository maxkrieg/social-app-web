import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { useRouter } from 'next/router'
import { EditDeleteEventButtons } from '../../components/EditDeleteEventButtons'
import Layout from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetEvent } from '../../utils/useGetEvent'

interface Props {}

const Event: React.FC<Props> = () => {
  const router = useRouter()
  const [{ data, fetching }] = useGetEvent()

  const { event } = data || {}
  const { id, title, description, location, eventUsers } = event || {}

  const onDelete = () => {
    router.push('/')
  }

  if (fetching) {
    return <Layout>Loading...</Layout>
  }

  if (!event || !id) {
    return <Layout>Could not find event</Layout>
  }

  const eventHost = eventUsers?.find(eventUser => eventUser.role === 'host')
  return (
    <Layout>
      <Heading mb={4}>{title}</Heading>
      <Box>Host: {eventHost?.user.username}</Box>
      <Box mb={4}>Location: {location}</Box>
      <Box mb={4}>Description: {description}</Box>
      <EditDeleteEventButtons eventId={id} onDelete={onDelete} />
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Event)
