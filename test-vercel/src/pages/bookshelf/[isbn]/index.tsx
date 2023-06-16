import { useGetBookQuery, useGetTagsQuery } from '@/__generated__/graphql'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { BookAuthorsContainer } from '@/features/bookshelf/components/BookAuthorsContainer'
import { BookMemoContainer } from '@/features/bookshelf/components/BookMemoContainer'
import { BookPublisherContainer } from '@/features/bookshelf/components/BookPublisherContainer'
import { BookTagsContainer } from '@/features/bookshelf/components/BookTagsContainer'
import { BookTitleContainer } from '@/features/bookshelf/components/BookTitleContainer'
import { ButtonBasic } from '@/features/bookshelf/components/ButtonBasic'
import { ImageBasic } from '@/features/bookshelf/components/ImageBasic'
import { InputBookAuthorsContainer } from '@/features/bookshelf/components/InputBookAuthorsContainer'
import { InputBookMemoContainer } from '@/features/bookshelf/components/InputBookMemoContainer'
import { InputBookPublisherContainer } from '@/features/bookshelf/components/InputBookPublisherContainer'
import { InputBookTagsContainer } from '@/features/bookshelf/components/InputBookTagsContainer'
import { InputBookTitleContainer } from '@/features/bookshelf/components/InputBookTitleContainer'
import { NaviBookshelf } from '@/features/bookshelf/components/NaviBookshelf'
import { useBook } from '@/features/bookshelf/hooks/useBook'
import { useTag } from '@/features/bookshelf/hooks/useTag'
import { Book, BookErrorMessage, TagItem } from '@/features/bookshelf/types'
import { generateImageData, zen2Han } from '@/features/bookshelf/utils'
import { HeadCommon } from '@/features/root/components/HeadCommon'
import { Layout } from '@/features/root/components/Layout'
import { useLoadingContext } from '@/features/root/context/LoadingContext'
import useConfirm from '@/features/root/hooks/useConfirm'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Isbn: NextPage = () => {
  const router = useRouter()
  const isbn = router.query.isbn as string

  const { user } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { confirmAsync } = useConfirm()
  // useEffect(() => {
  //   if (user === null) {
  //     router.replace('/login')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  /**
   * 本データ
   */
  const initialBookState = {
    id: '',
    isbn: '',
    title: '',
    authors: [''],
    publisher: '',
    tags: [],
    memo: '',
    userId: '',
  }
  const [book, setBook] = useState<Book>(initialBookState)
  const {
    data: getBookQueData,
    loading: getBookQueLoading,
    error: getBookQueError,
  } = useGetBookQuery({
    variables: {
      input: {
        isbn,
        userId: user?.uid!,
      },
    },
  })
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      console.log('[getBookQueData?.getBook.book]')
      console.log(getBookQueData?.getBook.book)
      console.log('[getBookQueError]')
      console.log(getBookQueError)
      if (getBookQueData?.getBook.book) {
        setBook(() => {
          return {
            id: getBookQueData?.getBook.book.id!,
            isbn: getBookQueData?.getBook.book.isbn!,
            title: getBookQueData?.getBook.book.title!,
            authors: getBookQueData?.getBook.book.authors!,
            publisher: getBookQueData?.getBook.book.publisher!,
            tags: getBookQueData?.getBook.book.tags.map((tag) => {
              return {
                id: tag?.id!,
                name: tag?.name!,
                userId: tag?.userId!,
              }
            }),
            memo: getBookQueData?.getBook.book.memo!,
            userId: getBookQueData?.getBook.book.userId!,
          }
        })
        const imgData = await generateImageData(isbn, 'l')
        setBookImgUrl(imgData.url)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBookQueData])

  /**
   * 編集本データ
   */
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [editBook, setEditBook] = useState<Book>(initialBookState)

  /**
   * 編集本画像
   */
  // const initialBookImgUrlState = 'https://placehold.jp/120/aaaaaa/ffffff/500x720.jpg?text=No%0AImage'
  const initialBookImgUrlState = null
  const [bookImgUrl, setBookImgUrl] = useState<string | null>(initialBookImgUrlState)

  const { updateBook, deleteBook } = useBook()

  /**
   * 編集本エラーメッセージ
   */
  const initialBookErrorMessageState = {
    isbn: null,
    title: null,
    authors: null,
    publisher: null,
    registeredBookUrl: null, // 既に登録済みの本のページURL
  }
  const [bookErrorMessage, setBookErrorMessage] = useState<BookErrorMessage>(initialBookErrorMessageState)

  /**
   * 既存の全タグ
   */
  const {
    data: getTagsQueData,
    loading: getTagsQueLoading,
    // error: getTagsQueError,
  } = useGetTagsQuery({
    variables: {
      input: {
        userId: user?.uid!,
      },
    },
  })

  const [tagItemList, setTagItemList] = useState<TagItem[]>([])
  useEffect(() => {
    // console.log('[useEffect] > [getTagsQueData?.getTags.tags]', getTagsQueData?.getTags.tags)
    if (getTagsQueData?.getTags.tags) {
      if (isEditMode) {
        /**
         * 編集中に新規タグを追加した場合は、前の状態の表示フラグに準ずる。前の状態が存在しないものは新規追加したタグなのでisDisplayをfalseにする。
         */
        setTagItemList((prevState) => {
          return getTagsQueData?.getTags.tags.map((tag, index) => {
            return {
              id: tag?.id!,
              name: tag?.name!,
              userId: tag?.userId!,
              isDisplay: prevState[index] ? prevState[index].isDisplay : false,
            }
          })
        })
      } else {
        /**
         * ロード時はとりあえず全てisDisplayはtrueにしておく。編集モードを切り替えるときに本が持っているタグと比較して表示フラグを切り替える。
         */
        setTagItemList(() => {
          return getTagsQueData?.getTags.tags.map((tag) => {
            return {
              id: tag?.id!,
              name: tag?.name!,
              userId: tag?.userId!,
              isDisplay: true,
            }
          })
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTagsQueData?.getTags.tags]) // 新規タグ追加時に動作させたくないので空の配列。 → 新規タグ追加時にも動作させないと、graphqlで取得してもuseStateに格納できない。

  /**
   * 新規タグ
   */
  const [newTagName, setNewTagName] = useState<string>('')

  const { createTag } = useTag()

  //////////////////////////////////////////////////
  // 編集モード切り替え
  const handleToggleEditModeBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    // console.log('[編集モード切り替え]')

    setIsEditMode((prevState) => {
      // console.log('[編集モード切り替え] > [setIsEditMode()]')
      setEditBook(book)

      setTagItemList((prevState) => {
        // console.log('[編集モード切り替え] > [setIsEditMode()] > [setTagItemList()]')

        const tagIdListInBook = book.tags.map((tag) => tag.id)
        // console.log(
        //   '[編集モード切り替え] > [setIsEditMode()] > [setTagItemList()] > [tagIdListInBook]',
        //   tagIdListInBook
        // )
        // console.log('[編集モード切り替え] > [setIsEditMode()] > [setTagItemList()] > [prevState]', prevState)

        return prevState.map((tagItem) => {
          // console.log({ tagItem })
          if (tagIdListInBook.includes(tagItem.id)) {
            return {
              ...tagItem,
              isDisplay: false,
            }
          } else {
            return {
              ...tagItem,
              isDisplay: true,
            }
          }
        })
      })

      return !prevState
    })
  }

  //////////////////////////////////////////////////
  // タイトル
  const handleTitleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditBook((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      }
    })
  }

  //////////////////////////////////////////////////
  // 著者
  const handleAuthorInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setEditBook((prevState) => {
      const authors = prevState.authors.map((v, i) => {
        return i === index ? event.target.value : v
      })
      return {
        ...prevState,
        authors,
      }
    })
  }

  const handleDeleteAuthorBtnClick = (index: number) => {
    setEditBook((prevState) => {
      const authors = prevState.authors.filter((v, i) => i !== index)
      return {
        ...prevState,
        authors: authors,
      }
    })
  }

  const handleAddAuthorInputBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEditBook((prevState) => {
      const authors = [...prevState.authors]
      authors.push('')
      return {
        ...prevState,
        authors,
      }
    })
  }

  //////////////////////////////////////////////////
  // 出版社
  const handlePublisherInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditBook((prevState) => {
      return {
        ...prevState,
        publisher: event.target.value,
      }
    })
  }

  //////////////////////////////////////////////////
  // タグ
  const handleDeleteTagFromEditBookBtnClick = (tag: { id: string; name: string; userId: string }) => {
    setEditBook((prevState) => {
      const tags = prevState.tags.filter((v) => v.id !== tag.id)
      return {
        ...prevState,
        tags: tags,
      }
    })
    setTagItemList((prevState) => {
      return prevState.map((v) => {
        if (v.id === tag.id) {
          v.isDisplay = true
        }
        return v
      })
    })
  }

  const handleAddTagToEditBookBtnClick = (tagItem: TagItem, index: number) => {
    // 既に本のタグに設定済みだったら処理中断
    const check = editBook.tags.some((v) => v.id === tagItem.id)
    if (check) return

    setEditBook((prevState) => {
      const tags = [...prevState.tags]
      tags.push({
        id: tagItem.id,
        name: tagItem.name,
        userId: tagItem.userId,
      })
      return {
        ...prevState,
        tags,
      }
    })

    setTagItemList((prevState) => {
      return prevState.map((v, i) => {
        if (i === index) {
          v.isDisplay = false
        }
        return v
      })
    })
  }

  const handleNewTagNameInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTagName(event.target.value)
  }

  const handleRegistNewTagBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (!newTagName || !user?.uid) return
    const { data } = await createTag({ name: newTagName, userId: user?.uid })

    // 編集本のタグに追加
    setEditBook((prevState) => {
      const tags = [...prevState.tags]
      tags.push({
        id: data?.createTag.tag.id!,
        name: data?.createTag.tag.name!,
        userId: data?.createTag.tag.userId!,
      })
      return {
        ...prevState,
        tags,
      }
    })

    // 既存全タグリストに新規登録したタグを追加 → useEffectで行う。
    // setTagItemList((prevState) => {
    //   return [
    //     ...prevState,
    //     {
    //       id: data?.createTag.tag.id!,
    //       name: data?.createTag.tag.name!,
    //       userId: data?.createTag.tag.userId!,
    //       isDisplay: false,
    //     },
    //   ]
    // })

    setNewTagName('')
  }

  //////////////////////////////////////////////////
  // メモ
  const handleMemoTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setEditBook((prevState) => {
      return {
        ...prevState,
        memo: event.target.value,
      }
    })
  }

  //////////////////////////////////////////////////
  // 更新
  const handleUpdateBookBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // 登録本データバリデーション
    setBookErrorMessage(initialBookErrorMessageState)
    let errorFlag = false
    // ISBNバリデーション
    setEditBook((prevState) => {
      // ISBNコード整形
      // eslint-disable-next-line no-irregular-whitespace
      let isbn = prevState.isbn.replace(/(-|\s|　)/g, '').trim()
      isbn = zen2Han(isbn)
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
    if (editBook.title === '') {
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
    editBook.authors.forEach((author) => {
      if (author === '') {
        authorBlankCheck.push(true)
      } else {
        authorBlankCheck.push(false)
      }
    })
    const authorsFlag = authorBlankCheck.includes(false)
    if (editBook.authors.length === 0 || !authorsFlag) {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          authors: '著者が入力されていません。',
        }
      })
      errorFlag = true
    }
    // 出版社バリデーション
    if (editBook.publisher === '') {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          publisher: '出版社が入力されていません。',
        }
      })
      errorFlag = true
    }
    if (errorFlag) return

    const { data } = await updateBook({
      ...editBook,
      userId: user?.uid!,
    })
    if (data) {
      toast.success(`「${data.updateBook.book.title}」\nの情報を更新しました。`)
    } else {
      toast.success('更新できませんでした。')
    }

    setIsEditMode(false)
    setEditBook(initialBookState)
    // setBookImgUrl(initialBookImgUrlState)
  }

  //////////////////////////////////////////////////
  // 削除
  const handleDeleteBookBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const confirmResult = await confirmAsync(['削除しても良いですか？', 'この操作は取り消すことができません。'])
    if (!confirmResult) return

    const { data } = await deleteBook({ id: editBook.id })
    if (data) {
      toast.success(`「${data.deleteBook.book.title}」\nを削除しました。`)
      router.replace('/bookshelf')
    } else {
      toast.success('削除できませんでした。')
    }
  }

  //////////////////////////////////////////////////
  // ローディング制御
  useEffect(() => {
    // setIsLoading(true)
    if (user === null) {
      router.replace('/login')
    } else if (user === undefined || getBookQueLoading || getTagsQueLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getBookQueLoading, getTagsQueLoading])

  return (
    <Layout pageTitle="Bookshelf">
      <HeadCommon title="Detail | Bookshelf | App" description="本の詳細ページです。" />
      <div className="overflow-auto h-[calc(100vh_-_var(--root-header-height)_-_var(--bookshelf-navi-height))]">
        <div className="sm:flex sm:justify-between mx-auto px-4 sm:px-8 py-6 w-full max-w-4xl">
          <div className="sm:w-[320px]">
            {bookImgUrl && <ImageBasic src={bookImgUrl} alt={book.title} priority={true} className="shadow" />}
          </div>
          <div className="relative sm:w-[calc(100%_-_360px)]">
            <ButtonBasic className="absolute right-0 top-0" onClick={handleToggleEditModeBtnClick}>
              {isEditMode ? 'キャンセル' : '編集する'}
            </ButtonBasic>
            <dl>
              <dt className="font-bold">ISBN</dt>
              <dd>
                <div>{book.isbn}</div>
              </dd>
            </dl>

            {isEditMode ? (
              <InputBookTitleContainer
                editBook={editBook}
                bookErrorMessage={bookErrorMessage}
                handleTitleInputChange={handleTitleInputChange}
              />
            ) : (
              <BookTitleContainer book={book} />
            )}

            {isEditMode ? (
              <InputBookAuthorsContainer
                editBook={editBook}
                bookErrorMessage={bookErrorMessage}
                handleAuthorInputChange={handleAuthorInputChange}
                handleDeleteAuthorBtnClick={handleDeleteAuthorBtnClick}
                handleAddAuthorInputBtnClick={handleAddAuthorInputBtnClick}
              />
            ) : (
              <BookAuthorsContainer book={book} />
            )}

            {isEditMode ? (
              <InputBookPublisherContainer
                editBook={editBook}
                bookErrorMessage={bookErrorMessage}
                handlePublisherInputChange={handlePublisherInputChange}
              />
            ) : (
              <BookPublisherContainer book={book} />
            )}

            {isEditMode ? (
              <InputBookTagsContainer
                editBook={editBook}
                tagItemList={tagItemList}
                newTagName={newTagName}
                handleDeleteTagFromEditBookBtnClick={handleDeleteTagFromEditBookBtnClick}
                handleAddTagToEditBookBtnClick={handleAddTagToEditBookBtnClick}
                handleNewTagNameInputChange={handleNewTagNameInputChange}
                handleRegistNewTagBtnClick={handleRegistNewTagBtnClick}
              />
            ) : (
              <BookTagsContainer book={book} />
            )}

            {isEditMode ? (
              <InputBookMemoContainer editBook={editBook} handleMemoTextareaChange={handleMemoTextareaChange} />
            ) : (
              <BookMemoContainer book={book} />
            )}

            {isEditMode ? (
              <div>
                <div>
                  <ButtonBasic className="block mt-4 mx-auto text-lg" onClick={handleUpdateBookBtnClick}>
                    更新する
                  </ButtonBasic>
                </div>
                <div>
                  <ButtonBasic
                    className="block mt-8 mx-auto text-sm !border-red-500 hover:!bg-red-500 !text-red-500 hover:!text-zinc-50"
                    onClick={handleDeleteBookBtnClick}
                  >
                    削除する
                  </ButtonBasic>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <NaviBookshelf />
    </Layout>
  )
}

export default Isbn
