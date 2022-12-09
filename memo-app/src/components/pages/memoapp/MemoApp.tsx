import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'

// コンテキスト
import { UserContext } from '../../context/UserContext'

// 関数
import { firebaseData2LocalData, localData2FirebaseData, sortMemoItemOrder } from '../../../utilty/utilty'

// config
import { memoDataUrl } from '../../../config/config'

// 型
import { TypeMemoItem } from '../../../type/TypeMemoItem'

// コンポーネント
import MemoItem from './MemoItem'
import ButtonAddMemoItem from './ButtonAddMemoItem'
import MemoEditor from './MemoEditor'
import RemoveConfirm from './RemoveConfirm'

const MemoApp: React.FC = () => {

  const {dispatch} = useContext(UserContext)

  // メモデータ
  const [memoData, setMemoData] = useState<TypeMemoItem[]>([])
  useEffect(() => {
    // fetchMemoData
    (async () => {
      // Firebaseからjsonデータ取得
      const res = await fetch(`${memoDataUrl}.json`)
      const data = await res.json()
      // メモアプリ用に変換
      const localData = firebaseData2LocalData(data)
      // memo_orderでソートしてステートにセット
      setMemoData(() => sortMemoItemOrder(localData))
    })()
  // eslint-disable-next-line
  }, [])

  // 編集画面を開いたときに、編集対象となるメモのデータを格納
  const [editMemoItem, setEditMemoItem] = useState<TypeMemoItem>({
    memo_id: '',
    memo_name: '',
    memo_order: 0,
    memo_accent: 'off',
  })

  // 編集タイプ（新規追加 or 既存更新）
  const [editType, setEditType] = useState<'' | 'add' | 'update'>('')

  // 削除確認画面の表示非表示
  const [removeConfirmFlag, setRemoveConfirmFlag] = useState(false)

  // 編集画面を開く
  const openMemoEditor = useCallback((type: 'add' | 'update', refMemoItem?: React.RefObject<HTMLDivElement>) => {
    if (type === 'add') {
      setEditMemoItem({
        memo_id: String(new Date().getTime()),
        memo_name: '',
        memo_order: 0,
        memo_accent: 'off',
      })
    } else if (type === 'update') {
      if (refMemoItem === undefined || refMemoItem.current === null) return
      setEditMemoItem({
        memo_id: refMemoItem.current.getAttribute('data-memo_id'),
        memo_name: refMemoItem.current.getAttribute('data-memo_name'),
        memo_order: Number(refMemoItem.current.getAttribute('data-memo_order')),
        memo_accent: refMemoItem.current.getAttribute('data-memo_accent'),
      } as TypeMemoItem)
    }
    setEditType(type)
  }, [])

  // メモ編集をキャンセル
  const cancelMemoEdit = useCallback(() => {
    setEditMemoItem({
      memo_id: '',
      memo_name: '',
      memo_order: 0,
      memo_accent: 'off',
    })
    setEditType('')
  }, [])

  // メモ追加完了
  const completeMemoAdd = useCallback(() => {
    // console.log('completeMemoAdd()')
    if (editMemoItem.memo_name === '') {
      alert('メモが未入力です。')
      return
    }
    (async () => {
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: true,
        },
      })
      const newMemoData = [...memoData]

      // 新規メモをメモ配列に追加し、順番（memo_order）を設定し直す
      newMemoData.splice(editMemoItem.memo_order, 0, editMemoItem)
      newMemoData.forEach((value, index) => {
        value.memo_order = index
      })

      // Firebaseに送信
      const sendData = localData2FirebaseData(newMemoData)
      await fetch(`${memoDataUrl}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })

      // Firebaseから取得
      const res = await fetch(`${memoDataUrl}.json`)
      const data = await res.json()
      const localData = firebaseData2LocalData(data)

      setMemoData(sortMemoItemOrder(localData))
      setEditMemoItem({
        memo_id: '',
        memo_name: '',
        memo_order: 0,
        memo_accent: 'off',
      })
      setEditType('')
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    })()
  // eslint-disable-next-line
  }, [editMemoItem])

  // メモ編集完了
  const completeMemoUpdate = useCallback(() => {
    if (editMemoItem.memo_name === '') {
      alert('メモが未入力です。')
      return
    }
    (async () => {
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: true,
        },
      })
      let newMemoData = [...memoData]
      const oldOrder = newMemoData.findIndex(v => v.memo_id === editMemoItem.memo_id)
      newMemoData = newMemoData.filter((v, i) => {
        return i !== oldOrder
      })
      newMemoData.splice(editMemoItem.memo_order, 0, editMemoItem)
      newMemoData.forEach((value, index) => {
        value.memo_order = index
      })

      // Firebaseに送信
      const sendData = localData2FirebaseData(newMemoData)
      await fetch(`${memoDataUrl}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })

      // Firebaseから取得
      const res = await fetch(`${memoDataUrl}.json`)
      const data = await res.json()
      const localData = firebaseData2LocalData(data)

      setMemoData(sortMemoItemOrder(localData))
      setEditMemoItem({
        memo_id: '',
        memo_name: '',
        memo_order: 0,
        memo_accent: 'off',
      })
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    })()
  // eslint-disable-next-line
  }, [editMemoItem])

  // メモを削除する
  const removeMemoItem = useCallback((flag: boolean) => {
    if (!flag) return
    (async () => {
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: true,
        },
      })
      let newMemoData = [...memoData]
      const memoOrder = newMemoData.findIndex(v => v.memo_id === editMemoItem.memo_id)
      newMemoData = newMemoData.filter((v, i) => {
        return memoOrder !== i
      })
      newMemoData.forEach((value, index) => {
        value.memo_order = index
      })

      // Firebaseに送信
      const sendData = localData2FirebaseData(newMemoData)
      await fetch(`${memoDataUrl}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })

      // Firebaseから取得
      const res = await fetch(`${memoDataUrl}.json`)
      const data = await res.json()
      const localData = firebaseData2LocalData(data)

      setMemoData(sortMemoItemOrder(localData))
      setEditMemoItem({
        memo_id: '',
        memo_name: '',
        memo_order: 0,
        memo_accent: 'off',
      })
      dispatch({
        type: 'updateIsLoading',
        payload: {
          isLoading: false,
        },
      })
    })()
  // eslint-disable-next-line
  }, [memoData, editMemoItem])

  // メモ削除の確認画面
  const openRemoveConfirm = useCallback(() => {
    setRemoveConfirmFlag(true)
  }, [])
  const closeRemoveConfirm = useCallback((flag: boolean) => {
    setRemoveConfirmFlag(false)
    removeMemoItem(flag)
  // eslint-disable-next-line
  }, [removeConfirmFlag])

  return (
    <StyledDiv>

      <div className="memoList">
        {memoData.map((value, index) => {
          return (
            <MemoItem
              memoItem={value}
              key={index}
              openMemoEditor={openMemoEditor}
            ></MemoItem>
          )
        })}
      </div>

      <ButtonAddMemoItem
        onClick={() => {openMemoEditor('add')}}
      ></ButtonAddMemoItem>

      <MemoEditor
        memoData={memoData}
        editMemoItem={editMemoItem}
        setEditMemoItem={setEditMemoItem}
        editType={editType}
        cancelMemoEdit={cancelMemoEdit}
        completeMemoAdd={completeMemoAdd}
        completeMemoUpdate={completeMemoUpdate}
        openRemoveConfirm={openRemoveConfirm}
      />

      <RemoveConfirm
        removeConfirmFlag={removeConfirmFlag}
        setRemoveConfirmFlag={setRemoveConfirmFlag}
        closeRemoveConfirm={closeRemoveConfirm}
      />

    </StyledDiv>
  )
}

export default MemoApp

const StyledDiv = styled.div`
overflow: auto;
height: 100%;
  .memoList {
    padding: 0.5em;
    display: flex;
    flex-wrap: wrap;
  }
`
