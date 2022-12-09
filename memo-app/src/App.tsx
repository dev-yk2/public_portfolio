import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { UserContext } from './components/context/UserContext'

import Functions from './components/functions/Functions'
import Layout from './components/layout/Layout'
import MemoApp from './components/pages/memoapp/MemoApp'
import Login from './components/pages/login/Login'
import Loading from './components/layout/Loading'

const App: React.FC = React.memo(() => {
  console.log('[App.tsx]')
  const {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.isLogin === null) {
      // ページロード直後
      // navigate('/login')
    } else if (state.isLogin) {
      // ログイン中
      navigate('/')
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    } else {
      // ログアウト中
      navigate('/login')
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
    <Layout>
      <Functions />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MemoApp />} />
      </Routes>

      {state.isLoading ?
        <Loading />
      :
        null
      }
    </Layout>
  )
})

export default App
