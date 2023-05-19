import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useCallback, useEffect } from 'react'

// components
import LayoutLoginPage from '@/features/myBooks/components/layout/LayoutLoginPage'
import HeadBasic from '@/features/myBooks/components/layout/head/HeadBasic'
import LoginBox from '@/features/myBooks/components/page/login/LoginBox'

const Login: NextPage = () => {
  const router = useRouter()

  /**
   * サインイン
   */
  const [signInEmail, setSignInEmail] = useState<string>('')
  const [signInPassword, setSignInPassword] = useState<string>('')
  const [
    signInErrorMessage,
    // setSignInErrorMessage,
  ] = useState<null | string>(null)

  const sendSignInData = useCallback(async () => {
    console.log('click sign in')
    if (signInEmail === '' || signInPassword === '') return

    // 本来は
    // パラメータ→service→api→service→返り値
    // とした方がいいと思う
    // import signIn from '@/feature/myBooks/service'
    // const result = await signInEmail(email, password)
    // みたいな。余裕があったら直す。
    const result = await fetch('/api/v0.2/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
    const data = await result.json()
    console.log('[data]', data)
    if ('errorMessage' in data) {
      console.log(data.errorMessage)
    } else {
      router.replace(`/myBooks/${data.id}`)
    }
    // eslint-disable-next-line
  }, [signInEmail, signInPassword])

  /**
   * サインアップ
   */
  const [signUpEmail, setSignUpEmail] = useState<string>('')
  const [signUpPassword, setSignUpPassword] = useState<string>('')
  const [
    signUpErrorMessage,
    // setSignUpErrorMessage,
  ] = useState<null | string>(null)

  const sendSignUpData = useCallback(async () => {
    if (signUpEmail === '' || signUpPassword === '') return
    const result = await fetch('/api/v0.2/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
    const data = await result.json()
    console.log('[data]', data)
    if ('errorMessage' in data) {
      console.log(data.errorMessage)
    } else {
      router.replace(`/myBooks/${data.id}`)
    }
    // eslint-disable-next-line
  }, [signUpEmail, signUpPassword])

  // const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')

  // const sendLoginData = useCallback(async () => {
  //   if (email === '' || password === '') return
  //   const result = await fetch('/api/v0.2/auth/signIn', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     })
  //   })
  //   const data = await result.json()
  //   // console.log('[data]', data)
  //   if ('errorMessage' in data) {
  //     console.log(data.errorMessage)
  //   } else {
  //     router.replace(`/myBooks/user/${`1`}`)
  //   }
  // }, [email, password])

  // ログイン済みの場合、ユーザーページにリダイレクト
  // 未ログインの場合、そのまま留まる
  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      // ユーザーデータ取得
      const resUserData = await fetch('/api/v0.2/auth/getUserData')
      const dataUserData = await resUserData.json()
      console.log('[dataUserData]', dataUserData)
      if (!('errorMessage' in dataUserData)) {
        // ユーザーデータ取得成功
        // dataUserData.emailを使用してuserIdを取得する処理を入れる
        router.replace(`/myBooks/${dataUserData.id}`)
      } else {
        // ユーザーデータ取得失敗
        console.log('[dataUserData.errorMessage]', dataUserData.errorMessage)
        // リフレッシュトークンを使用してIDトークンを取得
        const resIdToken = await fetch('/api/v0.2/auth/getIdToken')
        const dataIdToken = await resIdToken.json()
        console.log('[dataIdToken]', dataIdToken)

        if (!('errorMessage' in dataIdToken)) {
          // IDトークンを取得成功
          const resUserData2 = await fetch('/api/v0.2/auth/getUserData')
          const dataUserData2 = await resUserData2.json()
          // dataUserData2.emailを使用してuserIdを取得する処理を入れる
          router.replace(`/myBooks/${dataUserData2.id}`)
        } else {
          // ユーザーデータ取得できず、さらにIDトークンの取得もできない場合、そのままloginページに留まる。
          return
        }
      }
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <LayoutLoginPage>
      <HeadBasic
        title="ログインページ | 本管理アプリ"
        pagePath="/myBooks/login"
      />
      {process.env.NODE_ENV === 'production' ? null : (
        <>
          <div>
            <p>devkatayama@gmail.com</p>
            <p>uW5dsYRB</p>
          </div>
          <div>
            <p>test@user.com</p>
            <p>testpass</p>
          </div>
        </>
      )}
      <LoginBox
        email={signInEmail}
        setEmail={setSignInEmail}
        password={signInPassword}
        setPassword={setSignInPassword}
        sendData={sendSignInData}
        errorMessage={signInErrorMessage}
        boxName="ログイン"
        buttonName="ログインする"
      />

      <LoginBox
        email={signUpEmail}
        setEmail={setSignUpEmail}
        password={signUpPassword}
        setPassword={setSignUpPassword}
        sendData={sendSignUpData}
        errorMessage={signUpErrorMessage}
        boxName="アカウント作成"
        buttonName="登録する"
      />

      {/*
      <div>
        <h1>ログインページ</h1>
        <div>
          email:
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button
          onClick={sendLoginData}
        >
          sign in
        </button>
      </div> */}
    </LayoutLoginPage>
  )
}

export default Login
