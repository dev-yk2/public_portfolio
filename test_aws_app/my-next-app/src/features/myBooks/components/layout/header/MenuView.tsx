import SvgIconGrid from 'public/image/svg/icon_grid.svg'
import SvgIconList from 'public/image/svg/icon_list.svg'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'

import SvgWrapper from '../../image/SvgWrapper'

type Props = {
  bookViewMode: 'list' | 'grid'
  setBookViewMode: React.Dispatch<React.SetStateAction<'list' | 'grid'>>
}

const MenuView: React.FC<Props> = (props) => {
  useEffect(() => {
    const viewMode = localStorage.getItem('view_mode')
    if (viewMode === 'list' || viewMode === 'grid') {
      props.setBookViewMode(viewMode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledUl>
      <li>
        <button
          className={props.bookViewMode === 'list' ? 'active' : undefined}
          onClick={() => {
            props.setBookViewMode('list')
            localStorage.setItem('view_mode', 'list')
          }}
        >
          <SvgWrapper
            styles={{
              width: '1.8em',
              height: '1.8em',
            }}
          >
            <SvgIconList fill={styles['--color-font-default']} />
          </SvgWrapper>
        </button>
      </li>
      <li>
        <button
          className={props.bookViewMode === 'grid' ? 'active' : undefined}
          onClick={() => {
            props.setBookViewMode('grid')
            localStorage.setItem('view_mode', 'grid')
          }}
        >
          <SvgWrapper
            styles={{
              width: '1.8em',
              height: '1.8em',
            }}
          >
            <SvgIconGrid fill={styles['--color-font-default']} />
          </SvgWrapper>
        </button>
      </li>
    </StyledUl>
  )
}

const StyledUl = styled.ul`
  display: flex;
  li {
    :not(:first-child) {
      margin-left: 0.2em;
    }
  }
  button {
    opacity: 0.3;
    &:hover,
    &.active {
      opacity: 1;
    }
  }
`

export default MenuView
