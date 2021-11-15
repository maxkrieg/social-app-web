import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/react'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useRegisterMutation } from '../generated/graphql'

interface Props {}

const Register: React.FC<Props> = () => {
  const [_, register] = useRegisterMutation()
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
