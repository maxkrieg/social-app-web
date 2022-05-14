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

  const onDelete = () => {
    router.push('/')
  }

  if (fetching) {
    return <Layout>Loading...</Layout>
  }

  if (!event) {
    return <Layout>Could not find event</Layout>
  }
  return (
    <Layout>
      <Heading mb={4}>{event.title}</Heading>
      <Box mb={4}>{event.location}</Box>
      <Box mb={4}>{event.description}</Box>
      <EditDeleteEventButtons eventId={event.id} onDelete={onDelete} />
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Event)
