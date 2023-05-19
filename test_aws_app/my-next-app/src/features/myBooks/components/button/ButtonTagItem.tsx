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
  displayFlag: boolean
}

const ButtonTagItem: React.FC<Props> = (props) => {
  return (
    <StyledButton
      className={!props.displayFlag ? 'disabled' : undefined}
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  )
}

const StyledButton = styled.button<TypeGenerateStylesProps>`
  display: inline-block;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  margin: 0 0.4em 0.4em 0;
  padding: 0.2em 0.8em 0.1em;
  border: 1px solid ${styles['--color-border-default']};
  /* border-radius: 2em; */
  border-radius: 0.4em;
  border-color: ${styles['--color-border-default']};
  /* background-color: ${styles['--color-background-accent']}; */
  background-color: ${styles['--color-background-sub']};
  white-space: nowrap;
  font-size: 0.8em;
  transition: all 0.2s;
  &:hover {
    border-color: ${styles['--color-border-accent']};
    /* background-color: ${styles['--color-background-sub']}; */
    background-color: ${styles['--color-background-accent']};
  }
  &.disabled {
    background-color: ${styles['--color-background-sub']};
    opacity: 0.3;
    pointer-events: none;
  }
  ${(props) => generateStyles(props)}
`

export default ButtonTagItem
