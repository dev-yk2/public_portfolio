import React from 'react'
import { Book } from '../../types'

type BookTagsContainerProps = {
  book: Book
}

export const BookTagsContainer: React.FC<BookTagsContainerProps> = ({ book }) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">タグ</dt>
      <dd>
        <div className="text-sm">
          <div className="flex">
            {book.tags.length === 0 ? <p>※ 現在設定中のタグはありません。</p> : null}
            {book.tags.map((tag, index) => {
              return (
                <div className="flex items-center m-1 py-1 pl-2 pr-1 bg-zinc-200" key={index}>
                  {tag.name}
                </div>
              )
            })}
          </div>
        </div>
      </dd>
    </dl>
  )
}
