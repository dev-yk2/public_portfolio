import { TypeMemoItem } from '../type/type'

type TypeFirebaseData = {
  [key: string]: TypeMemoItem
}

// Firebaseから取得したデータをメモ用に変換
export const firebaseData2LocalData = (firebaseData: TypeFirebaseData) => {
  let localData: TypeMemoItem[] = []
  for (const key in firebaseData) {
    localData.push(firebaseData[key])
  }
  return localData
}

// メモで使用しているデータをFirebase用に変換
export const localData2FirebaseData = (localData: TypeMemoItem[]) => {
  let firebaseData: TypeFirebaseData = {}
  localData.forEach(v => {
    firebaseData[v.memo_id] = v
  })
  return firebaseData
}

// 配列memoDataの並び順をmemo_orderの値で昇順にソートする
export const sortMemoItemOrder = (memoData: TypeMemoItem[]) => {
  let result = Object.keys(memoData).map(key => {
    return memoData[Number(key)]
  }).sort((a, b) => {
    return (a.memo_order < b.memo_order) ? -1 : 1 //オブジェクトの昇順ソート
  })
  return result
}
