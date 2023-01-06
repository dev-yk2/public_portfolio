import Styled from 'styled-components'
import React from 'react'

type Props = {
  classNameList?: string[]
  onClick: () => void
  text: string
}

const StepButton: React.FC<Props> = (props) => {
  let classNames = ''
  if (props.classNameList !== undefined) {
    classNames = props.classNameList.join(' ')
  }

  return (
    <StyledButton
      className={classNames}
      onClick={() => {props.onClick()}}
    >
      {props.text}
    </StyledButton>
  )
}

export default StepButton

const StyledButton = Styled.button`
  position: relative;
  margin: 0.6em;
  padding: 0.8em 2.4em;
  border: 1px solid #fff;
  border-radius: 2em;
  &.arrowLeft {
    &::before {
      content: "";
      position: absolute;
      left: 1em;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      display: block;
      width: 0.6em;
      height: 0.6em;
      border-bottom: 1px solid #fff;
      border-left: 1px solid #fff;
    }
  }
  &.arrowRight {
    &::after {
      content: "";
      position: absolute;
      right: 1em;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      display: block;
      width: 0.6em;
      height: 0.6em;
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }
  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`
