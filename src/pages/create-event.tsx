import React from 'react'
import { Box, Button, Heading, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'

import { InputField } from '../components/InputField'
import Layout from '../components/Layout'
import { useCreateEventMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useIsAuth } from '../utils/useIsAuth'

interface Props {}

const CreateEvent: NextPage<Props> = () => {
  const toast = useToast()
  const router = useRouter()
  useIsAuth()
  const [_, createEvent] = useCreateEventMutation()

  return (
    <Layout variant='small'>
      <Heading size='lg' mb={4}>
        Create Event
      </Heading>
      <Formik
        initialValues={{ title: '', location: '', description: '' }}
        onSubmit={async values => {
          const { error } = await createEvent({ input: values })
          if (!error) {
            toast({
              title: 'Event created',
              status: 'success',
              duration: 3000,
              isClosable: true
            })
            router.push('/')
          }
        }}
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
                placeholder='Description...'
                textarea
              />
            </Box>
            <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreateEvent)
