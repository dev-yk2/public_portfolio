import { useState } from 'react'
import type * as Types from '../types'

/**
 * 表示非表示フラグを持った本データの配列
 * bookList = [
 *   {
 *     id: 1,
 *     isbn: '1111111111111',
 *     title: 'book title',
 *     authors: ['author1', 'author2',],
 *     publisher: 'publisher',
 *     memo: 'This is book memo.',
 *     tags: [
 *       {id: 1, name: 'tag1',},
 *       {id: 2, name: 'tag2',},
 *     ],
 *     user_id: 1,
 *   }
 * ]
 * @returns
 */
const useBookList = () => {
  const [bookList, setBookList] = useState<Types.BookItem[]>([])
  return { bookList, setBookList }
}

export default useBookList
