import React from 'react'
import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentUserQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const router = useRouter()
  const [{ data, fetching }] = useCurrentUserQuery({
    pause: isServer()
  })

  const handleLogout = async () => {
    await logout()
    router.reload()
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
      <Flex align='center'>
        <NextLink href='/create-post'>
          <Button as={Link} mr={6}>
            + create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.currentUser.username}</Box>
        <Button variant='link' onClick={handleLogout} isLoading={logoutFetching}>
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex zIndex={1} position='sticky' top={0} bg='tan' p={4} align='center'>
      <Flex flex={1} m='auto' align='center' maxW={800}>
        <Heading>
          <NextLink href='/'>
            <Link>Social App</Link>
          </NextLink>
        </Heading>
        <Box ml='auto'>{body}</Box>
      </Flex>
    </Flex>
  )
}
