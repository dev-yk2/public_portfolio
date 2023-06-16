import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@/features/root/components/Layout'
import { ButtonBasic } from '@/features/bookshelf/components/ButtonBasic'
import { ImageBasic } from '@/features/bookshelf/components/ImageBasic'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { useBook } from '@/features/bookshelf/hooks/useBook'
import { useTag } from '@/features/bookshelf/hooks/useTag'
import getBookData from '@/features/bookshelf/services/getBookDataFormNDL'
import type { BookErrorMessage, EditBook, TagItem } from '@/features/bookshelf/types'
import { generateImageData, zen2Han } from '@/features/bookshelf/utils'
import { useGetBooksQuery } from '@/__generated__/graphql'
import { useGetTagsQuery } from '@/__generated__/graphql'
import { NaviBookshelf } from '@/features/bookshelf/components/NaviBookshelf'
import { InputBookTitleContainer } from '@/features/bookshelf/components/InputBookTitleContainer'
import { InputBookAuthorsContainer } from '@/features/bookshelf/components/InputBookAuthorsContainer'
import { InputBookPublisherContainer } from '@/features/bookshelf/components/InputBookPublisherContainer'
import { InputBookTagsContainer } from '@/features/bookshelf/components/InputBookTagsContainer'
import { InputBookMemoContainer } from '@/features/bookshelf/components/InputBookMemoContainer'
import { HeadCommon } from '@/features/root/components/HeadCommon'
import { useLoadingContext } from '@/features/root/context/LoadingContext'
import { toast } from 'react-hot-toast'

const RegistBook: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const { setIsLoading } = useLoadingContext()

  /**
   * 新規作成する本のデータ
   */
  const initialEditBookState = {
    isbn: '',
    title: '',
    authors: [''],
    publisher: '',
    tags: [],
    memo: '',
  }
  const [newBook, setNewBook] = useState<EditBook>(initialEditBookState)

  /**
   * 新規本画像
   */
  const initialBookImgUrlState = 'https://placehold.jp/120/aaaaaa/ffffff/500x720.jpg?text=No%0AImage'
  const [newBookImgUrl, setNewBookImgUrl] = useState<string>(initialBookImgUrlState)

  const { createBook } = useBook()
  const {
    data: getBooksQueData,
    loading: getBooksQueLoading,
    // error: getBooksQueError,
  } = useGetBooksQuery({
    variables: {
      input: {
        userId: user?.uid!,
      },
    },
  })

  /**
   * 新規本エラーメッセージ
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
  const [firstUseEffectFlag, setFirstUseFlag] = useState<boolean>(true)
  useEffect(() => {
    if (getTagsQueData?.getTags.tags) {
      if (firstUseEffectFlag) {
        // 初回ロード時
        setFirstUseFlag(false)
        setTagItemList(() => {
          return getTagsQueData?.getTags.tags.map((tag) => {
            return {
              id: tag?.id!,
              name: tag?.name!,
              userId: tag?.userId!,
              // 初回ロード時はtrue（表示）にする。
              isDisplay: true,
            }
          })
        })
      } else {
        // 再レンダリング時
        setTagItemList((prevState) => {
          return getTagsQueData?.getTags.tags.map((tag, index) => {
            // console.log(prevState)
            return {
              id: tag?.id!,
              name: tag?.name!,
              userId: tag?.userId!,
              // 再レンダリング時（新規タグ追加時）は既存の値があればそれに従い、新規追加したものであればfalse（非表示）にする。
              isDisplay: prevState[index] ? prevState[index].isDisplay : false,
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
  // ISBN
  const handleIsbnInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewBook((prevState) => {
      return {
        ...prevState,
        isbn: event.target.value,
      }
    })
  }

  const handleSearchBookBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // 各種表示初期化
    setNewBook((prevState) => {
      return {
        ...initialEditBookState,
        isbn: prevState.isbn,
      }
    })
    setNewBookImgUrl(initialBookImgUrlState)
    setBookErrorMessage(initialBookErrorMessageState)
    setTagItemList((prevState) => {
      return prevState.map((v) => {
        return {
          ...v,
          isDisplay: true,
        }
      })
    })

    // ISBNコード整形
    // eslint-disable-next-line no-irregular-whitespace
    let isbn = newBook.isbn.replace(/(-|\s|　)/g, '').trim()
    isbn = zen2Han(isbn)
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
    // 初めから全データ取得すべき？
    // console.log(getBooksQueData?.getBooks.books)
    const existingCheck = getBooksQueData?.getBooks.books.some((book) => book?.isbn === isbn)
    // const res = await fetch('/api/graphql', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     query: `query GetBook {
    //       getBook(input: {isbn: "${isbn}", userId: "${user?.uid!}"}) {
    //         book {
    //           isbn
    //         }
    //       }
    //     }`,
    //   }),
    // })
    // const { data } = await res.json()

    // if (data) {
    if (existingCheck) {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          isbn: 'この本はすでに登録されています。',
          registeredBookUrl: `/bookshelf/${isbn}`,
          // registeredBookUrl: `/bookshelf/${data?.getBook?.book?.isbn}`,
        }
      })
      return
    }

    const ndlBookData = await getBookData(isbn)
    if (ndlBookData instanceof Error) {
      setBookErrorMessage((prevState) => {
        return {
          ...prevState,
          isbn: `${ndlBookData.message}ISBNコードが誤っている可能性があります。`,
        }
      })
    }

    setNewBook((prevState) => {
      return {
        ...prevState,
        ...ndlBookData,
      }
    })

    const imgData = await generateImageData(isbn, 'l')
    setNewBookImgUrl(imgData.url)
  }

  //////////////////////////////////////////////////
  // タイトル
  const handleTitleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewBook((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      }
    })
  }

  //////////////////////////////////////////////////
  // 著者
  const handleAuthorInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setNewBook((prevState) => {
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
    setNewBook((prevState) => {
      const authors = prevState.authors.filter((v, i) => i !== index)
      return {
        ...prevState,
        authors: authors,
      }
    })
  }

  const handleAddAuthorInputBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNewBook((prevState) => {
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
    setNewBook((prevState) => {
      return {
        ...prevState,
        publisher: event.target.value,
      }
    })
  }

  //////////////////////////////////////////////////
  // タグ
  const handleDeleteTagFromEditBookBtnClick = (tag: { id: string; name: string; userId: string }) => {
    setNewBook((prevState) => {
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
    const check = newBook.tags.some((v) => v.id === tagItem.id)
    if (check) return

    setNewBook((prevState) => {
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
    setNewBook((prevState) => {
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
    setNewBook((prevState) => {
      return {
        ...prevState,
        memo: event.target.value,
      }
    })
  }

  //////////////////////////////////////////////////
  // 登録
  const handleRegstNewBookBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    // 登録本データバリデーション
    setBookErrorMessage(initialBookErrorMessageState)
    let errorFlag = false
    // ISBNバリデーション
    setNewBook((prevState) => {
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
          publisher: '出版社が入力されていません。',
        }
      })
      errorFlag = true
    }
    if (errorFlag) return

    const { data } = await createBook({
      ...newBook,
      userId: user?.uid!,
    })
    if (data) {
      toast.success(`「${data.createBook.book.title}」\nを本棚に追加しました。`)
    } else {
      toast.error('本棚に追加できませんでした。')
    }
    // window.alert(`『${result.title}』\nを登録しました。`)

    // const result = await postMyBook(newBook, props.userId)
    // if ('errorMessage' in result) {
    //   window.alert(result.errorMessage)
    // } else {
    //   window.alert(`『${result.title}』\nを登録しました。`)
    // }

    setNewBook(initialEditBookState)
    setNewBookImgUrl(initialBookImgUrlState)
  }

  //////////////////////////////////////////////////
  // ローディング制御
  useEffect(() => {
    if (user === null) {
      router.replace('/login')
    } else if (user === undefined || getBooksQueLoading || getTagsQueLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getBooksQueLoading, getTagsQueLoading])

  return (
    <Layout pageTitle="Bookshelf">
      <HeadCommon title="Regist book | Bookshelf | App" description="本の登録ページです。" />
      <div className="overflow-auto h-[calc(100vh_-_var(--root-header-height)_-_var(--bookshelf-navi-height))]">
        <div className="sm:flex sm:justify-between mx-auto px-4 md:px-8 py-6 w-full max-w-4xl">
          <div className="sm:w-[320px]">
            <ImageBasic src={newBookImgUrl} alt={newBook.title} />
          </div>
          <div className="sm:w-[calc(100%_-_360px)]">
            <dl>
              <dt className="font-bold">ISBN</dt>
              <dd>
                <div className="flex">
                  <input
                    className="w-48 bg-zinc-200"
                    type="text"
                    value={newBook.isbn}
                    onChange={handleIsbnInputChange}
                  />
                  <ButtonBasic className="ml-4 text-sm" onClick={handleSearchBookBtnClick}>
                    本を検索する
                  </ButtonBasic>
                </div>
                {bookErrorMessage.isbn ? <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.isbn}</p> : null}
              </dd>
            </dl>

            {/* <dl className="mt-4">
              <dt className="font-bold">タイトル</dt>
              <dd>
                <div>
                  <input
                    className="w-full bg-zinc-200"
                    type="text"
                    value={newBook.title}
                    onChange={handleTitleInputChange}
                  />
                </div>
                {bookErrorMessage.title ? <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.title}</p> : null}
              </dd>
            </dl> */}

            <InputBookTitleContainer
              editBook={newBook}
              bookErrorMessage={bookErrorMessage}
              handleTitleInputChange={handleTitleInputChange}
            />

            {/* <dl className="mt-4">
              <dt className="font-bold">著者</dt>
              <dd>
                <div>
                  {newBook.authors.map((author, index) => {
                    return (
                      <div className="relative [&:nth-child(n+2)]:mt-2" key={index}>
                        <input
                          className="w-full bg-zinc-200"
                          type="text"
                          value={author}
                          onChange={(e) => {
                            handleAuthorInputChange(e, index)
                          }}
                        />
                        {newBook.authors.length > 1 ? (
                          <button
                            className="absolute right-4 top-[50%] translate-x-[50%] -translate-y-[50%] block w-4 h-4 before:content-[''] before:absolute before:left-[50%] before:top-[50%] before:-translate-x-[50%] -before:translate-y-[50%] before:rotate-45 before:block before:w-[80%] before:h-[1px] before:bg-zinc-600 after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:-translate-x-[50%] -after:translate-y-[50%] after:-rotate-45 after:block after:w-[80%] after:h-[1px] after:bg-zinc-600"
                            onClick={() => {
                              handleDeleteAuthorBtnClick(index)
                            }}
                          ></button>
                        ) : null}
                      </div>
                    )
                  })}
                  <ButtonBasic className="mt-2 text-sm" onClick={handleAddAuthorInputBtnClick}>
                    著者を追加する
                  </ButtonBasic>
                </div>
                {bookErrorMessage.authors ? (
                  <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.authors}</p>
                ) : null}
              </dd>
            </dl> */}

            <InputBookAuthorsContainer
              editBook={newBook}
              bookErrorMessage={bookErrorMessage}
              handleAuthorInputChange={handleAuthorInputChange}
              handleDeleteAuthorBtnClick={handleDeleteAuthorBtnClick}
              handleAddAuthorInputBtnClick={handleAddAuthorInputBtnClick}
            />

            {/* <dl className="mt-4">
              <dt className="font-bold">出版社</dt>
              <dd>
                <div>
                  <input
                    className="w-full bg-zinc-200"
                    type="text"
                    value={newBook.publisher}
                    onChange={handlePublisherInputChange}
                  />
                </div>
                {bookErrorMessage.publisher ? (
                  <p className="mt-1 text-red-600 text-sm">{bookErrorMessage.publisher}</p>
                ) : null}
              </dd>
            </dl> */}

            <InputBookPublisherContainer
              editBook={newBook}
              bookErrorMessage={bookErrorMessage}
              handlePublisherInputChange={handlePublisherInputChange}
            />

            {/* <dl className="mt-4">
              <dt className="font-bold">タグ</dt>
              <dd>
                <div className="text-sm">
                  <p className="mt-1 font-bold">［現在設定中のタグ］</p>
                  <div className="flex">
                    {newBook.tags.length === 0 ? <p>※ 現在設定中のタグはありません。</p> : null}
                    {newBook.tags.map((tag, index) => {
                      return (
                        <div className="flex items-center m-1 py-1 pl-2 pr-1 bg-zinc-200" key={index}>
                          {tag.name}
                          <button
                            className="relative block ml-2 w-4 h-4 before:content-[''] before:absolute before:left-[50%] before:top-[50%] before:-translate-x-[50%] -before:translate-y-[50%] before:rotate-45 before:block before:w-[80%] before:h-[1px] before:bg-zinc-600 after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:-translate-x-[50%] -after:translate-y-[50%] after:-rotate-45 after:block after:w-[80%] after:h-[1px] after:bg-zinc-600"
                            onClick={() => {
                              handleDeleteTagFromEditBookBtnClick(tag)
                            }}
                          ></button>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mt-1 font-bold">［既存タグから追加］</p>
                  <div>
                    {tagItemList.length === 0 ? <p>※ 既存のタグはありません。</p> : null}
                    {tagItemList.map((tagItem, index) => {
                      return (
                        <button
                          className={`m-0.5 py-0.5 px-2 border border-zinc-800 rounded-md hover:bg-blue-400 ${
                            tagItem.isDisplay ? '' : 'opacity-50 pointer-events-none'
                          }`}
                          key={index}
                          onClick={() => {
                            handleAddTagToEditBookBtnClick(tagItem, index)
                          }}
                        >
                          {tagItem.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="mt-1 font-bold">［新規タグを作成］</p>
                  <div className="flex">
                    <input
                      className="w-48 bg-zinc-200"
                      type="text"
                      onChange={handleNewTagNameInputChange}
                      value={newTagName}
                    />
                    <ButtonBasic className="ml-4 text-sm" onClick={handleRegistNewTagBtnClick}>
                      新規タグを登録
                    </ButtonBasic>
                  </div>
                </div>
              </dd>
            </dl> */}

            <InputBookTagsContainer
              editBook={newBook}
              tagItemList={tagItemList}
              newTagName={newTagName}
              handleDeleteTagFromEditBookBtnClick={handleDeleteTagFromEditBookBtnClick}
              handleAddTagToEditBookBtnClick={handleAddTagToEditBookBtnClick}
              handleNewTagNameInputChange={handleNewTagNameInputChange}
              handleRegistNewTagBtnClick={handleRegistNewTagBtnClick}
            />

            {/* <dl className="mt-4">
              <dt className="font-bold">メモ</dt>
              <dd>
                <div>
                  <textarea
                    className="w-full h-48 bg-zinc-200 resize-y"
                    value={newBook.memo}
                    onChange={handleMemoTextareaChange}
                  />
                </div>
              </dd>
            </dl> */}

            <InputBookMemoContainer editBook={newBook} handleMemoTextareaChange={handleMemoTextareaChange} />

            <ButtonBasic className="block mt-4 mx-auto text-lg" onClick={handleRegstNewBookBtnClick}>
              登録する
            </ButtonBasic>
          </div>
        </div>
      </div>

      <NaviBookshelf />
    </Layout>
  )
}

export default RegistBook
