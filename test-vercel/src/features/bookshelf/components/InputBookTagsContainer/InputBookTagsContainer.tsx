import React from 'react'
import { EditBook, TagItem } from '../../types'
import { ButtonBasic } from '../ButtonBasic'

type InputBookTagsContainerProps = {
  editBook: EditBook
  tagItemList: TagItem[]
  newTagName: string
  // eslint-disable-next-line no-unused-vars
  handleDeleteTagFromEditBookBtnClick: (tag: { id: string; name: string; userId: string }) => void
  // eslint-disable-next-line no-unused-vars
  handleAddTagToEditBookBtnClick: (tagItem: TagItem, index: number) => void
  handleNewTagNameInputChange: React.ChangeEventHandler<HTMLInputElement>
  handleRegistNewTagBtnClick: React.MouseEventHandler<HTMLButtonElement>
}

export const InputBookTagsContainer: React.FC<InputBookTagsContainerProps> = ({
  editBook,
  tagItemList,
  newTagName,
  handleDeleteTagFromEditBookBtnClick,
  handleAddTagToEditBookBtnClick,
  handleNewTagNameInputChange,
  handleRegistNewTagBtnClick,
}) => {
  return (
    <dl className="mt-4">
      <dt className="font-bold">タグ</dt>
      <dd>
        <div className="text-sm">
          <p className="mt-1 font-bold">［現在設定中のタグ］</p>
          <div className="flex">
            {editBook.tags.length === 0 ? <p>※ 現在設定中のタグはありません。</p> : null}
            {editBook.tags.map((tag, index) => {
              return (
                <div className="flex items-center m-1 py-1 pl-2 pr-1 bg-zinc-200" key={index}>
                  {tag.name}
                  <button
                    className="relative block ml-2 w-4 h-4 before:content-[''] before:absolute before:left-[50%] before:top-[50%] before:-translate-x-[50%] -before:translate-y-[50%] before:rotate-45 before:block before:w-[80%] before:h-[1px] before:bg-zinc-600 after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:-translate-x-[50%] -after:translate-y-[50%] after:-rotate-45 after:block after:w-[80%] after:h-[1px] after:bg-zinc-600"
                    onClick={() => {
                      handleDeleteTagFromEditBookBtnClick(tag)
                    }}
                  ></button>
                </div>
              )
            })}
          </div>
        </div>
        <div className="text-sm">
          <p className="mt-1 font-bold">［既存タグから追加］</p>
          <div>
            {tagItemList.length === 0 ? <p>※ 既存のタグはありません。</p> : null}
            {tagItemList.map((tagItem, index) => {
              return (
                <button
                  className={`m-0.5 py-0.5 px-2 border border-zinc-800 rounded-md hover:text-sky-500 ${
                    tagItem.isDisplay ? '' : 'opacity-50 pointer-events-none'
                  }`}
                  key={index}
                  onClick={() => {
                    handleAddTagToEditBookBtnClick(tagItem, index)
                  }}
                >
                  {tagItem.name}
                </button>
              )
            })}
          </div>
        </div>
        <div className="text-sm">
          <p className="mt-1 font-bold">［新規タグを作成］</p>
          <div className="flex">
            <input className="w-48 bg-zinc-200" type="text" onChange={handleNewTagNameInputChange} value={newTagName} />
            <ButtonBasic className="ml-4 text-sm" onClick={handleRegistNewTagBtnClick}>
              新規タグを登録
            </ButtonBasic>
          </div>
        </div>
      </dd>
    </dl>
  )
}
