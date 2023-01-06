import Styled from 'styled-components'
import React from 'react'

// コンポーネント
import StepTitle from './parts/StepTitle'
import StepButtonWrap from './parts/StepButtonWrap'
import StepButton from './parts/StepButton'

// 型
import { TypeSelectCardSettings, TypeCurrentStep } from './type/type'

type Props = {
  selectCardSettings: TypeSelectCardSettings
  setCurrentStep: React.Dispatch<React.SetStateAction<TypeCurrentStep>>
  generateBase64: string
  downloadCardName: string
  regenerateCard: () => void
}

const CompleteCard: React.FC<Props> = (props) => {
  return (
    <StyledDiv>

      <StepTitle
        text="カードが完成しました"
      />

      <div className="flexBox">
        <div className="flexItem">
          <img
            src={props.generateBase64}
            width={props.selectCardSettings.width}
            height={props.selectCardSettings.height}
            alt=""
          />
        </div>
      </div>

      <StepButtonWrap>
        <a
          className="downloadButton"
          href={props.generateBase64}
          download={props.downloadCardName}
        >
          ダウンロード
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="198.182" viewBox="0 0 200 198.182">
            <path d="M81.457,0V74.5H49.223L100,152.022,150.769,74.5H118.536V0ZM11.124,163.146A11.1,11.1,0,0,0,0,174.269v12.789a11.1,11.1,0,0,0,11.124,11.124H188.876A11.1,11.1,0,0,0,200,187.059V174.269a11.1,11.1,0,0,0-11.124-11.124Z"/>
          </svg>
        </a>
      </StepButtonWrap>
      <StepButtonWrap>
        <StepButton
          classNameList={['arrowRight']}
          onClick={props.regenerateCard}
          text="もっとカードを作る"
        />
      </StepButtonWrap>

    </StyledDiv>
  )
}

export default CompleteCard

const StyledDiv = Styled.div`
  .flexBox {
    display: flex;
    justify-content: center;
    .flexItem {
      position: relative;
      width: 47%;
    }
  }
  .downloadButton {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.6em;
    padding: 0.8em 2.4em;
    border: 1px solid #fff;
    border-radius: 2em;
    svg {
      fill: var(--root-font-color-main);
      display: block;
      margin-left: 0.4em;
      width: 1em;
      height: 1em;
    }
  }
`
