import React from 'react'
import type { BookErrorMessage, EditBook } from '../../types'

type InputBookTitleContainerProps = {
  editBook: EditBook
  bookErrorMessage: BookErrorMessage
  handleTitleInputChange: React.ChangeEventHandler<HTMLInputElement>
}

export const InputBookTitleContainer: React.FC<InputBookTitleContainerProps> = ({
  editBook,
  bookErrorMessage,
  handleTitleInputChange,
}) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">タイトル</dt>
      <dd>
        <div>
          <input className="w-full bg-zinc-200" type="text" value={editBook.title} onChange={handleTitleInputChange} />
        </div>
        {bookErrorMessage.title ? <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.title}</p> : null}
      </dd>
    </dl>
  )
}
