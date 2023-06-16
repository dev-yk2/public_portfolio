import React, { ReactNode, createContext, useContext, useState } from 'react'

/**
 * confirm機能について
 *
 * [context]
 * @/features/root/context/ConfirmContext.tsx
 * _app.tsxでproviderを、Confirm.tsxとuseConfirm.tsでcontextを読み込ませている。
 *
 * [component]
 * @/features/root/components/Confirm.tsx
 * Layout.tsxで読み込ませている。
 *
 * [hook]
 * @/features/root/hooks/useConfirm.ts
 * 表示・非表示、メッセージ、各ボタンの処理を設定。
 */

type ConfirmState = {
  isConfirm: boolean
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
  confirmMessages: string[]
  setConfirmMessages: React.Dispatch<React.SetStateAction<string[]>>
  handleYesBtnClick: () => void
  setHandleYesBtnClick: React.Dispatch<React.SetStateAction<() => void>>
  handleNoBtnClick: () => void
  setHandleNoBtnClick: React.Dispatch<React.SetStateAction<() => void>>
}

const initialState: ConfirmState = {
  isConfirm: false,
  setIsConfirm: () => {},
  confirmMessages: [],
  setConfirmMessages: () => {},
  handleYesBtnClick: () => {},
  setHandleYesBtnClick: () => {},
  handleNoBtnClick: () => {},
  setHandleNoBtnClick: () => {},
}

const ConfirmContext = createContext<ConfirmState>(initialState)

type Props = {
  children: ReactNode
}

export const ConfirmContextProvider: React.FC<Props> = ({ children }) => {
  // confirmコンポーネントの表示管理
  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  // 確認画面に表示するメッセージ
  const [confirmMessages, setConfirmMessages] = useState<string[]>([])

  // 「はい」ボタンの処理
  const [handleYesBtnClick, setHandleYesBtnClick] = useState<() => void>(() => {})

  // 「いいえ」ボタンの処理
  const [handleNoBtnClick, setHandleNoBtnClick] = useState<() => void>(() => {})

  return (
    <ConfirmContext.Provider
      value={{
        isConfirm,
        setIsConfirm,
        confirmMessages,
        setConfirmMessages,
        handleYesBtnClick,
        setHandleYesBtnClick,
        handleNoBtnClick,
        setHandleNoBtnClick,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  )
}

export const useConfirmContext = () => useContext(ConfirmContext)
