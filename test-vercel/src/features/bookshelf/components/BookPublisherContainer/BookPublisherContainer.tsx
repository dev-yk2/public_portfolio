import React from 'react'
import { Book } from '../../types'

type BookPublisherContainerProps = {
  book: Book
}

export const BookPublisherContainer: React.FC<BookPublisherContainerProps> = ({ book }) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">出版社</dt>
      <dd>
        <div>{book.publisher}</div>
      </dd>
    </dl>
  )
}
