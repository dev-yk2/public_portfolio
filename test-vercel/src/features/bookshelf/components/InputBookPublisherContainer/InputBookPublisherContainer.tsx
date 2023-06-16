import React from 'react'
import { BookErrorMessage, EditBook } from '../../types'

type InputBookPublisherContainerProps = {
  editBook: EditBook
  bookErrorMessage: BookErrorMessage
  handlePublisherInputChange: React.ChangeEventHandler<HTMLInputElement>
}

export const InputBookPublisherContainer: React.FC<InputBookPublisherContainerProps> = ({
  editBook,
  bookErrorMessage,
  handlePublisherInputChange,
}) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">出版社</dt>
      <dd>
        <div>
          <input
            className="w-full bg-zinc-200"
            type="text"
            value={editBook.publisher}
            onChange={handlePublisherInputChange}
          />
        </div>
        {bookErrorMessage.publisher ? <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.publisher}</p> : null}
      </dd>
    </dl>
  )
}
