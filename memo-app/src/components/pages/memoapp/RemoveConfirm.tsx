import React from 'react'
import styled from 'styled-components'

// コンポーネント
import PartsButton from '../../parts/PartsButton'
import PartsButtonWrap from '../../parts/PartsButtonWrap'

type Props = {
  removeConfirmFlag: boolean
  setRemoveConfirmFlag: React.Dispatch<React.SetStateAction<boolean>>
  closeRemoveConfirm: (flag: boolean) => void
}

const Compornent: React.FC<Props> = React.memo((props) => {
  if (!props.removeConfirmFlag) return null
  return (
    <RemoveConfirm>
      <div className="confirmInner">
        <p>削除すると元に戻せません。<br />削除しても良いですか？</p>
        <PartsButtonWrap>
          <PartsButton
            onClick={() => {props.closeRemoveConfirm(true)}}
            text="OK"
          />
          <PartsButton
            onClick={() => {props.closeRemoveConfirm(false)}}
            text="キャンセル"
          />
        </PartsButtonWrap>
      </div>
    </RemoveConfirm>
  )
})

export default Compornent

const RemoveConfirm = styled.div`
  z-index: var(--root-z-index-Loading);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.8);
  .confirmInner {
    position: relative;
    padding: 1em 1.5em;
    width: 80%;
    background-color: var(--root-bg-color-main);
    line-height: 1.6;
    .partsButtonWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5em;
      text-align: center;
    }
  }
`
