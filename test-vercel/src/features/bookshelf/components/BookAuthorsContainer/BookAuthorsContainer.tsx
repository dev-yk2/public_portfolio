import React from 'react'
import { Book } from '../../types'

type BookAuthorsContainerProps = {
  book: Book
}

export const BookAuthorsContainer: React.FC<BookAuthorsContainerProps> = ({ book }) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">著者</dt>
      <dd>
        <div>
          {book.authors.map((author, index) => {
            return (
              <div className="relative [&:nth-child(n+2)]:mt-2" key={index}>
                {author}
              </div>
            )
          })}
        </div>
      </dd>
    </dl>
  )
}
