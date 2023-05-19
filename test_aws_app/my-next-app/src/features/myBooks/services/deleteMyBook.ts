import * as Types from '../types'

const deleteMyBook = async (
  myBookData: Types.MyBookData,
  userId: number,
): Promise<{ title: string } | Types.FetchError> => {
  // console.log(myBookData)
  const res = await fetch(
    `/api/v0.2/myBooks/book/${userId}/${myBookData.isbn}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // userId,
        myBookData,
      }),
    },
  )

  if (!res.ok) {
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラーが発生しました。',
    )
    throw error
  }

  return res.json()
}

export default deleteMyBook
