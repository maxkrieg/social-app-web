import React from 'react'
import { Wrapper, WrapperVariant } from './Wrapper'
import { NavBar } from './NavBar'

interface Props {
  variant?: WrapperVariant
}

const Layout: React.FC<Props> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}

export default Layout
