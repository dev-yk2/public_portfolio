import React, { useReducer, createContext, ReactNode } from 'react'

/**
 * reducer
 */

type TypeState = {
  userId: null | number
  // idToken: null | string
  // refreshToken: null | string
}

type TypeAction =
  | {
      type: 'login'
      payload: {
        userId: number
        // idToken: string
        // refreshtoken: string
      }
    }
  // {
  //   type: 'updateToken'
  //   payload: {
  //     idToken: string
  //     refreshtoken: string
  //   }
  // } |
  | {
      type: 'logout'
      payload: {
        userId: null
      }
    }

const reducer = (state: TypeState, action: TypeAction) => {
  switch (action.type) {
    case 'login':
      return {
        // ...state,
        userId: action.payload.userId,
        // idToken: action.payload.idToken,
        // refreshToken: action.payload.refreshtoken,
      }
    // case 'updateToken':
    //   return {
    //     ...state,
    //     idToken: action.payload.idToken,
    //     refreshToken: action.payload.refreshtoken,
    //   }
    case 'logout':
      return {
        // ...state,
        userId: null,
        // idToken: null,
        // refreshToken: null,
      }
    default:
      return state
  }
}

const initialState: TypeState = {
  userId: null,
  // idToken: null,
  // refreshToken: null,
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

// eslint-disable-next-line
const UserContextProvider: React.FC<Props> = React.memo((props) => {
  // console.log('[UserContextProvider.tsx]')
  const [state, dispatch] = useReducer(reducer, initialState)

  // ログイン、ログアウトを監視
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // console.log('[UserContext.tsx] > onAuthStateChanged() > login')
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       // const uid = user.uid;
  //       // ...
  //       dispatch({
  //         type: 'updateIsLogin',
  //         payload: {
  //           isLogin: true,
  //         },
  //       })
  //     } else {
  //       // User is signed out
  //       // ...
  //       dispatch({
  //         type: 'updateIsLogin',
  //         payload: {
  //           isLogin: false,
  //         },
  //       })
  //     }
  //   })
  // }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {/* eslint-disable-next-line */}
      {props.children}
    </UserContext.Provider>
  )
})

export default UserContextProvider
