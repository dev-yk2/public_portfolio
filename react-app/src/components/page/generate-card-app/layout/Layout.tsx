import React, { ReactNode } from 'react'
import styled from 'styled-components'

import Header from './Header'

type Props = {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <StyledDiv>
      <Header
        title="Generate Card App"
      />
      <main>
        {props.children}
      </main>
    </StyledDiv>
  )
}

export default Layout

const StyledDiv = styled.div`
  main {
    margin: 0 auto;
    padding: 0 30px;
    width: 100%;
    max-width: 860px;
  }
`