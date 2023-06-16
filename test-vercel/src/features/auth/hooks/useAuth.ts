import { FirebaseError } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from 'firebase/auth'

export const useAuth = () => {
  // 新規ユーザー登録
  const createAuthUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      )
      const user = userCredential.user
      console.log({ user })
      return user
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.code)
        console.error(error.message)
      }
    }
  }

  // 既存のユーザーにサインインする
  const signInAuthUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      )
      const user = userCredential.user
      return user
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.code)
        console.error(error.message)
      }
    }
  }

  // サインアウト
  const signOutAuthUser = async () => {
    try {
      await signOut(getAuth())
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.code)
        console.error(error.message)
      }
    }
  }

  // アカウント削除
  const deleteAuthUser = async () => {
    const authUser = getAuth().currentUser
    console.log({ authUser })
    if (!authUser) return
    try {
      await deleteUser(authUser)
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.code)
        console.error(error.message)
      }
    }
  }

  return {
    createAuthUser,
    signInAuthUser,
    signOutAuthUser,
    deleteAuthUser,
  } as const
}
