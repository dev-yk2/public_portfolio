import { useAuthContext } from '@/features/auth/context/AuthContext'
import { useAuth } from '@/features/auth/hooks/useAuth'
import React from 'react'

type ButtonSignOutProps = {}

export const ButtonSignOut: React.FC<ButtonSignOutProps> = () => {
  const { signOutAuthUser } = useAuth()

  const { user } = useAuthContext()

  const handleSignOutBtnClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    await signOutAuthUser()
  }

  if (!user) return null

  return <>{user ? <button onClick={handleSignOutBtnClick}>ログアウト</button> : null}</>
}
