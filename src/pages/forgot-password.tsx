import React, { useState } from 'react'
import { Box, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface Props {}

const ForgotPassword: NextPage<Props> = () => {
  const [_, forgotPassword] = useForgotPasswordMutation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <Wrapper variant='small'>
      <Heading size='lg'>Forgot Password</Heading>
      {!isSubmitted && (
        <Box mt={4} mb={4}>
          Enter your email below to reset your password
        </Box>
      )}
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async values => {
          await forgotPassword(values)
          setIsSubmitted(true)
        }}
      >
        {({ isSubmitting }) =>
          isSubmitted ? (
            <Box mt={4}>
              If an account with that email exists, we sent you a link to reset your password
            </Box>
          ) : (
            <Form>
              <InputField name='email' placeholder='email' label='Email' type='email' />
              <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
                submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
