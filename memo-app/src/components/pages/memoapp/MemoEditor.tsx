import React, { useMemo } from 'react'
import styled from 'styled-components'

import PartsButton from '../../parts/PartsButton'
import PartsButtonWrap from '../../parts/PartsButtonWrap'

// 型
import { TypeMemoItem } from '../../../type/TypeMemoItem'

type Props = {
  memoData: TypeMemoItem[]
  editMemoItem: TypeMemoItem
  setEditMemoItem: React.Dispatch<React.SetStateAction<TypeMemoItem>>
  editType: '' | 'add' | 'update'
  cancelMemoEdit: () => void
  completeMemoAdd: () => void
  completeMemoUpdate: () => void
  openRemoveConfirm: () => void
}

const MemoEditor: React.FC<Props> = (props) => {

  const updateEditMemoItemName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setEditMemoItem((prevState) => {
      return {
        ...prevState,
        memo_name: event.target.value,
      }
    })
  }

  const updateEditMemoItemOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setEditMemoItem((prevState) => {
      return {
        ...prevState,
        memo_order: Number(event.target.value),
      }
    })
  }

  const updateEditMemoItemAccent = () => {
    props.setEditMemoItem((prevState) => {
      return {
        ...prevState,
        memo_accent: prevState.memo_accent === 'off' ? 'on' : 'off',
      }
    })
  }

  // 編集モーダル表示
  const isEditor = useMemo(() => {
    return props.editMemoItem.memo_id === '' ? false : true
  // eslint-disable-next-line
  }, [props.editMemoItem])// props.memoDataに変更があってもuseMemoの更新は不要

  // 新規メモ追加と既存メモ編集で表示出しわけ
  const editorType = useMemo(() => {
    let type = {
      isAdd: false,
      isUpdate: false,
    }
    switch (props.editType) {
      case 'add':
        type.isAdd = true
        type.isUpdate = false
        break
      case 'update':
        type.isAdd = false
        type.isUpdate = true
        break
      default:
        break
    }
    return type
  }, [props.editType])

  if (!isEditor) return null
  return (
    <StyledDiv>
      <div className="editorInner">
        <p className="editorTitle">
          {editorType.isAdd ? '新規メモ' : null}
          {editorType.isUpdate ? 'メモ編集' : null}
        </p>

        <dl>
          <dt>メモ</dt>
          <dd>
            <textarea
              value={props.editMemoItem.memo_name}
              onChange={(e) => {updateEditMemoItemName(e)}}
              ></textarea>
          </dd>
        </dl>

        <dl className="flex">
          <dt>順番</dt>
          <dd>
            <select
              value={props.editMemoItem.memo_order}
              onChange={(e) => {updateEditMemoItemOrder(e)}}
            >
              {
                (() => {
                  // 新規追加'add'の場合は、既存のメモ数＋1をメモ総数として順番を決める。
                  const memoDataLength = props.editType === 'add' ? props.memoData.length + 1 : props.memoData.length
                  const elem: JSX.Element[] = []
                  for (let i = 0; i < memoDataLength; i++) {
                    elem.push(
                      <option
                        value={i}
                        key={i}
                      >
                        {i + 1}
                      </option>
                    )
                  }
                  return elem
                })()
              }
            </select>
          </dd>
        </dl>

        <dl className="flex">
          <dt>強調</dt>
          <dd>
            <button
              className="switchButton"
              data-memo_accent={props.editMemoItem.memo_accent}
              onClick={updateEditMemoItemAccent}
            ></button>
          </dd>
        </dl>

        <PartsButtonWrap>
          <PartsButton
            onClick={props.cancelMemoEdit}
            text="キャンセル"
          />
          {editorType.isAdd ?
            <PartsButton
              onClick={props.completeMemoAdd}
              text="メモを登録"
            />
          : null}
          {editorType.isUpdate ?
            <PartsButton
              onClick={props.completeMemoUpdate}
              text="メモを更新"
            />
          : null}
        </PartsButtonWrap>

        {editorType.isUpdate ?
          <button
            className="removeButton"
            onClick={props.openRemoveConfirm}
          >
            メモ<br />削除
          </button>
        : null}

      </div>
    </StyledDiv>
  )
}

export default MemoEditor

const StyledDiv = styled.div`
  z-index: var(--root-z-index-MemoEditor);
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  max-width: var(--root-content-width);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.8);
  transition: opacity 0.3s;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
  .editorInner {
    position: relative;
    padding: 1em;
    width: 80%;
    background-color: var(--root-bg-color-main);
    .editorTitle {
      font-size: 1.1em;
      text-align: center;
      font-weight: bold;
    }
    dl {
      margin-top: 1em;
      &.flex {
        display: flex;
        align-items: center;
        & > dd {
          margin: 0 0 0 0.6em;
        }
      }
      & > dt {
        color: var(--root-font-color-sub);
        font-size: 0.8em;
      }
      & > dd {
        margin: 0.4em 0 0 0;
        textarea,
        select {
          background-color: var(--root-bg-color-dark);
          border: 1px solid var(--root-bdr-color-main);
          &:focus-visible {
            border: 1px solid var(--root-bdr-color-accent);
          }
        }
        textarea {
          resize: none;
          padding: 0.4em;
          width: 100%;
          height: 5em;
          word-break: break-all;
        }
        select {
          padding: 0.4em;
        }
      }
    }
    .switchButton {
      position: relative;
      display: block;
      width: 2em;
      height: 1em;
      background-color: var(--root-bg-color-dark);
      border-radius: 2em;
      font-size: 1.4em;
      &::before {
        content: "";
        position: absolute;
        left: 0.1em;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 0.8em;
        height: 0.8em;
        background-color: var(--root-bg-color-light);
        border-radius: 50%;
        transition: left 0.3s, background-color 0.3s;
      }
      &[data-memo_accent=on] {
        &::before {
          left: calc(100% - 0.9em);
          background-color: var(--root-bg-color-accent);
        }
      }
    }
    .partsButtonWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5em;
      text-align: center;
    }
    .removeButton {
      position: absolute;
      right: 1em;
      top: 1em;
      padding: 0.4em;
      background-color: var(--root-bg-color-attention);
      border: 2px solid var(--root-bdr-color-main);
      border-radius: 0.8em;
      color: var(--root-bg-color-dark);
      font-size: 0.6em;
      line-height: 1.2;
    }
  }
`
