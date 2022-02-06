import React from 'react'
import { Box, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'

import { InputField } from '../components/InputField'
import Layout from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useIsAuth } from '../utils/useIsAuth'

interface Props {}

const CreatPost: NextPage<Props> = () => {
  const router = useRouter()
  useIsAuth()
  const [_, createPost] = useCreatePostMutation()

  return (
    <Layout variant='small'>
      <Heading size='lg' mb={4}>
        Create Post
      </Heading>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async values => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='Post title' label='Title' />
            <Box mt={4}>
              <InputField name='text' label='Body' placeholder='text...' textarea />
            </Box>
            <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
              Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatPost)
