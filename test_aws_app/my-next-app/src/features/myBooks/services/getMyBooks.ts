import * as Types from '../types'

const getMyBooks = async (
  userId: number,
): Promise<Types.MyBookData[] | Types.FetchError> => {
  const res = await fetch(`/api/v0.2/myBooks/book/${userId}`)
  const data = res.json()
  return data
}

export default getMyBooks
