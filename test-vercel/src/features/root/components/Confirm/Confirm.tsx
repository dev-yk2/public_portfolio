import React from 'react'
import { useConfirmContext } from '@/features/root/context/ConfirmContext'
import { ButtonBasic } from '@/features/bookshelf/components/ButtonBasic'

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

export const Confirm: React.FC = () => {
  const { isConfirm, confirmMessages, handleYesBtnClick, handleNoBtnClick } = useConfirmContext()

  if (!isConfirm) return null
  return (
    <div className="z-50 fixed left-0 top-0 flex justify-center items-center w-full h-full bg-black/70">
      <div className="p-8 max-w-xs bg-zinc-100 rounded-lg">
        <div>
          {confirmMessages.map((message, index) => {
            return <p key={index}>{message}</p>
          })}
        </div>
        <div className="flex justify-center mt-4">
          <ButtonBasic className="w-20" onClick={handleYesBtnClick}>
            はい
          </ButtonBasic>
          <ButtonBasic className="ml-4 w-20" onClick={handleNoBtnClick}>
            いいえ
          </ButtonBasic>
        </div>
      </div>
    </div>
  )
}
