import { Heading, Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../../components/InputField'
import Layout from '../../../components/Layout'
import { useCurrentUserQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils/createUrqlClient'
import { isServer } from '../../../utils/isServer'
import { useGetPost } from '../../../utils/useGetPost'

interface Props {}

const EditPost: React.FC<Props> = () => {
  const router = useRouter()
  const [{ data, fetching }] = useGetPost()
  const [{ data: userData, fetching: userDataFetching }] = useCurrentUserQuery({
    pause: isServer()
  })
  const [, updatePost] = useUpdatePostMutation()
  const { post } = data || {}

  if (fetching || userDataFetching) {
    return <Layout>Loading...</Layout>
  }

  if (!post) {
    return <Layout>Could not find post</Layout>
  }

  if (post.user.id !== userData?.currentUser?.id) {
    return <Layout>Not authorized to edit this post</Layout>
  }

  return (
    <Layout variant='small'>
      <Heading size='lg' mb={4}>
        Update Post
      </Heading>
      <Formik
        initialValues={{ title: post.title, text: post.text }}
        onSubmit={async values => {
          const { error } = await updatePost({ id: post.id, ...values })
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
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(EditPost)
