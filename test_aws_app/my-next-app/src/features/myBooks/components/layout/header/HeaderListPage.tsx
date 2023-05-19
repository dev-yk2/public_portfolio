import React, { useEffect, useReducer, useRef } from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'
import type * as Types from '../../../types'
import MenuFilter from './MenuFilter'
import MenuSearch from './MenuSearch'
import MenuSort from './MenuSort'
import MenuView from './MenuView'

/**
 * reducer
 * 「絞り込み」「並び替え」トグルメニューの状態管理
 */
export type TypeMenuState = {
  filterIsActive: boolean
  sortIsActive: boolean
}

export type TypeMenuAction =
  | {
      type: 'updateFilterIsActive'
      payload: {
        filterIsActive: boolean
      }
    }
  | {
      type: 'updateSortIsActive'
      payload: {
        sortIsActive: boolean
      }
    }
  | {
      type: 'updateIsActive'
      payload: {
        filterIsActive: boolean
        sortIsActive: boolean
      }
    }

const reducer = (menuState: TypeMenuState, action: TypeMenuAction) => {
  switch (action.type) {
    case 'updateFilterIsActive':
      return {
        ...action.payload,
        sortIsActive: false,
      }
    case 'updateSortIsActive':
      return {
        ...action.payload,
        filterIsActive: false,
      }
    case 'updateIsActive':
      return {
        ...action.payload,
      }
    default:
      return menuState
  }
}

const initialState: TypeMenuState = {
  filterIsActive: false,
  sortIsActive: false,
}
/* /reducer */

type Props = {
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

const HeaderListPage: React.FC<Props> = (props) => {
  // 「絞り込み」「並び替え」のトグルメニューの状態を管理
  const [menuState, menuDispatch] = useReducer(reducer, initialState)

  // 「絞り込み」「並び替え」メニューの参照
  // 領域外をクリックでトグルメニューを閉じるために使用する
  const refMenuFilter = useRef(null)
  const refMenuSort = useRef(null)

  useEffect(() => {
    const documentClickHandler = (e: MouseEvent) => {
      // console.log('document click!!!')

      if (!refMenuFilter.current || !refMenuSort.current) return
      const menuFilterEle = refMenuFilter.current as HTMLDivElement
      const menuSortEle = refMenuSort.current as HTMLDivElement
      const targetEle = e.target as Node // containsの引数にできるよう、無理矢理Node型にしている

      // 特定の領域外をクリックしたらトグルメニューを閉じる
      if (
        !menuFilterEle.contains(targetEle) &&
        !menuSortEle.contains(targetEle)
      ) {
        menuDispatch({
          type: 'updateIsActive',
          payload: {
            filterIsActive: false,
            sortIsActive: false,
          },
        })
      }
    }
    document.addEventListener('click', documentClickHandler, false)

    return () => {
      document.removeEventListener('click', documentClickHandler)
    }
  }, [])

  return (
    <StyledDiv>
      {/* 検索 Search */}
      <div className="search_wrapper">
        <MenuSearch searchByText={props.searchByText} />
      </div>

      <div className="list_wrapper">
        {/* タグで絞り込み Filter */}
        <MenuFilter
          menuState={menuState}
          menuDispatch={menuDispatch}
          ref={refMenuFilter}
          tagList={props.tagList}
          setSelectedTagIds={props.setSelectedTagIds}
          filterByTag={props.filterByTag}
        />

        {/* 表示切り替え list or grid */}
        <MenuView
          bookViewMode={props.bookViewMode}
          setBookViewMode={props.setBookViewMode}
        />

        {/* 並び替え Sort */}
        <MenuSort
          menuState={menuState}
          menuDispatch={menuDispatch}
          ref={refMenuSort}
          setBookList={props.setBookList}
          sortBy={props.sortBy}
        />
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  /* background-color: var(--color-background-sub); */
  height: 100%;
  .search_wrapper {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    height: calc(${styles['--height-menu-default']} * 0.5);
  }
  .list_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(${styles['--height-menu-default']} * 0.5);
  }
`

export default HeaderListPage
