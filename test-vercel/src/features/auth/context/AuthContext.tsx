import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

type GlobalAuthState = {
  // サインイン時User、サインアウト時null、初期値undefined
  user: User | null | undefined
}

const initialState: GlobalAuthState = {
  user: undefined,
}

const AuthContext = createContext<GlobalAuthState>(initialState)

type Props = { children: ReactNode }

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState)
  useEffect(() => {
    try {
      return onAuthStateChanged(getAuth(), (user) => {
        // console.log({ user })
        setUser({
          // サインイン時はUser、サインアウト時はnullが帰ってくる
          user,
        })
      })
    } catch (error) {
      setUser(initialState)
      throw error
    }
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
