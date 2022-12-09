import React from 'react'
import styled from 'styled-components'

type Props = {
  onClick: () => void
  text: string
}

const PartsButton: React.FC<Props> = React.memo((props) => {
  return (
    <StyledButton
      onClick={props.onClick}
    >
      {props.text}
    </StyledButton>
  )
})

export default PartsButton

const StyledButton = styled.button`
  padding: 0.2em 0.6em;
  background-color: var(--root-bg-color-dark);
  border: 1px solid var(--root-bdr-color-main);
  border-radius: 0.4em;
  white-space: nowrap;
  &:not(:first-child) {
    margin-left: 0.6em;
  }
`
