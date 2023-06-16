import React from 'react'
import { Book } from '../../types'

type BookMemoContainerProps = {
  book: Book
}

export const BookMemoContainer: React.FC<BookMemoContainerProps> = ({ book }) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">メモ</dt>
      <dd>
        <pre>{book.memo}</pre>
      </dd>
    </dl>
  )
}
