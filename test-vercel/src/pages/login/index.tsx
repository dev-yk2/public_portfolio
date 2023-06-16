import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useUser } from '@/features/user/hooks/useUser'
import { Layout } from '@/features/root/components/Layout'
import { SignInFormContainer } from '@/features/bookshelf/components/SignInFormContainer'
import { HeadCommon } from '@/features/root/components/HeadCommon'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers.referer || null
  return { props: { referer } }
}

type Props = {
  referer?: string
}

const Login: NextPage<Props> = ({ referer }) => {
  const router = useRouter()

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const { user } = useAuthContext()

  const { signInAuthUser, createAuthUser } = useAuth()
  const { createUser } = useUser()

  useEffect(() => {
    if (user) {
      // router.replace(`/sample/${user.uid}`)
      if (referer) {
        router.replace(referer)
      } else {
        router.replace(`/sample/${user.uid}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSignInEmailInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSignInEmail(event.target.value)
  }

  const handleSignInPasswordInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSignInPassword(event.target.value)
  }

  const handleSignInSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    await signInAuthUser(signInEmail, signInPassword)
  }

  const handleSignUpEmailInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSignUpEmail(event.target.value)
  }

  const handleSignUpPasswordInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSignUpPassword(event.target.value)
  }

  const handleSignUpSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const authUser = await createAuthUser(signUpEmail, signUpPassword)
    if (authUser) {
      await createUser(authUser.uid, authUser.email || '')
    }
  }

  return (
    <Layout pageTitle="Login">
      <HeadCommon title="LogIn | App" description="ログインページです。" />
      <div className="overflow-auto h-[calc(100vh_-_var(--root-header-height)]">
        {process.env.NODE_ENV === 'development' ? (
          <div className="border border-red-500">
            <p>email: devkatayama@gmail.com</p>
            <p>password: hogehoge</p>
            <hr />
            <p>email: test-user@gmail.com</p>
            <p>password: Sf7sUpyW</p>
          </div>
        ) : null}
        <div className="flex flex-col items-center">
          <SignInFormContainer
            containerTitle="ログイン"
            email={signInEmail}
            password={signInPassword}
            handleSubmit={handleSignInSubmit}
            handleEmailInputChange={handleSignInEmailInputChange}
            handlePasswordInputChange={handleSignInPasswordInputChange}
            buttonText="ログイン"
          />
          {process.env.NODE_ENV === 'development' ? (
            <SignInFormContainer
              className="pt-8"
              containerTitle="新規ユーザー登録"
              email={signUpEmail}
              password={signUpPassword}
              handleSubmit={handleSignUpSubmit}
              handleEmailInputChange={handleSignUpEmailInputChange}
              handlePasswordInputChange={handleSignUpPasswordInputChange}
              buttonText="登録"
            />
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default Login
