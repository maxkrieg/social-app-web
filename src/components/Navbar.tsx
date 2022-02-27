import React from 'react'
import { Box, Flex, Link, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useCurrentUserQuery({
    pause: isServer()
  })

  const handleLogout = () => {
    logout()
  }

  let body
  if (fetching) {
    body = null
  } else if (!data?.currentUser) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.currentUser.username}</Box>
        <Button variant='link' onClick={handleLogout} isLoading={logoutFetching}>
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex zIndex={1} position='sticky' top={0} bg='tan' p={4}>
      <Box ml='auto'>{body}</Box>
    </Flex>
  )
}
