import React, { useRef } from 'react'
import styled from 'styled-components'

// 型　
import { TypeMemoItem } from './type/type'

type Props = {
  memoItem: TypeMemoItem
  openMemoEditor: (type: 'update', refMemoItem: React.RefObject<HTMLDivElement>) => void
}

const MemoItem: React.FC<Props> = (props) => {
  const refMemoItem = useRef<HTMLDivElement>(null)
  return (
    <StyledDiv
      className="memo_item"
      data-memo_id={props.memoItem.memo_id}
      data-memo_name={props.memoItem.memo_name}
      data-memo_order={props.memoItem.memo_order}
      data-memo_accent={props.memoItem.memo_accent}
      ref={refMemoItem}
    >
      <span className="memoOrder">
        {props.memoItem.memo_order + 1}
      </span>
      <p className="memoName">
        {props.memoItem.memo_name}
      </p>
      <div
        className="memoMenu"
        onClick={() => {props.openMemoEditor('update', refMemoItem)}}
      >
        <span></span>
      </div>
    </StyledDiv>
  )
}

export default MemoItem

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4em;
  padding: 0.4em 1em 0.4em 0.4em;
  background-color: var(--root-bg-color-dark);
  border: 1px solid var(--root-bdr-color-main);
  border-radius: 2em;
  &[data-memo_accent=on] {
    color: var(--root-font-color-accent);
  }
  .memoOrder {
    display: block;
    padding: 0.4em 0.6em;
    border-radius: 50%;
    color: var(--root-font-color-sub);
    font-size: 0.6em;
    line-height: 1;
    font-weight: bold;
  }
  .memoName {
    flex: 1;
    margin: 0 0.8em 0 0.4em;
    word-break: break-all;
  }
  .memoMenu {
    position: relative;
    width: 0.8em;
    height: 0.8em;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
    }
    &::before,
    &::after,
    span {
      position: absolute;
      left: 0%;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--root-font-color-sub);
    }
    &::before {
      top: 0%;
    }
    &::after {
      top: 100%;
    }
  }
`
