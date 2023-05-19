import React, { useContext } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../../context/UserContext'
import LinkBasic from '../../link/LinkBasic'

type Props = {
  pageTitle: string
}

const HeaderSubPage: React.FC<Props> = (props) => {
  const { state } = useContext(UserContext)
  return (
    <StyledDiv>
      <div className="button_back">
        <LinkBasic
          href={{
            pathname: `/myBooks/${state.userId}`,
          }}
        >
          ＜ 一覧に戻る
        </LinkBasic>
      </div>
      <p className="page_title">{props.pageTitle}</p>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .button_back {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .page_title {
    font-size: 1.2em;
    font-weight: bold;
  }
`

export default HeaderSubPage
