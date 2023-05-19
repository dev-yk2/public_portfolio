import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import * as Utils from '../../utils'

type Props = {
  src: string
  alt: string
  priority?: boolean
  styles?: {
    [key: string]: string
  }
}

const ImageBasic: React.FC<Props> = (props) => {
  return (
    <StyledDiv styles={props.styles}>
      <Image
        src={props.src}
        alt={props.alt}
        fill
        priority={props.priority ?? false}
        // sizes="100vw"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
      />
    </StyledDiv>
  )
}

type TypeStylesProps = {
  styles?: {
    [key: string]: string
  }
}

const StyledDiv = styled.div<TypeStylesProps>`
  position: relative;
  text-align: center;
  width: 100%;
  ${(props) => Utils.generateStyles(props)}
  img {
    object-fit: contain;
    position: relative !important;
    /* width: auto !important; */
  }
`

export default ImageBasic
