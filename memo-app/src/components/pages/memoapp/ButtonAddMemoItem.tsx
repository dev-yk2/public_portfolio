import React from 'react'
import styled from 'styled-components'

type Props = {
  onClick: (type: 'add') => void
}

const ButtonAddMemoItem: React.FC<Props> = (props) => {
  return (
    <StyledButton
     onClick={() => {props.onClick('add')}}
    ></StyledButton>
  )
}

export default ButtonAddMemoItem

const StyledButton = styled.button`
  position: absolute;
  right: 1em;
  bottom: 1em;
  width: 2.2em;
  height: 2.2em;
  background-color: var(--root-color-accent);
  border-radius: 50%;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    width: 60%;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
  }
  &::before {
    transform: translate(-50%, -50%);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`
