import * as Types from '../../types'

const getBookData = async (
  isbn: Types.BookIsbn,
): Promise<Types.NdlBookData | Types.FetchError> => {
  const res = await fetch(`/api/v0.2/nationalDietLibrary/book/${isbn}`, {
    method: 'GET',
  })
  return res.json()
}

export default getBookData
