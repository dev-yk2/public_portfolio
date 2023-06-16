import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useUser } from '@/features/user/hooks/useUser'
import { Layout } from '@/features/root/components/Layout'

const Logout: NextPage = () => {
  const router = useRouter()

  const { user } = useAuthContext()

  const { signOutAuthUser, deleteAuthUser } = useAuth()
  const { deleteUser } = useUser()

  useEffect(() => {
    console.log({ user_uid: user?.uid })
    if (!user) {
      router.replace('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleSignOutSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    await signOutAuthUser()
  }

  const handleDeleteUserSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (user?.uid) {
      await deleteAuthUser()
      await deleteUser(user.uid)
    }
  }

  return (
    <Layout pageTitle="Logout">
      <div>
        <h1>login page</h1>
        <section>
          <h2>ログアウト</h2>
          <form onSubmit={handleSignOutSubmit}>
            <div>
              <button>ログアウトする</button>
            </div>
          </form>
        </section>
        <hr />
        <section>
          <h2>登録削除</h2>
          <form onSubmit={handleDeleteUserSubmit}>
            <div>
              <button>登録を削除する</button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  )
}

export default Logout
