import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

const PartsButtonWrap: React.FC<Props> = React.memo((props) => {
  return (
    <StyledDiv>
      {props.children}
    </StyledDiv>
  )
})

export default PartsButtonWrap

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`
