import { useState } from 'react'
import type * as Types from '../types'

/**
 * 出版社の配列
 * publishers = ['aaa', 'bbb', 'ccc']
 * @returns
 */
const usePublishers = () => {
  const [publishers, setPublishers] = useState<Types.BookPublisher[]>([])
  return { publishers, setPublishers }
}

export default usePublishers
