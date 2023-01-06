import Styled from 'styled-components'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const StepButtonWrap: React.FC<Props> = (props) => {
  return (
    <StyledDiv>
      {props.children}
    </StyledDiv>
  )
}

export default StepButtonWrap

const StyledDiv = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em 0;
`
