/**
 *
 * @param imgUrl Amazonの画像url
 * @returns 画像が存在していればtrue、なければfalse
 */
const isImageExistenceAsync = (imgUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
      const result = img.width === 1 ? false : true
      return resolve(result)
    }
  })
}

export default isImageExistenceAsync
