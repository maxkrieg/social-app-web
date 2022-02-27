import React from 'react'
import { Box, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'

interface Props {}

const Register: React.FC<Props> = () => {
  const router = useRouter()
  const [_, register] = useRegisterMutation()
  return (
    <Wrapper variant='small'>
      <Heading size='lg' mb={4}>
        Register
      </Heading>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values })
          if (response.data?.register.errors) {
            console.error({ errors: response.data.register.errors })
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='email' placeholder='john@example.com' label='Email' type='email' />
            <InputField name='username' placeholder='john' label='Username' />
            <Box mt={4}>
              <InputField name='password' label='Password' type='password' />
            </Box>
            <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
