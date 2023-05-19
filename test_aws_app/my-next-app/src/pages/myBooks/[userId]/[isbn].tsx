// import { ParsedUrlQuery } from 'querystring'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useContext } from 'react'

import ContainerStyled from '@/features/myBooks/components/layout/Container.styled'
import ContainerInnerStyled from '@/features/myBooks/components/layout/ContainerInner.styled'
import Footer from '@/features/myBooks/components/layout/footer/Footer'
import HeadBasic from '@/features/myBooks/components/layout/head/HeadBasic'
import HeaderSubPage from '@/features/myBooks/components/layout/header/HeaderSubPage'
import BookDetail from '@/features/myBooks/components/page/isbn/BookDetail'
import styles from '@/features/myBooks/const/styles'

import { UserContext } from '@/features/myBooks/context/UserContext'

import middlewareAuth from '@/features/myBooks/middleware/middlewareAuth'
import deleteMyBook from '@/features/myBooks/services/deleteMyBook'
import getMyBook from '@/features/myBooks/services/getMyBook'
import getTags from '@/features/myBooks/services/getTags'
import postTag from '@/features/myBooks/services/postTag'
import putMyBook from '@/features/myBooks/services/putMyBook'

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

const Isbn: NextPage<Props> = (props) => {
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

  const router = useRouter()
  const isbn = router.query.isbn as string

  // 本データ
  const [bookItem, setBookItem] = useState<Types.BookItem>({
    id: NaN,
    isbn: '',
    title: '',
    authors: [],
    publisher: '',
    tags: [],
    memo: '',
    user_id: NaN,
    imageUrl: '',
    imageFlag: false,
    displayFlag: false,
  })

  // 編集モード（true）と閲覧モード（false）との切り替え
  const [editMode, setEditMode] = useState<boolean>(false)

  // 編集した本データ
  const [editedBookData, setEditedBookData] = useState<Types.MyBookData>()

  // 全既存タグ
  const [tagListAll, setTagListAll] = useState<Types.TagItem[]>([])

  // 作成する新規タグ
  const [newTag, setNewTag] = useState<string>('')

  // 新規タグをDBに登録
  const registerNewTag = useCallback(async () => {
    if (newTag === '') return
    const result = await postTag(newTag, props.userId)
    if ('errorMessage' in result) {
      return
    }

    // 編集中本データに新規登録したタグを追加
    setEditedBookData((prevState) => {
      if (!prevState) return
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
          user_id: result.user_id,
          displayFlag: false,
        },
      ]
    })

    // 新規タグ入力欄を空にする
    setNewTag('')
    // eslint-disable-next-line
  }, [newTag])

  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      const book = await getMyBook(props.userId, isbn)
      if ('errorMessage' in book) return

      // 画像URLなどの情報を本データに追加
      const imgData = await Utils.generateImageData(book.isbn, 'l')
      setBookItem(() => {
        return {
          ...book,
          imageUrl: imgData.url,
          imageFlag: imgData.flag,
          displayFlag: true,
        }
      })

      // 編集本データの初期値
      // ここで値を入れておかないと型ガードがめんどくさい
      setEditedBookData(() => {
        return book
      })

      // 全タグデータを取得
      const tags = await getTags(props.userId)
      if ('errorMessage' in tags) return
      const tagIdsInBook = book.tags.map((v) => v.id)
      setTagListAll(() => {
        return tags.map((tag) => {
          const isInclude = tagIdsInBook.includes(tag.id)
          return {
            ...tag,
            displayFlag: !isInclude, // どっちをfalseにするのか
          }
        })
      })
    })()
    // eslint-disable-next-line
  }, [])

  // 本データを更新
  const updateBookData = useCallback(async () => {
    if (!editedBookData) return

    // 空欄の著者を削除
    const _editedBookData = { ...editedBookData }
    const _authors = _editedBookData.authors.filter((author) => author !== '')
    _editedBookData.authors = _authors
    const res = await putMyBook(_editedBookData, props.userId)

    setBookItem((prevState) => {
      return {
        ...prevState,
        ...res,
      }
    })
    setEditMode(false)

    // // 編集本データの初期値
    // // ここで値を入れておかないと型ガードがめんどくさい
    setEditedBookData(() => res)
    // eslint-disable-next-line
  }, [editedBookData])

  // 本データを削除
  const deleteBookData = useCallback(async () => {
    if (!editedBookData) return
    const res = await deleteMyBook(editedBookData, props.userId)
    if ('errorMessage' in res) {
      console.log(res.errorMessage)
      return
    }
    window.alert(`『${res.title}』を削除しました。`)
    router.replace(`/myBooks/${props.userId}`)
    // eslint-disable-next-line
  }, [editedBookData])

  if (!bookItem || !editedBookData) return null
  return (
    <ContainerStyled
      styles={{
        height: '100%',
      }}
    >
      <HeadBasic
        title="本詳細ページ | 本管理アプリ"
        pagePath={`/myBooks/${props.userId}/${bookItem.isbn}`}
      />

      <ContainerStyled
        styles={{
          height: styles['--height-menu-isbn'],
          'background-color': styles['--color-background-sub'],
          'border-bottom': `1px solid ${styles['--color-border-default']}`,
        }}
      >
        <ContainerInnerStyled
          styles={{
            height: '100%',
          }}
        >
          <HeaderSubPage pageTitle="本の詳細" />
        </ContainerInnerStyled>
      </ContainerStyled>

      <ContainerStyled
        styles={{
          overflow: 'auto',
          height: `calc(100% - ${styles['--height-menu-isbn']} - ${styles['--height-footer-default']})`,
        }}
      >
        <ContainerInnerStyled>
          <BookDetail
            bookItem={bookItem}
            editMode={editMode}
            setEditMode={setEditMode}
            editedBookData={editedBookData}
            setEditedBookData={setEditedBookData}
            tagListAll={tagListAll}
            setTagListAll={setTagListAll}
            newTag={newTag}
            setNewTag={setNewTag}
            registerNewTag={registerNewTag}
            updateBookData={updateBookData}
            deleteBookData={deleteBookData}
          />
        </ContainerInnerStyled>
      </ContainerStyled>

      <ContainerStyled
        styles={{
          height: `${styles['--height-footer-default']}`,
          'background-color': styles['--color-background-sub'],
          'border-top': `1px solid ${styles['--color-border-default']}`,
        }}
      >
        <ContainerInnerStyled
          styles={{
            height: '100%',
          }}
        >
          <Footer />
        </ContainerInnerStyled>
      </ContainerStyled>
    </ContainerStyled>
  )
}

export default Isbn
