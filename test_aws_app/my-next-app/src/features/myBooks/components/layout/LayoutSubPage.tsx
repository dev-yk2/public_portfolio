import React, { ReactNode } from 'react'

// components
import ContainerStyled from '@/features/myBooks/components/layout/Container.styled'
import ContainerInnerStyled from '@/features/myBooks/components/layout/ContainerInner.styled'
import Footer from '@/features/myBooks/components/layout/footer/Footer'
import HeaderSubPage from '@/features/myBooks/components/layout/header/HeaderSubPage'
import styles from '@/features/myBooks/const/styles'

type Props = {
  pageTitle: string
  children: ReactNode
}

const LayoutSubPage: React.FC<Props> = (props) => {
  return (
    <ContainerStyled
      styles={{
        height: '100%',
      }}
    >
      <ContainerStyled
        styles={{
          height: styles['--height-menu-isbn'],
          'background-color': styles['--color-background-sub'],
          'border-bottom': `1px solid ${styles['--color-border-default']}`,
        }}
        // breakPoint={styles['--break-point']}
        // spStyles={{
        //   'background-color': '#ff0000',
        // }}
      >
        <ContainerInnerStyled
          styles={{
            height: '100%',
          }}
          // breakPoint={styles['--break-point']}
          // spStyles={{
          //   'background-color': '#ff0000',
          // }}
        >
          <HeaderSubPage pageTitle={props.pageTitle} />
        </ContainerInnerStyled>
      </ContainerStyled>

      <ContainerStyled
        styles={{
          overflow: 'auto',
          height: `calc(100% - ${styles['--height-menu-isbn']} - ${styles['--height-footer-default']})`,
        }}
      >
        <ContainerInnerStyled
          styles={
            {
              // 'height': '100%',
            }
          }
        >
          {props.children}
        </ContainerInnerStyled>
      </ContainerStyled>

      <ContainerStyled
        styles={{
          height: `${styles['--height-footer-default']}`,
          'background-color': styles['--color-background-sub'],
          'border-top': `1px solid ${styles['--color-border-default']}`,
        }}
      >
        <ContainerInnerStyled
          styles={{
            height: '100%',
          }}
        >
          <Footer />
        </ContainerInnerStyled>
      </ContainerStyled>
    </ContainerStyled>
  )
}

export default LayoutSubPage
