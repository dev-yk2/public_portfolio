import React, {
  useReducer,
  useEffect,
  createContext,
  ReactNode
} from 'react'
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './config/firebase'



/**
 * reducer
 */

type TypeState = {
  isLogin: boolean | null
  isLoading: boolean
}

type TypeAction = {
  type: 'updateIsLogin'
  payload: {
    isLogin: boolean | null
  }
} | {
  type: 'updateIsLoading'
  payload: {
    isLoading: boolean
  }
}

const reducer = (state: TypeState, action: TypeAction) => {
  switch (action.type) {
    case 'updateIsLogin':
      return {
        ...state,
        isLogin: action.payload.isLogin,
      }
    case 'updateIsLoading':
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    default:
      return state
  }
}

const initialState: TypeState = {
  isLogin: null,
  isLoading: true,
}



/**
 * context
 */

type TypeUserContext = {
  state: TypeState
  dispatch: React.Dispatch<TypeAction>
}

export const UserContext = createContext<TypeUserContext>({
  state: initialState,
  dispatch: () => undefined,
})

type Props = {
  children: ReactNode
}

const UserContextProvider: React.FC<Props> = React.memo((props) => {
  console.log('[UserContextProvider.tsx]')
  const [state, dispatch] = useReducer(reducer, initialState)

  // ログイン、ログアウトを監視
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('[UserContext.tsx] > onAuthStateChanged() > login')
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
        dispatch({
          type: 'updateIsLogin',
          payload: {
            isLogin: true,
          },
        })
      } else {
        // User is signed out
        // ...
        dispatch({
          type: 'updateIsLogin',
          payload: {
            isLogin: false,
          },
        })
      }
    })
  }, [])

  return (
    <UserContext.Provider
      value={{state, dispatch}}
    >
      {props.children}
    </UserContext.Provider>
  )
})

export default UserContextProvider
