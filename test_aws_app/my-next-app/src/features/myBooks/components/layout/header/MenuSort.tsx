import SvgIconSort from 'public/image/svg/icon_sort.svg'
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'
import type * as Types from '../../../types'

import SvgWrapper from '../../image/SvgWrapper'
import type { TypeMenuState, TypeMenuAction } from './HeaderListPage'

type Props = {
  menuState: TypeMenuState
  menuDispatch: React.Dispatch<TypeMenuAction>

  setBookList: React.Dispatch<React.SetStateAction<Types.BookItem[]>>
  sortBy: (sortType: string) => void
}

// eslint-disable-next-line
const MenuSort = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const refListContainer = useRef(null)

  // Menu表示切り替えロジック
  useEffect(() => {
    if (refListContainer.current === null) return
    const listContainer = refListContainer.current as HTMLDivElement
    const originalListContainerHeight = listContainer.scrollHeight
    if (props.menuState.sortIsActive) {
      listContainer.style.height = `${originalListContainerHeight}px`
    } else {
      listContainer.style.height = `0px`
    }
  }, [props.menuState])

  const [sortTypeList, setSortTypeList] = useState([
    {
      type: 'title',
      text: 'タイトル',
      isActive: false,
    },
    {
      type: 'author',
      text: '著者',
      isActive: false,
    },
    {
      type: 'publisher',
      text: '出版社',
      isActive: false,
    },
  ])

  return (
    <StyledDiv ref={ref}>
      <button
        className="button_toggle"
        onClick={() => {
          props.menuDispatch({
            type: 'updateSortIsActive',
            payload: {
              sortIsActive: !props.menuState.sortIsActive,
            },
          })
        }}
      >
        <SvgWrapper
          styles={{
            'margin-right': '0.3em',
            width: '1.6em',
            height: '1.6em',
          }}
        >
          <SvgIconSort fill={styles['--color-font-default']} />
        </SvgWrapper>
        並び替え
      </button>

      {/* チェックボックスつきのタグ一覧リスト */}
      <div className="list_container" ref={refListContainer}>
        <div className="list_container_inner_pd">
          <div className="list_container_inner_bdr">
            <div className="list_container_inner_bg">
              <div className="sort_type_list">
                {sortTypeList.map((sortTypeItem, index) => {
                  return (
                    <button
                      className={sortTypeItem.isActive ? 'active' : undefined}
                      key={index}
                      onClick={() => {
                        props.sortBy(sortTypeItem.type)
                        setSortTypeList((prevState) => {
                          return prevState.map((v, i) => {
                            v.isActive = i === index ? true : false
                            return v
                          })
                        })
                      }}
                    >
                      {sortTypeItem.text}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledDiv>
  )
})

const StyledDiv = styled.div`
  position: relative;
  @media screen and (max-width: ${styles['--break-point']}px) {
    font-size: ${styles['--size-font-default']};
  }
  .button_toggle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list_container {
    z-index: 1;
    position: absolute;
    right: 10%;
    top: 90%;
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
    .list_container_inner_pd {
      padding-top: 1em;
    }
    .list_container_inner_bdr {
      position: relative;
      border: 1px solid ${styles['--color-border-default']};
      &::before {
        content: '';
        position: absolute;
        right: 1em;
        top: -0.7em;
        display: block;
        width: 1.4em;
        height: 1.4em;
        border: 1px solid ${styles['--color-border-default']};
        background-color: ${styles['--color-background-sub']};
        transform: rotate(45deg);
      }
    }
    .list_container_inner_bg {
      position: relative;
      padding: 0.6em;
      /* border: 1px solid ${styles['--color-border-default']}; */
      background-color: ${styles['--color-background-sub']};
      ul {
        & > li {
          white-space: nowrap;
        }
      }
    }
    .sort_type_list {
      button {
        position: relative;
        display: block;
        padding: 0.2em 2em 0.1em 0.1em;
        width: 100%;
        white-space: nowrap;
        &::after {
          content: '';
          position: absolute;
          right: 1em;
          top: 50%;
          transform: translate(70%, -70%) rotate(45deg);
          display: block;
          width: 0.4em;
          height: 0.8em;
          border-right: 2px solid ${styles['--color-font-accent']};
          border-bottom: 2px solid ${styles['--color-font-accent']};
          opacity: 0;
        }
        &.active {
          &::after {
            opacity: 1;
          }
        }
        &:not(:first-child) {
          margin-top: 0.2em;
        }
      }
    }
  }
`

export default MenuSort
