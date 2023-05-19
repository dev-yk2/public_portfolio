import SvgIconSearch from 'public/image/svg/icon_search.svg'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import styles from '../../../const/styles'

import SvgWrapper from '../../image/SvgWrapper'

type Props = {
  searchByText: (searchText: string) => void
}

const MenuSearch: React.FC<Props> = (props) => {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    props.searchByText(searchText)
    // eslint-disable-next-line
  }, [searchText])

  return (
    <StyledDiv>
      <div className="input_wrap">
        <SvgWrapper
          styles={{
            position: 'absolute',
            left: '1em',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '1.2em',
            height: '1.2em',
          }}
        >
          <SvgIconSearch fill={styles['--color-font-default']} />
        </SvgWrapper>
        <input
          type="text"
          placeholder="本棚を検索する"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value)
          }}
        />
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  .input_wrap {
    position: relative;
    border-radius: 2em;
    input {
      display: block;
      padding: 0.1em 0.1em 0.1em 2.2em;
      width: 12em;
      border: 1px solid ${styles['--color-border-default']};
      border-radius: 2em;
      font-size: 16px;
      &:focus {
        border-color: ${styles['--color-font-accent']};
      }
    }
  }
  /* .svg_icon {
    position: relative;
	  width: 1.6em;
    height: 1.6em;
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  } */
`

export default MenuSearch
