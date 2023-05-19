import React, { ReactNode } from 'react'
import styles from '../../const/styles'

import type * as Types from '../../types'

// components
import ContainerStyled from './Container.styled'
import ContainerInnerStyled from './ContainerInner.styled'
// import Menu from '@/features/bookshelf/components/menu/subPage/MenuSubPage'
import HeaderListPage from './header/HeaderListPage'
import Footer from '@/features/myBooks/components/layout/footer/Footer'

type Props = {
  children: ReactNode

  // リスト、グリッド切り替え
  bookViewMode: 'list' | 'grid'
  setBookViewMode: React.Dispatch<React.SetStateAction<'list' | 'grid'>>

  // 検索
  searchByText: (searchText: string) => void

  // 絞り込み
  tagList: Types.TagItem[]
  setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>
  filterByTag: (tagId: number) => void

  // 並び替え
  setBookList: React.Dispatch<React.SetStateAction<Types.BookItem[]>>
  sortBy: (sortType: string) => void
}

const LayoutListPage: React.FC<Props> = (props) => {
  return (
    <ContainerStyled
      styles={{
        height: '100%',
      }}
    >
      <ContainerStyled
        styles={{
          height: styles['--height-menu-default'],
          'background-color': styles['--color-background-sub'],
          'border-bottom': `1px solid ${styles['--color-border-default']}`,
        }}
        breakPoint={styles['--break-point']}
        spStyles={
          {
            // 'background-color': '#ff0000',
          }
        }
      >
        <ContainerInnerStyled
          styles={{
            height: '100%',
          }}
        >
          <HeaderListPage
            // リスト、グリッド切り替え
            bookViewMode={props.bookViewMode}
            setBookViewMode={props.setBookViewMode}
            // 検索
            searchByText={props.searchByText}
            // 絞り込み
            tagList={props.tagList}
            setSelectedTagIds={props.setSelectedTagIds}
            filterByTag={props.filterByTag}
            // 並び替え
            setBookList={props.setBookList}
            sortBy={props.sortBy}
          />
        </ContainerInnerStyled>
      </ContainerStyled>

      <ContainerStyled
        styles={{
          overflow: 'auto',
          height: `calc(100% - ${styles['--height-menu-default']} - ${styles['--height-footer-default']})`,
        }}
      >
        <ContainerInnerStyled
        // styles={{
        //   'display': 'flex',
        //   'flex-flow': 'nowrap column',
        //   'justify-content': 'center',
        //   'align-items': 'center',
        //   'height': '100%',
        // }}
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

export default LayoutListPage
