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

const ButtonBasic: React.FC<Props> = (props) => {
  return (
    <StyledButton
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
      hoverStyles={props.hoverStyles}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  )
}

const StyledButton = styled.button<TypeGenerateStylesProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2em 1em 0.1em;
  border: 1px solid ${styles['--color-border-default']};
  border-radius: 2em;
  background-color: ${styles['--color-background-default']};
  white-space: nowrap;
  transition: all 0.2s;
  &:hover {
    border-color: ${styles['--color-border-accent']};
    background-color: ${styles['--color-background-sub']};
  }
  ${(props) => generateStyles(props)}
`

export default ButtonBasic
