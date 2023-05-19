import generateAmazonImageUrl from './generateAmazonImageUrl'
import isImageExistenceAsync from './isImageExistenceAsync'

const generateImageData = async (
  isbn13or10: string,
  imageType: 't' | 's' | 'm' | 'l',
) => {
  const genImgUrl = generateAmazonImageUrl(isbn13or10, imageType)
  const noImgUrl =
    'https://placehold.jp/120/aaaaaa/ffffff/500x720.jpg?text=No%0AImage'
  const isImgExistence = await isImageExistenceAsync(genImgUrl)
  const imgUrl = isImgExistence ? genImgUrl : noImgUrl
  return {
    url: imgUrl,
    flag: isImgExistence,
  }
}

export default generateImageData
