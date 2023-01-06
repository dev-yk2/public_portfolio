export type TypeSelectCardSettings = {
  readonly paths: string[]
  readonly width: number
  readonly height: number
}
export type TypeGenerateCardSettings = {
  readonly fontColor: string
  readonly fontWeight: string
  readonly fontSize: string
  readonly fontFamily: string

  readonly text01LengthLimit: number
  readonly text02LengthLimit: number
  readonly text03LengthLimit: number

  readonly text01X: number
  readonly text01Y: number
  readonly text02X: number
  readonly text02Y: number
  readonly text03X: number
  readonly text03Y: number
}
export type TypeCurrentStep = {
  selectCard: boolean
  inputText: boolean
  completeCard: boolean
}
