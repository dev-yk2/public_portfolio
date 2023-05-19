import { useState } from 'react'
import type * as Types from '../types'

/**
 * 表示非表示フラグを持ったタグデータの配列
 * tagList = [
 *   {id: 1, name: 'aaa', user_id: 1, displayFlag: true,},
 *   {id: 2, name: 'bbb', user_id: 1, displayFlag: true,},
 * ]
 * @returns
 */
const useTagList = () => {
  const [tagList, setTagList] = useState<Types.TagItem[]>([])
  return { tagList, setTagList }
}

export default useTagList
