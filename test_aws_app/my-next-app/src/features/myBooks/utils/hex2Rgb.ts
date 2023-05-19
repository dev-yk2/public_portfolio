/**
 * ### 16進数のカラーコードをRGBに変換
 * @param hex 16進数のカラーコード
 * @returns '255,255,34'
 */
const hex2Rgb = (hex: string) => {
  const hexArr = hex.toLowerCase().replace(/^#/, '').split('')
  const numberHexArr = hexArr.map((v) => {
    return v === 'a'
      ? 10
      : v === 'b'
      ? 11
      : v === 'c'
      ? 12
      : v === 'd'
      ? 13
      : v === 'e'
      ? 14
      : v === 'f'
      ? 15
      : Number(v)
  })
  const r = numberHexArr[0] * 16 + numberHexArr[1]
  const g = numberHexArr[2] * 16 + numberHexArr[3]
  const b = numberHexArr[4] * 16 + numberHexArr[5]
  return `${r},${g},${b}`
}

export default hex2Rgb
