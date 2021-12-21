import React from 'react'
import { Box, Flex, Link, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useCurrentUserQuery } from '../generated/graphql'

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const [{ data, fetching }] = useCurrentUserQuery()
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
        <Box mr={2}>{data.currentUser.email}</Box>
        <Button variant='link'>logout</Button>
      </Flex>
    )
  }
  return (
    <Flex bg='tan' p={4}>
      <Box ml='auto'>{body}</Box>
    </Flex>
  )
}
