import { NextPage, GetServerSideProps } from 'next'
import React, { useCallback, useEffect, useState, useContext } from 'react'

import LayoutSubPage from '@/features/myBooks/components/layout/LayoutSubPage'
import HeadBasic from '@/features/myBooks/components/layout/head/HeadBasic'
import RegisterBook from '@/features/myBooks/components/page/register/RegisterBook'

import { UserContext } from '@/features/myBooks/context/UserContext'
import middlewareAuth from '@/features/myBooks/middleware/middlewareAuth'
import getMyBook from '@/features/myBooks/services/getMyBook'
import getTags from '@/features/myBooks/services/getTags'
import getBookData from '@/features/myBooks/services/nationalDietLibrary/getBookData'
import postMyBook from '@/features/myBooks/services/postMyBook'
import postTag from '@/features/myBooks/services/postTag'

import * as Types from '@/features/myBooks/types'

import * as Utils from '@/features/myBooks/utils'

type Props = {
  userId: number
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const result = await middlewareAuth(context)
  return result
}

const Register: NextPage<Props> = (props) => {
  const { dispatch } = useContext(UserContext)
  useEffect(() => {
    dispatch({
      type: 'login',
      payload: {
        userId: props.userId,
      },
    })
    // eslint-disable-next-line
  }, [props.userId])

  const initialStateNewBook = {
    isbn: '',
    title: '',
    authors: [''],
    publisher: '',
    tags: [],
    memo: '',
  }
  const initialStateBookImgUrl =
    'https://placehold.jp/120/aaaaaa/ffffff/500x720.jpg?text=No%0AImage'

  // 新規本データ
  const [newBook, setNewBook] =
    useState<Types.PreMyBookData>(initialStateNewBook)

  // 新規本画像URL
  const [bookImgUrl, setBookImgUrl] = useState<string>(initialStateBookImgUrl)

  // 全既存タグ
  const [tagListAll, setTagListAll] = useState<Types.TagItem[]>([])

  // 作成する新規タグ
  const [newTag, setNewTag] = useState<string>('')

  // 登録時エラー管理
  const initialStateBookErrorMessage = {
    isbn: null,
    title: null,
    authors: null,
    publisher: null,
    registeredBookUrl: null, // 既に登録済みの本のページURL
  }
  const [bookErrorMessage, setBookErrorMessage] =
    useState<Types.BookErrorMessage>(initialStateBookErrorMessage)

  // 既に登録済みの本のページURL
  // const [registeredBookUrl, setRegisteredBookUrl] = useState<null | string>(null)

  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      // 全タグデータを取得
      const tags = await getTags(props.userId)
      if ('errorMessage' in tags) return
      setTagListAll(() => {
        return tags.map((tag) => {
          return {
            ...tag,
            displayFlag: true,
          }
        })
      })
    })()
    // eslint-disable-next-line
  }, [])

  // isbnコードでマイ本棚、国会図書館、googleブックスなどを検索
  const searchBook = useCallback(async () => {
    // 各種初期化
    setNewBook((prevState) => {
      return {
        ...initialStateNewBook,
        isbn: prevState.isbn,
      }
    })
    setBookImgUrl(initialStateBookImgUrl)
    setBookErrorMessage(initialStateBookErrorMessage)
    setTagListAll((prevState) => {
      return prevState.map((v) => {
        return {
          ...v,
          displayFlag: true,
        }
      })
    })

    // ISBNコード整形
    let isbn = newBook.isbn.replace(/(-|\s|　)/g, '').trim()
    isbn = Utils.zen2Han(isbn)
    if (isbn.length !== 13 || !/^[0-9]+$/.test(isbn)) {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          isbn: 'ISBNコードが無効な値です。',
        }
      })
      return
    }

    // マイ本棚に登録されているか確認する
    const existenceCheck = await getMyBook(props.userId, isbn)
    if (!('errorMessage' in existenceCheck)) {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          isbn: 'この本は本棚に登録されています。',
          registeredBookUrl: `/myBooks/${props.userId}/${isbn}`,
        }
      })
      return
    }

    const bookData = await getBookData(isbn)
    if ('errorMessage' in bookData) {
      // 国会図書館からデータ取得できず
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          isbn: `${bookData.errorMessage}ISBNコードが誤っている可能性があります。`,
        }
      })
      // 処理中断
      return
    }

    setNewBook((prevState) => {
      return {
        ...prevState,
        ...bookData,
      }
    })
    const imgData = await Utils.generateImageData(bookData.isbn, 'l')
    setBookImgUrl(imgData.url)
    // eslint-disable-next-line
  }, [newBook])

  // 新規タグをDBに登録
  const registerNewTag = useCallback(async () => {
    if (newTag === '') return
    const result = await postTag(newTag, props.userId)
    if ('errorMessage' in result) return

    // 編集中本データに新規登録したタグを追加
    setNewBook((prevState) => {
      const tags = [...prevState.tags]
      tags.push({
        id: result.id,
        name: result.name,
        user_id: result.user_id,
      })
      return {
        ...prevState,
        tags: tags,
      }
    })

    // 既存全タグリストに新規登録したタグを追加
    setTagListAll((prevState) => {
      return [
        ...prevState,
        {
          id: result.id,
          name: result.name,
          user_id: props.userId,
          displayFlag: false,
        },
      ]
    })

    // 新規タグ入力欄を空にする
    setNewTag('')
    // eslint-disable-next-line
  }, [newTag])

  // 新規本登録
  const registerNewBook = useCallback(async () => {
    // 登録本データバリデーション
    setBookErrorMessage(initialStateBookErrorMessage)
    let errorFlag = false
    // ISBNバリデーション
    setNewBook((prevState) => {
      // ISBNコード整形
      let isbn = prevState.isbn.replace(/(-|\s|　)/g, '').trim()
      isbn = Utils.zen2Han(isbn)
      if (isbn.length !== 13 || !/^[0-9]+$/.test(isbn)) {
        errorFlag = true
        setBookErrorMessage((prevState) => {
          return {
            ...prevState,
            isbn: 'ISBNコードが無効な値です。',
          }
        })
      }

      return {
        ...prevState,
        isbn: isbn,
      }
    })
    // タイトルバリデーション
    if (newBook.title === '') {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          title: 'タイトルが入力されていません。',
        }
      })
      errorFlag = true
    }
    // 著者バリデーション
    const authorBlankCheck: boolean[] = []
    newBook.authors.forEach((author) => {
      if (author === '') {
        authorBlankCheck.push(true)
      } else {
        authorBlankCheck.push(false)
      }
    })
    const authorsFlag = authorBlankCheck.includes(false)
    if (newBook.authors.length === 0 || !authorsFlag) {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          authors: '著者が入力されていません。',
        }
      })
      errorFlag = true
    }
    // 出版社バリデーション
    if (newBook.publisher === '') {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          publisher: 'タイトルが入力されていません。',
        }
      })
      errorFlag = true
    }
    if (errorFlag) return

    const result = await postMyBook(newBook, props.userId)
    if ('errorMessage' in result) {
      window.alert(result.errorMessage)
    } else {
      window.alert(`『${result.title}』\nを登録しました。`)
    }

    setNewBook(initialStateNewBook)
    setBookImgUrl(initialStateBookImgUrl)
    // eslint-disable-next-line
  }, [newBook])

  return (
    <LayoutSubPage pageTitle="新規登録">
      <HeadBasic
        title="本新規登録ページ | 本管理アプリ"
        pagePath={`/myBooks/${props.userId}/register`}
      />

      <RegisterBook
        newBook={newBook}
        setNewBook={setNewBook}
        bookImgUrl={bookImgUrl}
        tagListAll={tagListAll}
        setTagListAll={setTagListAll}
        newTag={newTag}
        setNewTag={setNewTag}
        registerNewTag={registerNewTag}
        searchBook={searchBook}
        registerNewBook={registerNewBook}
        bookErrorMessage={bookErrorMessage}
        setBookErrorMessage={setBookErrorMessage}
      />
    </LayoutSubPage>
  )
}

export default Register
