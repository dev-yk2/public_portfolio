import React, { useRef } from 'react'
import styled from 'styled-components'

// components
import styles from '../../../const/styles'
import * as Types from '../../../types'
import ButtonBasic from '../../button/ButtonBasic'
import ButtonTagItem from '../../button/ButtonTagItem'
import ImageBasic from '../../image/ImageBasic'
import LinkBasic from '../../link/LinkBasic'
import TagHasDeleteButton from '../../tag/TagHasDeleteButton'

type Props = {
  newBook: Types.PreMyBookData
  setNewBook: React.Dispatch<React.SetStateAction<Types.PreMyBookData>>
  bookImgUrl: string

  tagListAll: Types.TagItem[]
  setTagListAll: React.Dispatch<React.SetStateAction<Types.TagItem[]>>
  newTag: string
  setNewTag: React.Dispatch<React.SetStateAction<string>>
  registerNewTag: () => void

  searchBook: () => Promise<void>
  registerNewBook: () => void

  bookErrorMessage: Types.BookErrorMessage
  setBookErrorMessage: React.Dispatch<
    React.SetStateAction<Types.BookErrorMessage>
  >
}

const RegisterBook: React.FC<Props> = (props) => {
  const refInputNewTag = useRef(null)

  return (
    <StyledDiv>
      <div className="left_column">
        {/* image */}
        <ImageBasic
          src={props.bookImgUrl}
          alt={props.newBook.title}
          priority={true}
        />
      </div>

      <div className="right_column">
        {/* data */}
        <dl className="isbn_area">
          <dt>ISBN</dt>
          <dd>
            <div className="search_isbn">
              <input
                type="text"
                // maxLength={14}
                value={props.newBook.isbn}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setNewBook((prevState) => {
                    return {
                      ...prevState,
                      isbn: e.target.value,
                    }
                  })
                }}
              />
              <ButtonBasic onClick={props.searchBook}>本を検索する</ButtonBasic>
            </div>
            <div className="error_text_wrap">
              {<p className="error_message">{props.bookErrorMessage.isbn}</p> ??
                null}
              {props.bookErrorMessage.registeredBookUrl ? (
                <LinkBasic
                  styles={{
                    'text-decoration': 'underline',
                    // 'color': `${styles['--color-font-accent']}`,
                  }}
                  hoverStyles={{
                    color: `${styles['--color-font-accent']}`,
                  }}
                  href={{
                    pathname: `${props.bookErrorMessage.registeredBookUrl}`,
                  }}
                >
                  →こちら
                </LinkBasic>
              ) : null}
            </div>
          </dd>
        </dl>

        <dl className="title_area">
          <dt>タイトル</dt>
          <dd>
            <div>
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setNewBook((prevState) => {
                    return {
                      ...prevState,
                      title: e.target.value,
                    }
                  })
                }}
                value={props.newBook.title}
              />
            </div>
            {<p className="error_message">{props.bookErrorMessage.title}</p> ??
              null}
          </dd>
        </dl>

        <dl className="authors_area">
          <dt>著者</dt>
          <dd>
            <div>
              {props.newBook.authors.map((author, index) => {
                return (
                  <div key={index} className="input_wrap">
                    <input
                      type="text"
                      value={author}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.setNewBook((prevState) => {
                          // const authors = [...prevState.authors]
                          // authors[index] = e.target.value
                          const authors = prevState.authors.map((v, i) => {
                            if (i === index) v = e.target.value
                            return v
                          })
                          return {
                            ...prevState,
                            authors: authors,
                          }
                        })
                      }}
                    />
                    {props.newBook.authors.length > 1 ? (
                      <button
                        className="button_delete_author"
                        onClick={() => {
                          props.setNewBook((prevState) => {
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
                  props.setNewBook((prevState) => {
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
            {(
              <p className="error_message">{props.bookErrorMessage.authors}</p>
            ) ?? null}
          </dd>
        </dl>

        <dl className="title_area">
          <dt>出版社</dt>
          <dd>
            <div>
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.setNewBook((prevState) => {
                    return {
                      ...prevState,
                      publisher: e.target.value,
                    }
                  })
                }}
                value={props.newBook.publisher}
              />
            </div>
            {(
              <p className="error_message">
                {props.bookErrorMessage.publisher}
              </p>
            ) ?? null}
          </dd>
        </dl>

        <dl className="tags_area">
          <dt>タグ</dt>
          <dd>
            <p className="tag_area_text">現在設定中のタグ</p>
            <div>
              {props.newBook.tags.length === 0 ? (
                <p className="tag_blank_text">［タグ未設定］</p>
              ) : null}
              {props.newBook.tags.map((tag, index) => {
                return (
                  <TagHasDeleteButton
                    key={index}
                    onClick={() => {
                      props.setNewBook((prevState) => {
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
                      const check = props.newBook.tags.some(
                        (v) => v.id === tagItem.id,
                      )
                      if (check) return

                      props.setNewBook((prevState) => {
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
                value={props.newTag}
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
          </dd>
        </dl>

        <dl className="memo_area">
          <dt>メモ</dt>
          <dd>
            <textarea
              value={props.newBook.memo}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                props.setNewBook((prevState) => {
                  return {
                    ...prevState,
                    memo: e.target.value,
                  }
                })
              }}
            />
          </dd>
        </dl>

        <div className="submit_button_wrap">
          <ButtonBasic
            styles={{
              'font-size': '1.2em',
            }}
            onClick={() => {
              const answer = window.confirm(
                '本のデータを登録します。\nよろしいですか？',
              )
              if (!answer) return
              props.registerNewBook()
            }}
          >
            登録する
          </ButtonBasic>
        </div>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
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
  .error_message {
    color: ${styles['--color-font-error']};
  }
  dl {
    margin-top: 0.8em;
    dt {
      /* padding-left: 0.6em; */
      /* border-left: 0.2em solid ${styles['--color-font-default']}; */
      font-weight: bold;
    }
  }

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

  .isbn_area {
    margin-top: 0;
    dd {
      .search_isbn {
        display: flex;
        input {
          margin-right: 1em;
          width: 10em;
        }
      }
      .error_text_wrap {
        display: flex;
      }
    }
  }
  .title_area {
  }
  .authors_area {
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
  .publisher_area {
  }
  .tags_area {
    .tag_area_text {
      margin-top: 0.2em;
      color: ${styles['--color-font-sub']};
      font-size: 0.8em;
    }
    .tag_blank_text {
      margin-bottom: 0.5em;
      padding: 0.2em 0 0.1em;
    }
    .tag_create {
      display: flex;
      input {
        margin-right: 1em;
        width: 10em;
      }
    }
  }
  .memo_area {
  }
  .submit_button_wrap {
    display: flex;
    justify-content: center;
    padding: 2em 0 1em;
  }
`

export default RegisterBook
