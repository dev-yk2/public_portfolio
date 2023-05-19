import React, { ReactNode } from 'react'
import styled from 'styled-components'

// import * as Utils from '@/features/bookshelf/utils'
import generateStyles, {
  TypeGenerateStylesProps,
} from '../../utils/generateStyles'

type Props = TypeGenerateStylesProps & {
  children: ReactNode
}

const ContainerStyled: React.FC<Props> = (props) => {
  // console.log('[props]', props)
  return (
    <Container
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
    >
      {props.children}
    </Container>
  )
}

const Container = styled.div<TypeGenerateStylesProps>`
  /* height: 100%; */
  ${(props) => generateStyles(props)}
`

export default ContainerStyled
