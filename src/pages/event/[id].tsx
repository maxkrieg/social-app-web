import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { EditDeleteEventButtons } from '../../components/EditDeleteEventButtons'
import Layout from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetEvent } from '../../utils/useGetEvent'
import { useCurrentUserQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'

interface Props {}

const Event: React.FC<Props> = () => {
  const router = useRouter()
  const [{ data: userData, fetching: userDataFetching }] = useCurrentUserQuery({
    pause: isServer()
  })
  const [{ data, fetching }] = useGetEvent()

  const { event } = data || {}
  const { id, title, description, location, eventUsers, dateTime } = event || {}

  const onDelete = () => {
    router.push('/')
  }

  if (fetching || userDataFetching) {
    return <Layout>Loading...</Layout>
  }

  if (!event || !id) {
    return <Layout>Could not find event</Layout>
  }

  const formattedDateTime = dateTime && format(new Date(dateTime), 'PPpp')

  const eventHost = eventUsers?.find(eventUser => eventUser.role === 'host')
  return (
    <Layout>
      <Heading mb={4}>{title}</Heading>
      <Box>Host: {eventHost?.user.username}</Box>
      <Box mb={4}>Location: {location}</Box>
      <Box mb={4}>When: {formattedDateTime}</Box>
      <Box mb={4}>Description: {description}</Box>
      {eventHost?.user.id === userData?.currentUser?.id && (
        <EditDeleteEventButtons eventId={id} onDelete={onDelete} />
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Event)
