import Styled from 'styled-components'
import React, { useState, useEffect } from 'react'

// コンポーンネント
import Layout from './layout/Layout'
import SelectCard from './SelectCard'
import InputText from './InputText'
import CompleteCard from './CompleteCard'

// 関数
import { zeroPadding } from '../../functions/utility'

// 型
import { TypeSelectCardSettings, TypeGenerateCardSettings, TypeCurrentStep } from './type/type'

const GenerateCardApp: React.FC = () => {

  // 選択するカードの設定
  const selectCardSettings: TypeSelectCardSettings = {
    paths: [
      '/img/generate-card-app/card_img01.png',
      '/img/generate-card-app/card_img02.png',
      '/img/generate-card-app/card_img03.png',
    ],
    width: 640,
    height: 947,
  }

  // 生成するカードの設定
  const generateCardSettings: TypeGenerateCardSettings = {
    fontColor: 'rgb(0,0,0)',
    fontWeight: 'bold',
    fontSize: '20px',
    fontFamily: '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif',

    text01LengthLimit: 17,
    text02LengthLimit: 25,
    text03LengthLimit: 15,

    text01X: 0.1,
    text01Y: 0.84,
    text02X: 0.1,
    text02Y: 0.885,
    text03X: 0.91,
    text03Y: 0.93,
  }

  const [currentStep, setCurrentStep] = useState<TypeCurrentStep>({
    selectCard: true,
    inputText: false,
    completeCard: false,
  })

  const [selectedCardNumber, setSelectedCardNumber] = useState<number | null>(null)

  const [text01, setText01] = useState<string>('')
  const [text01Error, setText01Error] = useState<boolean>(false)
  const [text02, setText02] = useState<string>('')
  const [text02Error, setText02Error] = useState<boolean>(false)
  const [text03, setText03] = useState<string>('')
  const [text03Error, setText03Error] = useState<boolean>(false)

  const [generateBase64, setGenerateBase64] = useState<string>('')
  const [downloadCardName, setDownloadCardName] = useState<string>('')


  const generateCard = () => {
    return new Promise<string>((resolve, reject) => {
      if (selectedCardNumber === null) return reject('')

      const cvs = document.createElement('canvas') as HTMLCanvasElement
      const ctx = cvs.getContext('2d') as CanvasRenderingContext2D

      const imgObj = new Image()
      imgObj.src = selectCardSettings.paths[selectedCardNumber]

      imgObj.onload = () => {
        cvs.width = imgObj.width
        cvs.height = imgObj.height

        ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height, 0, 0, cvs.width, cvs.height)

        ctx.fillStyle = 'rgba(255, 255, 255, 1.0)'
        ctx.fillRect(imgObj.width * 0.05, imgObj.height * 0.79, imgObj.width * 0.9, imgObj.height * 0.18)

        // テキストを描画 各入力欄共通
        ctx.fillStyle = generateCardSettings.fontColor
        ctx.font = `${generateCardSettings.fontWeight} ${generateCardSettings.fontSize} ${generateCardSettings.fontFamily}`
        ctx.textBaseline = "middle"
        // お相手の名前
        ctx.textAlign = "left"
        ctx.fillText(
          `Dear ${text01}`,
          cvs.width * generateCardSettings.text01X,
          cvs.height * generateCardSettings.text01Y,
          cvs.width
        )
        // メッセージを入力
        ctx.fillText(
          text02,
          cvs.width * generateCardSettings.text02X,
          cvs.height * generateCardSettings.text02Y,
          cvs.width
        )
        // あなたの名前
        ctx.textAlign = "right"
        ctx.fillText(
          `From ${text03}`,
          cvs.width * generateCardSettings.text03X,
          cvs.height * generateCardSettings.text03Y,
          cvs.width
        )

        const base64 = cvs.toDataURL('image/png')
        setGenerateBase64(base64)

        const now = new Date()
        // const Y = String(now.getFullYear())
        const M = zeroPadding(now.getMonth()+1, 2)
        const D = zeroPadding(now.getDate(), 2)
        const h = zeroPadding(now.getHours(), 2)
        const m = zeroPadding(now.getMinutes(), 2)
        const s = zeroPadding(now.getSeconds(), 2)
        setDownloadCardName('card_'+M+D+h+m+s+'.png')
        resolve('')
      }
    })
  }

  const regenerateCard = () => {
    setSelectedCardNumber(null)
    setText01('')
    setText02('')
    setText03('')
    setGenerateBase64('')
    setDownloadCardName('')

    setCurrentStep(prevState => {
      return {
        ...prevState,
        selectCard: true,
        completeCard: false,
      }
    })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    generateCard()
  // eslint-disable-next-line
  }, [text01, text02, text03])

  return (
    <StyledDiv>
      <Layout>

        {currentStep.selectCard ?
          <SelectCard
            selectCardSettings={selectCardSettings}
            setCurrentStep={setCurrentStep}
            selectedCardNumber={selectedCardNumber}
            setSelectedCardNumber={setSelectedCardNumber}
            generateCard={generateCard}
          />
        : null}

        {currentStep.inputText?
          <InputText
            selectCardSettings={selectCardSettings}
            generateCardSettings={generateCardSettings}
            setCurrentStep={setCurrentStep}
            generateBase64={generateBase64}
            text01={text01}
            setText01={setText01}
            text01Error={text01Error}
            setText01Error={setText01Error}
            text02={text02}
            setText02={setText02}
            text02Error={text02Error}
            setText02Error={setText02Error}
            text03={text03}
            setText03={setText03}
            text03Error={text03Error}
            setText03Error={setText03Error}
          />
        : null}

        {currentStep.completeCard?
          <CompleteCard
            selectCardSettings={selectCardSettings}
            setCurrentStep={setCurrentStep}
            generateBase64={generateBase64}
            downloadCardName={downloadCardName}
            regenerateCard={regenerateCard}
          />
        : null}

      </Layout>
    </StyledDiv>
  )
}

export default GenerateCardApp

const StyledDiv = Styled.div``
