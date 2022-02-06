import React from 'react'
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'

interface Props {}

const Login: React.FC<Props> = () => {
  const router = useRouter()
  const [_, login] = useLoginMutation()
  return (
    <Wrapper variant='small'>
      <Heading size='lg' mb={4}>
        Login
      </Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values })
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='email' placeholder='john@exampled.com' label='Email' type='email' />
            <Box mt={4}>
              <InputField name='password' label='Password' type='password' />
            </Box>
            <Flex mt={2}>
              <NextLink href='/forgot-password'>
                <Link ml='auto'>forgot password?</Link>
              </NextLink>
            </Flex>
            <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
