import { useState } from 'react'
import type * as Types from '../types'

/**
 * 著者名の配列
 * authors = ['aaa', 'bbb', 'ccc']
 * @returns
 */
const useAuthors = () => {
  const [authors, setAuthors] = useState<Types.BookAuther[]>([])
  return { authors, setAuthors }
}

export default useAuthors
