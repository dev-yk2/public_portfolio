import React from 'react'
import styled from 'styled-components'

type Props = {
  type: string
  value: string
  placeholder?: string
  autocomplete?: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const PartsInput: React.FC<Props> = React.memo((props) => {

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setState(event.currentTarget.value)
  }

  return (
    <StyledInput
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      autoComplete={props.autocomplete}
      onChange={(e) => {onChangeInput(e)}}
    />
  )
})

export default PartsInput

const StyledInput = styled.input`
  padding: 0.4em;
  width: 100%;
  background-color: var(--root-bg-color-dark);
  border: 1px solid var(--root-bdr-color-main);
  &::placeholder {
    opacity: 0.6;
  }
`
