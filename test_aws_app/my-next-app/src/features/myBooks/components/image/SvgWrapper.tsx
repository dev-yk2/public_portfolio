import React, { ReactNode } from 'react'
import styled from 'styled-components'

import generateStyles, {
  TypeGenerateStylesProps,
} from '../../utils/generateStyles'

type Props = TypeGenerateStylesProps & {
  children: ReactNode
}

const SvgWrapper: React.FC<Props> = (props) => {
  return <StyledDiv styles={props.styles}>{props.children}</StyledDiv>
}

const StyledDiv = styled.div<TypeGenerateStylesProps>`
  position: relative;
  width: 1em;
  height: 1em;
  ${(props) => generateStyles(props)}
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`

export default SvgWrapper
