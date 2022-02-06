import React, { useState } from 'react'
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { InputField } from '../../components/InputField'
import { Wrapper } from '../../components/Wrapper'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'

interface Props {}

const ChangePassword: NextPage<Props> = () => {
  const router = useRouter()
  const [_, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')

  return (
    <Wrapper variant='small'>
      <Heading size='lg' mb={4}>
        Change Password
      </Heading>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { newPassword } = values
          const { query } = router
          const response = await changePassword({
            token: typeof query.token === 'string' ? query.token : '',
            newPassword
          })
          const errors = response.data?.changePassword.errors
          if (errors) {
            console.error({ errors })
            const errorMap = toErrorMap(errors)
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='newPassword'
              placeholder='new password'
              label='New Password'
              type='password'
            />
            {tokenError ? (
              <Flex>
                <Box mr={2} style={{ color: 'red' }}>
                  {tokenError}
                </Box>
                <NextLink href='/forgot-password'>
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme='teal'>
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
