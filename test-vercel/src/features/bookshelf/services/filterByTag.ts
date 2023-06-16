import React from 'react'
import { TagItem } from '../types'

/**
 * 「タグで絞り込み」のロジック
 * クリックしたタグをselectedTagIdsに追加または削除する。
 */
export const filterByTag = (tagItem: TagItem, setSelectedTagIds: React.Dispatch<React.SetStateAction<string[]>>) => {
  setSelectedTagIds((prevState) => {
    if (prevState.indexOf(tagItem.id) === -1) {
      tagItem.isDisplay = false
      // クリックしたタグが未選択だったら、selectedTagIdsに追加する
      return [...prevState, tagItem.id]
    } else {
      tagItem.isDisplay = true
      // クリックしたタグが選択済みだったら、selectedTagIdsから削除する
      const newState = prevState.filter((v) => v !== tagItem.id)
      return newState
    }
  })
}
