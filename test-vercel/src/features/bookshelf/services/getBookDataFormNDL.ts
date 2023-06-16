import type { NdlBookData } from '@/features/bookshelf/types'

const getBookData = async (isbn: string): Promise<NdlBookData | Error> => {
  const res = await fetch(`/api/nationalDietLibrary/${isbn}`, {
    method: 'GET',
  })

  if (!res.ok) {
    return new Error('本のデータを取得できませんでした。')
  }
  const data = await res.json()

  return data
}

export default getBookData
