import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from './config/firebase'
import { useNavigate } from 'react-router-dom'

import { UserContext } from './UserContext'
import PartsInput from './parts/PartsInput'
import PartsButton from './parts/PartsButton'
import PartsButtonWrap from './parts/PartsButtonWrap'

import { isDev } from './config/config'

const LoginMemoApp: React.FC = React.memo(() => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginError, setIsLoginError] = useState(false)
  const {state, dispatch} = useContext(UserContext)

  const navigate = useNavigate()

  const onClickLoginButton = () => {
      // ローディング画面開始
    dispatch({
      type: 'updateIsLoading',
      payload: {
        isLoading: true,
      },
    })

    // 既存のユーザーにサインインする
    let _email = ''
    if (userName === process.env.REACT_APP_AUTH_USERNAME) {
      _email = process.env.REACT_APP_AUTH_EMAIL as string
    }
    console.log('email =', email, ' | password =', password)
    signInWithEmailAndPassword(auth, _email, password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      // ...
      navigate('/memo-app/')
    })
    .catch((error) => {
      console.log(`
        [error] ${error}\n
        [error.code] ${error.code}\n
        [error.message] ${error.message}
      `)

      // エラー文言を表示
      setIsLoginError(true)

      // ローディング画面終了
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    })
  }

  useEffect(() => {
    if (state.isLogin === null) {
      // ページロード直後
      console.log('ページロード直後')
      // navigate('/login')
    } else if (state.isLogin) {
      // ログイン中
      console.log('ログイン中')

      navigate('/memo-app/')
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    } else {
      // ログアウト中
      console.log('ログアウト中')

      navigate('/memo-app/login/')
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    }
  // eslint-disable-next-line
  }, [state.isLogin])

  return (
    <StyledDiv>
      <div className="loginInner">
        <p className="title">ログイン認証</p>
        <form onSubmit={(e) => {e.preventDefault()}}>

          <dl>
            <dt>ユーザー名</dt>
            <dd>
              <PartsInput
                type="text"
                value={userName}
                placeholder="user-name"
                setState={setUserName}
              />
            </dd>
          </dl>
          <dl>
            <dt>パスワード</dt>
            <dd>
              <PartsInput
                type="password"
                value={password}
                autocomplete="none"
                setState={setPassword}
              />
            </dd>
          </dl>
          {isLoginError ?
            <p className="errorText">入力内容に誤りがあります。</p>
          :
            null
          }
          <PartsButtonWrap>
            <PartsButton
              onClick={onClickLoginButton}
              text="ログイン"
            />
          </PartsButtonWrap>
        </form>

      </div>
    </StyledDiv>
  )
})

export default LoginMemoApp

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .title {
    font-size: 1.1em;
    font-weight: bold;
    text-align: center;
  }
  dl {
    margin: 2em auto 0;
    max-width: 20em;
    text-align: left;
    & > dt {
      font-size: 0.9em;
    }
    & > dd {
      margin-top: 0.2em;
    }
  }
  .errorText {
    margin: 1em 0;
    text-align: center;
    color: #f00;
    font-size: 0.8em;
  }

  .dev{
    border: 1px solid #f00;
  }
`
