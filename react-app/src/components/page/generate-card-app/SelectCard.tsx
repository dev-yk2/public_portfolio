import Styled from 'styled-components'
import React from 'react'

// コンポーネント
import StepTitle from './parts/StepTitle'
import StepButtonWrap from './parts/StepButtonWrap'
import StepButton from './parts/StepButton'

// 型
import { TypeSelectCardSettings, TypeCurrentStep } from './type/type'

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<TypeCurrentStep>>
  selectCardSettings: TypeSelectCardSettings
  selectedCardNumber: number | null
  setSelectedCardNumber: React.Dispatch<React.SetStateAction<number | null>>
  generateCard: () => Promise<string>
}

const SelectCard: React.FC<Props> = (props) => {

  const onClickCardItem = (cardNumber: number) => {
    props.setSelectedCardNumber(cardNumber)
  }

  const goNextStep = () => {
    props.generateCard().then(() => {
      props.setCurrentStep(prevState => {
        return {
          ...prevState,
          selectCard: false,
          inputText: true,
        }
      })
    })
    window.scrollTo(0, 0)
  }

  return (
    <StyledDiv>

      <StepTitle
        text="カードを選んでください"
      />

      <ul className="cardList">
        {props.selectCardSettings.paths.map((path, index) => {
          const isActive = index === props.selectedCardNumber ? 'active' : ''
          return (
            <li
              key={index}
              className={`${isActive}`}
              onClick={() => {onClickCardItem(index)}}
            >
              <img
                src={path}
                width={props.selectCardSettings.width}
                height={props.selectCardSettings.height}
                alt=""
              />
            </li>
          )
        })}
      </ul>

      <StepButtonWrap>
        <StepButton
          classNameList={['arrowRight', `${props.selectedCardNumber === null ? 'disabled' : ''}`]}
          onClick={goNextStep}
          text="テキストを入力する"
        />
      </StepButtonWrap>

    </StyledDiv>
  )
}

export default SelectCard

const StyledDiv = Styled.div`
  .cardList {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 31%;
      opacity: 0.6;
      cursor: pointer;
      transition: opacity 0.3s;
      &:not(:nth-child(3n + 1)) {
        margin-left: 3.5%;
      }
      &:nth-child(n + 4) {
        margin-top: 3.5%;
      }
      &.active {
        opacity: 1;
        box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 1.0);
      }
    }
  }
`
