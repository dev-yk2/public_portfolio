import SvgIconFilter from 'public/image/svg/icon_filter.svg'
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'

import type * as Types from '../../../types'
import * as Utils from '../../../utils'

import SvgWrapper from '../../image/SvgWrapper'
import type { TypeMenuState, TypeMenuAction } from './HeaderListPage'
import MenuFilterButtonTag from './MenuFilterButtonTag'

type Props = {
  menuState: TypeMenuState
  menuDispatch: React.Dispatch<TypeMenuAction>

  tagList: Types.TagItem[]
  setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>
  filterByTag: (tagId: number) => void
}

// eslint-disable-next-line
const MenuFilter = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const refListContainer = useRef(null)

  // Menu表示切り替えロジック
  useEffect(() => {
    if (refListContainer.current === null) return
    const listContainer = refListContainer.current as HTMLDivElement
    const originalListContainerHeight = listContainer.scrollHeight
    if (props.menuState.filterIsActive) {
      listContainer.style.height = `${originalListContainerHeight}px`
    } else {
      listContainer.style.height = `0px`
    }
  }, [props.menuState])

  return (
    <StyledDiv ref={ref}>
      <button
        className="button_toggle"
        onClick={() => {
          props.menuDispatch({
            type: 'updateFilterIsActive',
            payload: {
              filterIsActive: !props.menuState.filterIsActive,
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
          <SvgIconFilter fill={styles['--color-font-default']} />
        </SvgWrapper>
        絞り込み
      </button>

      {/* チェックボックスつきのタグ一覧リスト */}
      <div className="list_container" ref={refListContainer}>
        <div className="list_container_inner_pd">
          <div className="list_container_inner_bdr">
            <div className="list_container_inner_bg">
              <div>
                {props.tagList.map((tag, index) => {
                  return (
                    <MenuFilterButtonTag
                      key={index}
                      tag={tag}
                      onClick={props.filterByTag}
                    />
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
    left: 10%;
    top: 90%;
    overflow: hidden;
    min-width: 15em;
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
        left: 1em;
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
      /* background-color: rgba(${Utils.hex2Rgb(
        styles['--color-background-sub'],
      )}, 0.9); */
      ul {
        & > li {
          white-space: nowrap;
        }
      }
    }
  }
`

export default MenuFilter
