import * as Types from '../types'

const deleteTag = async (
  tagId: number,
  userId: number,
): Promise<Types.Tag | Types.FetchError> => {
  // console.log('[tagId]', tagId)
  const res = await fetch(`/api/v0.2/myBooks/tag/${userId}/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // if (!res.ok) {
  //   const errorRes = await res.json()
  //   console.log('[errorRes]', errorRes)
  //   const error = new Error(
  //     errorRes.message ?? 'APIリクエスト中にエラーが発生しました。'
  //   )
  //   console.log('[error]', error)
  //   throw error
  // }

  // const test = await res.json()
  // console.log('[test]', test)

  return res.json()
}

export default deleteTag
