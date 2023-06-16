// ndlから取得した本データ
export type NdlBookData = {
  isbn: string
  title: string
  authors: string[]
  publisher: string
}

// 基本的な本データ（登録後）
export type Book = {
  id: string
  isbn: string
  title: string
  authors: string[]
  publisher: string
  tags: {
    id: string
    name: string
    userId: string
  }[]
  memo: string
  userId: string
}

// リスト表示用の本データ
// books: Array<{
//   __typename?: 'Book'
//   id: string
//   isbn: string
//   title: string
//   authors: Array<string>
//   publisher: string
//   memo: string
//   createdAt: Date
//   updatedAt: Date
//   userId: string
//   tags: Array<{ __typename?: 'Tag'; id: string; name: string; userId: string } | null>
// } | null>
export type BookItem = Book & {
  imageUrl: string
  imageFlag: boolean
  isDisplay: boolean
}

// 新規本登録時の本データ
export type EditBook = {
  isbn: string
  title: string
  authors: string[]
  publisher: string
  tags: {
    id: string
    name: string
    userId: string
  }[]
  memo: string
}

export type TagItem = {
  id: string
  name: string
  userId: string
  isDisplay: boolean
}

export type BookErrorMessage = {
  isbn: string | null
  title: string | null
  authors: string | null
  publisher: string | null
  registeredBookUrl: string | null
}
