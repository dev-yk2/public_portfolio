import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../../config/firebase'
import { UserContext } from '../../context/UserContext'

import PartsInput from '../../parts/PartsInput'
import PartsButton from '../../parts/PartsButton'
import PartsButtonWrap from '../../parts/PartsButtonWrap'

import { isDev } from '../../../config/config'

const Login: React.FC = React.memo(() => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginError, setIsLoginError] = useState(false)
  const {dispatch} = useContext(UserContext)

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
    signInWithEmailAndPassword(auth, _email, password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      // ...
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

  return (
    <StyledDiv>
      <div className="loginInner">
        <p className="title">ログイン認証</p>
        <form onSubmit={(e) => {e.preventDefault()}}>
          <dl>
            <dt>メールアドレス</dt>
            <dd>
              <PartsInput
                type="email"
                value={email}
                placeholder="example@test.com"
                setState={setEmail}
              />
            </dd>
          </dl>
          <dl>
            <dt>ユーザー名</dt>
            <dd>
              <PartsInput
                type="text"
                value={userName}
                placeholder="user"
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

        {isDev ?
          <div className="dev">
            <p>新規アカウント作成ページへ遷移</p>
          </div>
        : null}
      </div>
    </StyledDiv>
  )
})

export default Login

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
