import React, { ReactNode } from 'react'
import styled from 'styled-components'
import styles from '../../const/styles'

// import * as Utils from '@/features/bookshelf/utils'
import generateStyles, {
  TypeGenerateStylesProps,
} from '../../utils/generateStyles'

type Props = TypeGenerateStylesProps & {
  children: ReactNode
  onClick: () => void
}

const TagHasDeleteButton: React.FC<Props> = (props) => {
  return (
    <StyledDiv
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
    >
      {props.children}
      <button onClick={props.onClick}></button>
    </StyledDiv>
  )
}

const StyledDiv = styled.div<TypeGenerateStylesProps>`
  position: relative;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  display: inline-block;
  margin: 0 0.5em 0.5em 0;
  padding: 0.2em 2em 0.1em 0.5em;
  /* border: 1px solid ${styles['--color-border-default']}; */
  /* border-radius: 2em; */
  background-color: ${styles['--color-background-sub']};
  white-space: nowrap;
  /* transition: all 0.2s; */

  ${(props) => generateStyles(props)}
  button {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translate(50%, -50%);
    display: block;
    width: 1em;
    height: 1em;
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      width: 80%;
      height: 1px;
      background-color: ${styles['--color-font-default']};
    }
    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`

export default TagHasDeleteButton
