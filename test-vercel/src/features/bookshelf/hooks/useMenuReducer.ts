import { useReducer } from 'react'

/**
 * 「絞り込み」「並び替え」トグルメニューの状態管理
 */
export type MenuState = {
  filterIsActive: boolean
  sortIsActive: boolean
}

export type MenuAction =
  | {
      type: 'updateFilterIsActive'
      payload: {
        filterIsActive: boolean
      }
    }
  | {
      type: 'updateSortIsActive'
      payload: {
        sortIsActive: boolean
      }
    }
  | {
      type: 'updateIsActive'
      payload: {
        filterIsActive: boolean
        sortIsActive: boolean
      }
    }

const useMenuReducer = () => {
  const reducer = (menuState: MenuState, action: MenuAction) => {
    switch (action.type) {
      case 'updateFilterIsActive':
        return {
          ...action.payload,
          sortIsActive: false,
        }
      case 'updateSortIsActive':
        return {
          ...action.payload,
          filterIsActive: false,
        }
      case 'updateIsActive':
        return {
          ...action.payload,
        }
      default:
        return menuState
    }
  }

  const initialState: MenuState = {
    filterIsActive: false,
    sortIsActive: false,
  }

  const [menuState, menuDispatch] = useReducer(reducer, initialState)

  return { menuState, menuDispatch }
}

export default useMenuReducer
