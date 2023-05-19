import * as Types from '../types'

const postMyBook = async (
  myBookData: Types.PreMyBookData,
  userId: number,
): Promise<Types.MyBookData> => {
  const res = await fetch(
    `/api/v0.2/myBooks/book/${userId}/${myBookData.isbn}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        myBookData,
        userId,
      }),
    },
  )

  // if (!res.ok) {
  //   const errorRes = await res.json()
  //   const error = new Error(
  //     errorRes.message ?? 'APIリクエスト中にエラーが発生しました。'
  //   )
  //   throw error
  // }
  // console.log(res)
  return res.json()
}

export default postMyBook
