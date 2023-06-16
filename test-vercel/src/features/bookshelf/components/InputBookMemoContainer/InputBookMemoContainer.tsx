import React from 'react'
import { EditBook } from '../../types'

type InputBookMemoContainerProps = {
  editBook: EditBook
  handleMemoTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const InputBookMemoContainer: React.FC<InputBookMemoContainerProps> = ({
  editBook,
  handleMemoTextareaChange,
}) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">メモ</dt>
      <dd>
        <div>
          <textarea
            className="w-full h-48 bg-zinc-200 resize-y"
            value={editBook.memo}
            onChange={handleMemoTextareaChange}
          />
        </div>
      </dd>
    </dl>
  )
}
