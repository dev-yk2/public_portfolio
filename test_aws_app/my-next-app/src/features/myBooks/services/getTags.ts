import * as Types from '../types'

const getTags = async (
  userId: number,
): Promise<Types.Tag[] | Types.FetchError> => {
  const res = await fetch(`/api/v0.2/myBooks/tag/${userId}`, {
    method: 'GET',
  })

  if (!res.ok) {
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラーが発生しました。',
    )
    throw error
  }

  return res.json()
}

export default getTags
