import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/react'
import { useMutation } from 'urql'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'

const REGISTER_MUTATION = `
  mutation Register($email: String!, $password: String!) {
    register(options: {email: $email, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`

interface Props {}

const Register: React.FC<Props> = () => {
  const [_, register] = useMutation(REGISTER_MUTATION)
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          console.log(values)
          return register(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='email' placeholder='john@exampled.com' label='Email' type='email' />
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

export default Register
