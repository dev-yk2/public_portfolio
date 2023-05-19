import React, { useEffect, useRef, useReducer } from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'
import * as Types from '../../../types'

import ButtonBasic from '../../button/ButtonBasic'
import ButtonTagItem from '../../button/ButtonTagItem'
import ImageBasic from '../../image/ImageBasic'
import TagBasic from '../../tag/TagBasic'
import TagHasDeleteButton from '../../tag/TagHasDeleteButton'

/**
 * reducer
 * 「絞り込み」「並び替え」トグルメニューの状態管理
 */
export type TypeEditState = {
  editMode: boolean
  titleHeight: number
}

export type TypeEditAction =
  | {
      type: 'editModeOn'
      payload: {
        // editMode: boolean
        titleHeight: number
      }
    }
  | {
      type: 'editModeOff'
      payload: {
        // editMode: boolean
        titleHeight: number
      }
    }

const reducer = (editState: TypeEditState, action: TypeEditAction) => {
  switch (action.type) {
    case 'editModeOn':
      return {
        ...action.payload,
        editMode: true,
      }
    case 'editModeOff':
      return {
        ...action.payload,
        editMode: false,
      }
    default:
      return editState
  }
}

const initialState: TypeEditState = {
  editMode: false,
  titleHeight: 0,
}
/* /reducer */

type Props = {
  bookItem: Types.BookItem
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  editedBookData: Types.MyBookData
  setEditedBookData: React.Dispatch<
    React.SetStateAction<Types.MyBookData | undefined>
  >

  tagListAll: Types.TagItem[]
  setTagListAll: React.Dispatch<React.SetStateAction<Types.TagItem[]>>

  newTag: string
  setNewTag: React.Dispatch<React.SetStateAction<string>>
  registerNewTag: () => void

  updateBookData: () => Promise<void>
  deleteBookData: () => Promise<void>
}

// eslint-disable-next-line
const BookDetail: React.FC<Props> = React.memo((props) => {
  const [editState, editDispatch] = useReducer(reducer, initialState)

  const refBookTitle = useRef(null)
  const refEditBookTitle = useRef(null)
  const refInputNewTag = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line
    if (props.editMode) {
      // 編集モード時
      if (refBookTitle.current === null) return
      const ttl = refBookTitle.current as HTMLDivElement
      const ttlHeight = ttl.scrollHeight
      editDispatch({
        type: 'editModeOn',
        payload: {
          // editMode: true,
          titleHeight: ttlHeight,
        },
      })
    } else {
      // 閲覧モード時
      editDispatch({
        type: 'editModeOff',
        payload: {
          // editMode: false,
          titleHeight: 0,
        },
      })
    }
    // eslint-disable-next-line
  }, [props.editMode])

  useEffect(() => {
    if (editState.editMode) {
      // 編集モード時
      if (refEditBookTitle.current === null) return
      const editTTl = refEditBookTitle.current as HTMLTextAreaElement
      editTTl.style.height = `${editState.titleHeight}px`

      // 編集本データを初期化
      // eslint-disable-next-line
      props.setEditedBookData(() => {
        return {
          // eslint-disable-next-line
          id: props.bookItem.id,
          isbn: props.bookItem.isbn,
          title: props.bookItem.title,
          authors: JSON.parse(JSON.stringify(props.bookItem.authors)), // deep copy
          publisher: props.bookItem.publisher,
          tags: JSON.parse(JSON.stringify(props.bookItem.tags)), // deep copy
          memo: props.bookItem.memo,
          user_id: props.bookItem.user_id,
        }
      })

      // 全タグデータのdisplayFlagを初期化
      const tagIdsInBook = props.bookItem.tags.map((v) => v.id)
      props.setTagListAll((prevState) => {
        return prevState.map((v) => {
          const isInclude = tagIdsInBook.includes(v.id)
          return {
            ...v,
            displayFlag: !isInclude, // どっちをfalseにするのか
          }
        })
      })
    } else {
      // 閲覧モード時
    }
    // eslint-disable-next-line
  }, [editState.editMode])

  // 新規タグを追加できた場合input欄を空にする
  useEffect(() => {
    if (props.newTag === '') {
      if (refInputNewTag.current === null) return
      const inputNewTag = refInputNewTag.current as HTMLInputElement
      inputNewTag.value = ''
    }
  }, [props.newTag])

  return (
    <StyledDiv>
      <div className="left_column">
        <ImageBasic
          src={props.bookItem.imageUrl}
          alt={props.bookItem.title}
          priority={true}
        />
      </div>

      <div className="right_column">
        {/* ---------- ISBN ---------- */}
        <div className="book_isbn_area">
          <div>ISBNコード : {props.bookItem.isbn}</div>
          <ButtonBasic
            styles={{
              width: '8em',
            }}
            onClick={() => {
              props.setEditMode((prevState) => !prevState)
            }}
          >
            {props.editMode ? 'キャンセル' : '編集する'}
          </ButtonBasic>
        </div>
        {/* ---------- /ISBN ---------- */}

        {/* ---------- タイトル ---------- */}
        <div className="book_title_area">
          {!editState.editMode ? (
            <div ref={refBookTitle}>{props.bookItem.title}</div>
          ) : (
            <div className="edit">
              <textarea
                ref={refEditBookTitle}
                value={props.editedBookData.title}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  props.setEditedBookData((prevState) => {
                    if (!prevState) return
                    return {
                      ...prevState,
                      title: event.target.value,
                    }
                  })
                }}
              />
            </div>
          )}
        </div>
        {/* ---------- /タイトル ---------- */}

        {/* ---------- 出版社 ---------- */}
        <div className="book_publisher_area">
          {!editState.editMode ? (
            <div>{props.bookItem.publisher}</div>
          ) : (
            <div className="edit">
              <input
                type="text"
                value={props.editedBookData.publisher}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.setEditedBookData((prevState) => {
                    if (!prevState) return
                    return {
                      ...prevState,
                      publisher: event.target.value,
                    }
                  })
                }}
              />
            </div>
          )}
        </div>
        {/* ---------- /出版社 ---------- */}

        {/* ---------- 著者 ---------- */}
        <div className="book_authors_area">
          {!editState.editMode ? (
            <div>
              {props.bookItem.authors.map((author, index) => {
                return (
                  <span className="author_name" key={index}>
                    {author}
                  </span>
                )
              })}
            </div>
          ) : (
            <div className="edit">
              {props.editedBookData.authors.map((author, index) => {
                return (
                  <div className="input_wrap" key={index}>
                    <input
                      type="text"
                      value={author}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        props.setEditedBookData((prevState) => {
                          if (!prevState) return
                          const newState = { ...prevState }
                          newState.authors[index] = event.target.value
                          return newState
                        })
                      }}
                    />
                    {props.editedBookData.authors.length > 1 ? (
                      <button
                        className="button_delete_author"
                        onClick={() => {
                          props.setEditedBookData((prevState) => {
                            if (!prevState) return
                            const authors = prevState.authors.filter(
                              (v, i) => i !== index,
                            )
                            return {
                              ...prevState,
                              authors: authors,
                            }
                          })
                        }}
                      ></button>
                    ) : null}
                  </div>
                )
              })}
              <ButtonBasic
                styles={{
                  'margin-top': '0.5em',
                  'font-size': '0.8em',
                }}
                onClick={() => {
                  props.setEditedBookData((prevState) => {
                    if (!prevState) return
                    const authors = [...prevState.authors]
                    authors.push('')
                    return {
                      ...prevState,
                      authors: authors,
                    }
                  })
                }}
              >
                著者を追加する
              </ButtonBasic>
            </div>
          )}
        </div>
        {/* ---------- /著者 ---------- */}

        {/* ---------- タグ ---------- */}
        <div className="book_tags_area">
          {!editState.editMode ? (
            <div className="tag_wrap">
              {props.bookItem.tags.map((tag, index) => {
                return <TagBasic key={index} id={tag.id} name={tag.name} />
              })}
            </div>
          ) : (
            <div className="edit">
              <p className="tag_area_text">現在設定中のタグ</p>
              <div className="tag_list_selected">
                {/* 本のタグ */}
                {props.editedBookData.tags.length === 0 ? (
                  <p className="tag_blank_text">［タグ未設定］</p>
                ) : null}
                {props.editedBookData.tags.map((tag, index) => {
                  return (
                    <TagHasDeleteButton
                      key={index}
                      onClick={() => {
                        props.setEditedBookData((prevState) => {
                          if (!prevState) return
                          const tags = prevState.tags.filter(
                            (v) => v.id !== tag.id,
                          )
                          return {
                            ...prevState,
                            tags: tags,
                          }
                        })

                        props.setTagListAll((prevState) => {
                          return prevState.map((v) => {
                            if (v.id === tag.id) {
                              v.displayFlag = true
                            }
                            return v
                          })
                        })
                      }}
                    >
                      {tag.name}
                    </TagHasDeleteButton>
                  )
                })}
              </div>
              <p className="tag_area_text">既存タグから追加</p>
              <div className="tag_list_all">
                {/* 全タグ */}
                {props.tagListAll.map((tagItem, index) => {
                  return (
                    <ButtonTagItem
                      key={index}
                      displayFlag={tagItem.displayFlag}
                      onClick={() => {
                        // 既に本のタグに設定済みだったら処理中断
                        const check = props.editedBookData.tags.some(
                          (v) => v.id === tagItem.id,
                        )
                        if (check) return

                        props.setEditedBookData((prevState) => {
                          if (!prevState) return
                          const tags = [...prevState.tags]
                          tags.push({
                            id: tagItem.id,
                            name: tagItem.name,
                            user_id: tagItem.user_id,
                          })
                          return {
                            ...prevState,
                            tags: tags,
                          }
                        })

                        props.setTagListAll((prevState) => {
                          return prevState.map((v, i) => {
                            if (i === index) {
                              v.displayFlag = false
                            }
                            return v
                          })
                        })
                      }}
                    >
                      {tagItem.name}
                    </ButtonTagItem>
                  )
                })}
              </div>
              <p className="tag_area_text">新規タグを作成</p>
              <div className="tag_create">
                {/* 新規タグ追加 */}
                <input
                  type="text"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setNewTag(event.target.value)
                  }}
                  ref={refInputNewTag}
                />
                <ButtonBasic
                  onClick={() => {
                    props.registerNewTag()
                  }}
                >
                  追加
                </ButtonBasic>
              </div>
            </div>
          )}
        </div>
        {/* ---------- /タグ ---------- */}

        {/* ---------- メモ ---------- */}
        <div className="book_memo_area">
          {!editState.editMode ? (
            <pre>{props.bookItem.memo}</pre>
          ) : (
            <div className="edit">
              <textarea
                value={props.editedBookData.memo}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  props.setEditedBookData((prevState) => {
                    if (!prevState) return
                    return {
                      ...prevState,
                      memo: event.target.value,
                    }
                  })
                }}
              />
            </div>
          )}
        </div>
        {/* ---------- /メモ ---------- */}

        {editState.editMode ? (
          <>
            <div className="submit_button_wrap">
              <ButtonBasic
                styles={{
                  'font-size': '1.2em',
                }}
                onClick={() => {
                  // console.log(props.editedBookData)
                  // console.log('click')
                  const answer = window.confirm(
                    '本のデータを更新します。\nよろしいですか？',
                  )
                  if (!answer) return
                  props.updateBookData()
                }}
              >
                更新する
              </ButtonBasic>
            </div>
            <div className="submit_button_wrap">
              <ButtonBasic
                styles={{
                  'font-size': '0.9em',
                }}
                hoverStyles={{
                  'border-color': styles['--color-border-error'],
                }}
                onClick={() => {
                  // console.log(props.editedBookData)
                  // console.log('click')
                  const answer = window.confirm(
                    '本のデータを削除します。\nこの操作は取り消せません。\nよろしいですか？',
                  )
                  if (!answer) return
                  props.deleteBookData()
                }}
              >
                削除する
              </ButtonBasic>
            </div>
          </>
        ) : null}
      </div>
    </StyledDiv>
  )
})

const StyledDiv = styled.div`
  --width-left-column: 260px;
  @media screen and (max-width: ${styles['--break-point']}px) {
    --width-left-column: 30%;
  }
  display: flex;
  flex-flow: row nowrap;
  /* align-items: center; */
  padding: 20px 0;
  height: 100%;
  @media screen and (max-width: ${styles['--break-point']}px) {
    display: block;
  }

  textarea,
  input {
    display: block;
    width: 100%;
    background-color: ${styles['--color-background-sub']};
  }
  textarea {
    resize: vertical;
    height: 200px;
  }
  pre {
    white-space: pre-wrap;
  }

  .left_column {
    width: var(--width-left-column);
    @media screen and (max-width: ${styles['--break-point']}px) {
      padding: 0 40px;
      width: 100%;
    }
  }
  .right_column {
    padding-left: 40px;
    width: calc(100% - var(--width-left-column));
    @media screen and (max-width: ${styles['--break-point']}px) {
      padding-left: 0;
      padding-top: 40px;
      width: 100%;
    }
  }

  .book_isbn_area {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 0.9em;
    .edit {
    }
  }
  .book_title_area {
    margin-top: 0.4em;
    font-size: 2em;
    .edit {
    }
  }
  .book_publisher_area {
    margin-top: 1.5em;
    .edit {
    }
  }
  .book_authors_area {
    margin-top: 1.5em;
    @media screen and (max-width: ${styles['--break-point']}px) {
      font-size: 16px;
    }
    .author_name {
      &:not(:first-child) {
        margin-left: 1em;
      }
    }
    .edit {
      .input_wrap {
        position: relative;
        &:not(:first-child) {
          margin-top: 0.5em;
        }
        input {
          padding-right: 2em;
        }
        .button_delete_author {
          position: absolute;
          right: 1em;
          top: 50%;
          transform: translate(50%, -50%);
          display: block;
          width: 1em;
          height: 1em;
          &::before,
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            display: block;
            width: 80%;
            height: 1px;
            background-color: ${styles['--color-font-default']};
          }
          &::before {
            transform: translate(-50%, -50%) rotate(45deg);
          }
          &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }
  }
  .book_tags_area {
    margin-top: 1.5em;
    .tag_wrap {
      display: flex;
      flex-flow: row wrap;
    }
    .edit {
      .tag_area_text {
        margin-top: 0.2em;
        color: ${styles['--color-font-sub']};
        font-size: 0.8em;
      }
      .tag_list_selected {
        display: flex;
        flex-flow: row wrap;
        .tag_blank_text {
          margin-bottom: 0.5em;
          padding: 0.2em 0 0.1em;
        }
      }
      .tag_list_all {
        display: flex;
        flex-flow: row wrap;
      }
      .tag_create {
        display: flex;
        input {
          margin-right: 0.5em;
          width: 12em;
        }
      }
    }
  }
  .book_memo_area {
    margin-top: 1.5em;
    .edit {
    }
  }

  .submit_button_wrap {
    display: flex;
    justify-content: center;
    padding: 2em 0 1em;
    & + .submit_button_wrap {
      padding: 1em 0 1em;
    }
  }
`

export default BookDetail
