import React, { useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'

// firebase
import { signOut } from "firebase/auth"
import { auth } from '../page/memo-app/config/firebase'
import { UserContext } from '../page/memo-app/UserContext'

import PartsButton from '../page/memo-app/parts/PartsButton'

import { useLocation } from 'react-router-dom'
import MenuButton from './MenuButton'
import Navi from './Navi'

const Menu: React.FC = React.memo(() => {
  const location = useLocation()
  useEffect(() => {
    clickMenuButton(true)
  }, [location])

  const {state, dispatch} = useContext(UserContext)

  // ログアウト
  const onClickLogout = () => {
    dispatch({
      type: 'updateIsLoading',
      payload: {
        isLoading: true,
      },
    })
    signOut(auth)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log('error =', error)
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    })
  }

  const refMenuList = useRef(null)

  // アコーディオンメニュー
  const clickMenuButton = (closeFlag?: boolean) => {
    // console.log('closeFlag =', closeFlag)
    if (refMenuList.current === null) return
    const naviList = refMenuList.current as HTMLDivElement
    const currentHeight = naviList.offsetHeight

    if (closeFlag === undefined) {
      // 引数なしの場合
      if (currentHeight === 0) {
        const height = naviList.scrollHeight
        naviList.style.height = `${height}px`
      } else {
        naviList.style.height = '0'
      }
    } else if (closeFlag === true) {
      // 引数あり（true）の場合
      // ページ遷移後にメニューを閉じる
      naviList.style.height = '0'
    }
  }

  return (
    <StyledDiv>
      <MenuButton clickMenuButton={() => {clickMenuButton()}} />
      <div className="menuList" ref={refMenuList}>
        <Navi />

        {state.isLogin ?
          <div className="buttonWrap">
            <PartsButton
              onClick={onClickLogout}
              text="ログアウト"
            />
          </div>
        : null}

      </div>

    </StyledDiv>
  )
})

export default Menu

const StyledDiv = styled.div`
  z-index: var(--root-z-index-Menu);
  position: fixed;
  top: 1em;
  right: 1em;
  .menuList {
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 2em;
    height: 0;
    background-color: var(--root-bg-color-dark);
    transition: height 0.3s;
  }
  .buttonWrap {
    padding: 1em 0;
    text-align: center;
  }
`
