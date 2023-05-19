import React, { ReactNode } from 'react'

import ContainerStyled from './Container.styled'
import ContainerInnerStyled from './ContainerInner.styled'

type Props = {
  children: ReactNode
}

const LayoutLoginPage: React.FC<Props> = (props) => {
  return (
    <ContainerStyled
      styles={{
        height: '100%',
      }}
    >
      <ContainerInnerStyled
        styles={{
          display: 'flex',
          'flex-flow': 'nowrap column',
          'justify-content': 'center',
          'align-items': 'center',
          height: '100%',
        }}
      >
        {props.children}
      </ContainerInnerStyled>
    </ContainerStyled>
  )
}

export default LayoutLoginPage
