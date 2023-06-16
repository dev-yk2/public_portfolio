import React from 'react'
import { kata2Hira, zen2Han } from '../utils'
import { BookItem } from '../types'

/**
 * 「検索」ロジック
 * スペース区切りのアンド検索に対応
 */
export const searchByText = (searchText: string, setBookItemList: React.Dispatch<React.SetStateAction<BookItem[]>>) => {
  // 1.検索文字列前後のスペースを削除 2.全角スペースを半角スペースに変換 3.splitで配列化 4.zen2Hanで全角英数を半角に変換 5.kata2Hiraでカタカナをひらがなに変換
  const convertedSearchTextArray = searchText
    .trim()
    // eslint-disable-next-line no-irregular-whitespace
    .replace(/　/g, ' ')
    .split(' ')
    .map((str) => kata2Hira(zen2Han(str)))
  setBookItemList((prevState) => {
    return prevState.map((bookItem) => {
      const searchFlag = convertedSearchTextArray.every((convertedSearchText) => {
        // 今回はtest（正規表現）だが、includesでも可。
        const regexp = new RegExp(convertedSearchText, 'i') // アルファベット大文字小文字の区別なし。includesの場合toLowerCaseを使う。
        // ISBNをチェック
        if (regexp.test(kata2Hira(zen2Han(bookItem.isbn)))) return true
        // タイトルをチェック
        if (regexp.test(kata2Hira(zen2Han(bookItem.title)))) return true
        // 著者をチェック
        for (let i = 0; i < bookItem.authors.length; i++) {
          if (regexp.test(kata2Hira(zen2Han(bookItem.authors[i])))) return true
          // breakをしなくてもreturn trueした時点でeveryは次の値に進むので、forの残りの処理もスキップされる。
        }
        // 出版社をチェック
        if (regexp.test(kata2Hira(zen2Han(bookItem.publisher)))) return true
        // タグをチェック
        for (let i = 0; i < bookItem.tags.length; i++) {
          if (regexp.test(kata2Hira(zen2Han(bookItem.tags[i].name)))) return true
        }
        return false
      })
      bookItem.isDisplay = searchFlag
      return bookItem
    })
  })
}
