import * as Types from '../types'

const postTag = async (
  tagName: string,
  userId: number,
): Promise<Types.Tag | Types.FetchError> => {
  const res = await fetch(`/api/v0.2/myBooks/tag/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tagName: tagName,
      // userId: userId,
    }),
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

export default postTag
