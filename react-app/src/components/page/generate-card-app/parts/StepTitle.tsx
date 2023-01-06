import Styled from 'styled-components'
import React from 'react'

type Props = {
  text: string
}

const StepTitle: React.FC<Props> = (props) => {
  return (
    <StyledP>
      {props.text}
    </StyledP>
  )
}

export default StepTitle

const StyledP = Styled.p`
  padding: 2em 0;
  font-size: 1.4em;
  font-weight: bold;
  text-align: center;
`
