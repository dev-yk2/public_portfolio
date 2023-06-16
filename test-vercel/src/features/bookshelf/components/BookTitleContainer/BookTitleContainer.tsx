import React from 'react'
import { Book } from '../../types'

type BookTitleContainerProps = {
  book: Book
}

export const BookTitleContainer: React.FC<BookTitleContainerProps> = ({ book }) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">タイトル</dt>
      <dd>
        <div>{book.title}</div>
      </dd>
    </dl>
  )
}
