import Styled from 'styled-components'
import React from 'react'

// コンポーネント
import StepTitle from './parts/StepTitle'
import StepButtonWrap from './parts/StepButtonWrap'
import StepButton from './parts/StepButton'

// 型
import { TypeSelectCardSettings, TypeGenerateCardSettings, TypeCurrentStep } from './type/type'

type Props = {
  selectCardSettings: TypeSelectCardSettings
  generateCardSettings: TypeGenerateCardSettings
  setCurrentStep: React.Dispatch<React.SetStateAction<TypeCurrentStep>>
  generateBase64: string

  text01: string
  setText01: React.Dispatch<React.SetStateAction<string>>
  text01Error: boolean
  setText01Error: React.Dispatch<React.SetStateAction<boolean>>
  text02: string
  setText02: React.Dispatch<React.SetStateAction<string>>
  text02Error: boolean
  setText02Error: React.Dispatch<React.SetStateAction<boolean>>
  text03: string
  setText03: React.Dispatch<React.SetStateAction<string>>
  text03Error: boolean
  setText03Error: React.Dispatch<React.SetStateAction<boolean>>
}

const InputText: React.FC<Props> = (props) => {

  const updateText = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    stringLengthLimit: number
  ) => {
    let text = event.target.value
    text = text.substring(0, stringLengthLimit)
    setState(text)
  }

  let errorFlag = false
  const goNextStep = () => {
    if (props.text01 === '') {
      props.setText01Error(true)
      errorFlag = true
    } else {
      props.setText01Error(false)
    }
    if (props.text02 === '') {
      props.setText02Error(true)
      errorFlag = true
    } else {
      props.setText02Error(false)
    }
    if (props.text03 === '') {
      props.setText03Error(true)
      errorFlag = true
    } else {
      props.setText03Error(false)
    }
    if (errorFlag) return

    props.setCurrentStep(prevState => {
      return {
        ...prevState,
        inputText: false,
        completeCard: true,
      }
    })
    window.scrollTo(0, 0)
  }

  const goPrevStep = () => {
    props.setText01Error(false)
    props.setText02Error(false)
    props.setText03Error(false)

    props.setCurrentStep(prevState => {
      return {
        ...prevState,
        selectCard: true,
        inputText: false,
      }
    })
    window.scrollTo(0, 0)
  }

  return (
    <StyledDiv>

      <StepTitle
        text="テキストを入力してください"
      />

      <div className="flexBox">

        <div className="flexItem _s">
          <img
            src={props.generateBase64}
            width={props.selectCardSettings.width}
            height={props.selectCardSettings.height}
            alt=""
          />
        </div>

        <div className="flexItem _l">
          <dl>
            <dt>お相手の名前（必須）</dt>
            <dd>
              <input
                className={`${props.text01Error ? 'error' : null}`}
                type="text"
                value={props.text01}
                onChange={(e) => {updateText(e, props.setText01, props.generateCardSettings.text01LengthLimit)}}
              />
              {props.text01Error ?
                <p className="errorText">「お相手の名前」を入力してくだい。</p>
              : null}
            </dd>
          </dl>
          <dl>
            <dt>メッセージを入力（必須）</dt>
            <dd>
              <input
                className={`${props.text02Error ? 'error' : null}`}
                type="text"
                value={props.text02}
                onChange={(e) => {updateText(e, props.setText02, props.generateCardSettings.text02LengthLimit)}}
              />
              {props.text02Error ?
                <p className="errorText">「メッセージ」を入力してくだい。</p>
              : null}
            </dd>
          </dl>
          <dl>
            <dt>あなたの名前（必須）</dt>
            <dd>
              <input
                className={`${props.text03Error ? 'error' : null}`}
                type="text"
                value={props.text03}
                onChange={(e) => {updateText(e, props.setText03, props.generateCardSettings.text03LengthLimit)}}
              />
              {props.text03Error ?
                <p className="errorText">「あなたの名前」を入力してくだい。</p>
              : null}
            </dd>
          </dl>
        </div>

      </div>

      <StepButtonWrap>
        <StepButton
          classNameList={['arrowLeft']}
          onClick={goPrevStep}
          text="カード選択に戻る"
        />
        <StepButton
          classNameList={['arrowRight']}
          onClick={goNextStep}
          text="カードを作成する"
        />
      </StepButtonWrap>
    </StyledDiv>
  )
}

export default InputText

const StyledDiv = Styled.div`
  .flexBox {
    display: flex;
    justify-content: center;
    .flexItem {
      position: relative;
      width: 47%;
      &:not(:first-child) {
        margin-left: 6%;
      }
      &._s {
        width: 40%;
      }
      &._l {
        width: 54%;
      }
    }
  }
  dl {
    & + dl {
      margin-top: 1.8em;
    }
    & > dt {}
    & > dd {
      margin-top: 0.6em;
      input {
        padding: 0.8em;
        width: 100%;
        background-color: #111;
        border: 1px solid #fff;
        &.error {
          border: 1px solid #f00;
        }
      }
      .errorText {
        margin-top: 0.5em;
        color: #f00;
        font-size: 0.9em;
      }
    }
  }
`
