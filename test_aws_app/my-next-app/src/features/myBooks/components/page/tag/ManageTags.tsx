import React from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'
import * as Types from '../../../types'
import * as Utils from '../../../utils'

// components
import ButtonBasic from '../../button/ButtonBasic'

// context
// import { UserContext } from '@/features/myBooks/context/UserContext'

type Props = {
  tagListAll: Types.TagEditable[]
  setTagListAll: React.Dispatch<React.SetStateAction<Types.TagEditable[]>>
  editTag: Types.PreTag
  setEditTag: React.Dispatch<React.SetStateAction<Types.PreTag>>
  newTag: string
  setNewTag: React.Dispatch<React.SetStateAction<string>>

  registerTag: () => void
  updateTag: () => void
  removeTag: (tagId: number) => void
}

const ManageTags: React.FC<Props> = (props) => {
  // const { state, dispatch } = useContext(UserContext)
  return (
    <StyledDiv>
      <dl className="create_area">
        {/* 新規タグ追加 */}
        <dt>タグを作成</dt>
        <dd className="input_wrap">
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.setNewTag(e.target.value)
            }}
            value={props.newTag}
          />
          <ButtonBasic
            onClick={() => {
              if (props.newTag === '') return
              const confirm = window.confirm(
                'タグを作成します。\nよろしいですか？',
              )
              if (!confirm) return
              props.registerTag()
            }}
          >
            作成する
          </ButtonBasic>
        </dd>
      </dl>

      <dl className="edit_area">
        {/* 「タグを検索」機能は必要か？ */}
        <dt>タグを編集</dt>
        <dd>
          {/* 既存タグ編集削除 */}
          {props.tagListAll.map((tagItem, index) => {
            return (
              <div
                className={`tag_item ${tagItem.displayFlag ? '' : 'disabled'}`}
                key={index}
              >
                <div>
                  {tagItem.editMode ? (
                    <input
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.setEditTag((prevState) => {
                          return {
                            ...prevState,
                            name: e.target.value,
                          }
                        })
                      }}
                      value={props.editTag.name}
                    />
                  ) : (
                    <p>{tagItem.name}</p>
                  )}
                </div>
                {tagItem.editMode ? (
                  <div>
                    <ButtonBasic
                      styles={{
                        'min-width': '7em',
                        'font-size': '0.8em',
                      }}
                      onClick={() => {
                        props.setTagListAll((prevState) => {
                          return prevState.map((v, i) => {
                            if (i === index) {
                              return {
                                ...v,
                                displayFlag: true,
                                editMode: false,
                              }
                            } else {
                              return {
                                ...v,
                                displayFlag: true,
                                editMode: false,
                              }
                            }
                          })
                        })
                      }}
                    >
                      キャンセル
                    </ButtonBasic>
                  </div>
                ) : (
                  <div>
                    <ButtonBasic
                      styles={{
                        'min-width': '7em',
                        'font-size': '0.8em',
                      }}
                      onClick={() => {
                        props.setEditTag(() => {
                          return {
                            name: tagItem.name,
                            id: tagItem.id,
                          }
                        })
                        props.setTagListAll((prevState) => {
                          return prevState.map((v, i) => {
                            if (i === index) {
                              return {
                                ...v,
                                displayFlag: true,
                                editMode: true,
                              }
                            } else {
                              return {
                                ...v,
                                displayFlag: false,
                                editMode: false,
                              }
                            }
                          })
                        })
                      }}
                    >
                      編集
                    </ButtonBasic>
                  </div>
                )}
                {tagItem.editMode ? (
                  <div>
                    <ButtonBasic
                      styles={{
                        'min-width': '7em',
                        'font-size': '0.8em',
                      }}
                      hoverStyles={{
                        'border-color': `${styles['--color-border-error']}`,
                      }}
                      onClick={() => {
                        if (props.editTag.name === '') return
                        const confirm = window.confirm(
                          'タグを更新します。\nよろしいですか？',
                        )
                        if (!confirm) return
                        props.updateTag()
                      }}
                    >
                      更新
                    </ButtonBasic>
                  </div>
                ) : (
                  <div>
                    <ButtonBasic
                      styles={{
                        'min-width': '7em',
                        'font-size': '0.8em',
                      }}
                      hoverStyles={{
                        'border-color': `${styles['--color-border-error']}`,
                      }}
                      onClick={() => {
                        const confirm = window.confirm(
                          'タグを削除します。\nよろしいですか？',
                        )
                        if (!confirm) return
                        props.removeTag(tagItem.id)
                      }}
                    >
                      削除
                    </ButtonBasic>
                  </div>
                )}
              </div>
            )
          })}
        </dd>
      </dl>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  padding: 20px 0;
  height: 100%;

  input {
    background-color: ${styles['--color-background-sub']};
  }

  dl {
    &:not(:first-child) {
      margin-top: 1em;
    }
    dt {
      font-weight: bold;
    }
    dd {
      margin-top: 0.5em;
    }
  }

  .create_area {
    .input_wrap {
      display: flex;
      input {
        margin-right: 1em;
        width: 10em;
      }
    }
  }

  .edit_area {
    .tag_item {
      position: relative;
      display: flex;
      padding: 0.5em 0;
      border-top: 1px solid ${styles['--color-border-default']};
      &:last-child {
        border-bottom: 1px solid ${styles['--color-border-default']};
      }
      &.disabled {
        pointer-events: none;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 1px;
          width: 100%;
          height: calc(100% - 1px);
          background-color: rgba(
            ${Utils.hex2Rgb(styles['--color-background-default'])},
            0.8
          );
        }
      }
      div {
        --width-button-area: 6em;
        &:nth-child(1) {
          width: calc(100% - var(--width-button-area) * 2);
        }
        &:nth-child(2),
        &:nth-child(3) {
          width: var(--width-button-area);
        }
        &:nth-child(1) {
          padding-right: 1em;
          input {
            width: 100%;
          }
        }
        &:nth-child(2) {
        }
        &:nth-child(3) {
        }
      }
    }
  }
`

export default ManageTags
