import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

import generateStyles, {
  TypeGenerateStylesProps,
} from '../../utils/generateStyles'

type Props = TypeGenerateStylesProps & {
  href: Url
  children: ReactNode
}

const LinkBasic: React.FC<Props> = (props) => {
  return (
    <StyledDiv
      styles={props.styles}
      breakPoint={props.breakPoint}
      spStyles={props.spStyles}
      hoverStyles={props.hoverStyles}
    >
      <Link href={props.href}>{props.children}</Link>
    </StyledDiv>
  )
}

const StyledDiv = styled.div<TypeGenerateStylesProps>`
  a {
    /* color: #007185; */
    &:hover {
      /* text-decoration: underline; */
      cursor: pointer;
      /* color: #C7511F; */
    }
    ${(props) => generateStyles(props)}
  }
`

export default LinkBasic
