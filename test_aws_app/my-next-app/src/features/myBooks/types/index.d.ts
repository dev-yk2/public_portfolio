/**
 * fetch時のエラーメッセージ
 * errorCode
 * 1 --- apiに問題はない。登録しようとしたデータが既に存在しているなど。正常なエラー。
 * 2 --  prismaでのエラー
 * 3 --  firebaseでのエラー
 */
export type FetchError = {
  errorCode: number
  errorMessage: string
}

/**
 * prismaでのデータベース処理
 * 該当のデータがない時 --- {code: 'P2025', clientVersion: '4.11.0', name: 'NotFoundError'}
 */
export type PrismaError = {
  code: string
  clientVersion: string
  name: string
}

/**
 * ユーザー
 */
export type User = {
  id: number
  email: string
}

/**
 * 各要素
 * ID、ISBN、タイトル、著者、出版社、タグ、メモ
 */
export type BookId = number
export type BookIsbn = string
export type BookTitle = string
export type BookAuther = string
export type BookPublisher = string
export type BookMemo = string

export type TagId = number
export type TagName = string

/**
 * タグ
 */
export type PreTag = {
  id: TagId
  name: TagName
}
export type Tag = PreTag & {
  user_id: number
}
export type TagItem = Tag & {
  displayFlag: boolean
}
export type TagEditable = TagItem & {
  editMode: boolean
}

/**
 * 国立国会図書館から取得する本のデータ
 */
export type NdlBookData = {
  isbn: BookIsbn
  title: BookTitle
  authors: BookAuther[]
  publisher: BookPublisher
}

/**
 * 登録前の本データ
 */
export type PreMyBookData = NdlBookData & {
  // id?: BookId// 登録時はundefined
  memo: BookMemo // 備考
  tags: Tag[]
}
/**
 * マイ本棚の本データ
 */
export type MyBookData = PreMyBookData & {
  id: BookId
  user_id: number
}

/**
 * 本一覧で使用するデータ
 * 表示非表示フラグと画像ありなしフラグを持っている
 */
export type BookItem = MyBookData & {
  imageUrl: string
  imageFlag: boolean
  displayFlag: boolean
}

export type BookErrorMessage = {
  isbn: null | string
  title: null | string
  authors: null | string
  publisher: null | string
  registeredBookUrl: null | string
}

/**
 * タグと本の紐付け
 */
// export type tagRelationship = {
//   book_id: number
//   tag_id: number
// }

// insert into Book (isbn, title, creator,publisher, tags, memo) values ('9784757709485', '釣れんボーイ', 'いましろたかし', 'エンターブレイン', '漫画,文庫', '一家に一冊。')
