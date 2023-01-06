import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Menu from './Menu'
import Functions from './Functions'

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <StyledDiv>
      <Functions />
      <Menu />
      {props.children}
    </StyledDiv>
  )
}

export default Layout

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`