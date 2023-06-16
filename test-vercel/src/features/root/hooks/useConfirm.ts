import { useConfirmContext } from '@/features/root/context/ConfirmContext'

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

const useConfirm = () => {
  const { setIsConfirm, setConfirmMessages, setHandleYesBtnClick, setHandleNoBtnClick } = useConfirmContext()

  const confirmAsync = async (messages: string[]) => {
    setIsConfirm(true)
    setConfirmMessages(messages)

    return new Promise<boolean>((resolve) => {
      setHandleYesBtnClick(() => {
        return () => {
          setIsConfirm(false)
          resolve(true)
        }
      })
      setHandleNoBtnClick(() => {
        return () => {
          setIsConfirm(false)
          resolve(false)
        }
      })
    })
  }
  return { confirmAsync }
}

export default useConfirm
