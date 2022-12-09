import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Header from './Header'

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <StyledDiv>
      <Header />
      <main>
        {props.children}
      </main>
    </StyledDiv>
  )
}

export default Layout

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  main {
    position: relative;
    flex: 1;
    overflow: auto;
  }
`
