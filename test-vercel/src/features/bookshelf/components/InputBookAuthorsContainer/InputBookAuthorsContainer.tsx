import React from 'react'
import { BookErrorMessage, EditBook } from '../../types'
import { ButtonBasic } from '../ButtonBasic'

type InputBookAuthorsContainerProps = {
  editBook: EditBook
  bookErrorMessage: BookErrorMessage
  // eslint-disable-next-line no-unused-vars
  handleAuthorInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  // eslint-disable-next-line no-unused-vars
  handleDeleteAuthorBtnClick: (index: number) => void
  handleAddAuthorInputBtnClick: React.MouseEventHandler<HTMLButtonElement>
}

export const InputBookAuthorsContainer: React.FC<InputBookAuthorsContainerProps> = ({
  editBook,
  bookErrorMessage,
  handleAuthorInputChange,
  handleDeleteAuthorBtnClick,
  handleAddAuthorInputBtnClick,
}) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">著者</dt>
      <dd>
        <div>
          {editBook.authors.map((author, index) => {
            return (
              <div className="relative [&:nth-child(n+2)]:mt-2" key={index}>
                <input
                  className="w-full bg-zinc-200"
                  type="text"
                  value={author}
                  onChange={(e) => {
                    handleAuthorInputChange(e, index)
                  }}
                />
                {editBook.authors.length > 1 ? (
                  <button
                    className="absolute right-4 top-[50%] translate-x-[50%] -translate-y-[50%] block w-4 h-4 before:content-[''] before:absolute before:left-[50%] before:top-[50%] before:-translate-x-[50%] -before:translate-y-[50%] before:rotate-45 before:block before:w-[80%] before:h-[1px] before:bg-zinc-600 after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:-translate-x-[50%] -after:translate-y-[50%] after:-rotate-45 after:block after:w-[80%] after:h-[1px] after:bg-zinc-600"
                    onClick={() => {
                      handleDeleteAuthorBtnClick(index)
                    }}
                  ></button>
                ) : null}
              </div>
            )
          })}
          <ButtonBasic className="mt-2 text-sm" onClick={handleAddAuthorInputBtnClick}>
            著者を追加する
          </ButtonBasic>
        </div>
        {bookErrorMessage.authors ? <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.authors}</p> : null}
      </dd>
    </dl>
  )
}
