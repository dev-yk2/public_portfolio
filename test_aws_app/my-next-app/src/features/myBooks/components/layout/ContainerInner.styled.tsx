import React, { ReactNode } from 'react'
import styled from 'styled-components'
import styles from '../../const/styles'

import generateStyles, {
  TypeGenerateStylesProps,
} from '../../utils/generateStyles'

type Props = TypeGenerateStylesProps & {
  children: ReactNode
}

const ContainerInnerStyled: React.FC<Props> = (props) => {
  return (
    <ContainerInner
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
    >
      {props.children}
    </ContainerInner>
  )
}

const ContainerInner = styled.div<TypeGenerateStylesProps>`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 30px;
  @media screen and (max-width: ${styles['--break-point']}px) {
    padding: 0 10px;
  }
  ${(props) => generateStyles(props)}
`

export default ContainerInnerStyled
