import * as Types from '../types'

const getMyBook = async (
  userId: number,
  isbn: string,
): Promise<Types.MyBookData | Types.FetchError> => {
  // console.log(`${userId}/${isbn}`)
  const res = await fetch(`/api/v0.2/myBooks/book/${userId}/${isbn}`)
  const data = res.json()
  return data
}

export default getMyBook
