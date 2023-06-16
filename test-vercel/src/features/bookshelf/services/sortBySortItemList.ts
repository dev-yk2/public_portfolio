import React from 'react'
import { BookItem } from '../types'

/**
 * 「並び替え」のロジック
 */
export const sortBySortItemList = (
  sortType: string,
  setBookItemList: React.Dispatch<React.SetStateAction<BookItem[]>>
) => {
  setBookItemList((prevState) => {
    const newState = [...prevState]
    newState.sort((first, second) => {
      if (sortType === 'title') {
        if (first.title > second.title) return 1
        if (first.title < second.title) return -1
        return 0
      }
      if (sortType === 'author') {
        if (first.authors[0] > second.authors[0]) return 1
        if (first.authors[0] < second.authors[0]) return -1
        return 0
      }
      if (sortType === 'publisher') {
        if (first.publisher > second.publisher) return 1
        if (first.publisher < second.publisher) return -1
        return 0
      }
      return 0
    })
    return newState
  })
}
