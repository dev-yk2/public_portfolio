import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { Layout } from '@/features/root/components/Layout'
import {
  useGetBooksQuery,
  useGetTagsQuery,
  // useGetUsersQuery
} from '@/__generated__/graphql'
import { ImageBasic } from '@/features/bookshelf/components/ImageBasic'
import { generateImageData } from '@/features/bookshelf/utils'
import { BookItem, TagItem } from '@/features/bookshelf/types'
import Link from 'next/link'
import { NaviBookshelf } from '@/features/bookshelf/components/NaviBookshelf'
import { searchByText } from '@/features/bookshelf/services/searchByText'
import { MenuListPage } from '@/features/bookshelf/components/MenuListPage'
import { HeadCommon } from '@/features/root/components/HeadCommon'
import { useLoadingContext } from '@/features/root/context/LoadingContext'

const Bookshelf: NextPage = () => {
  // const { data: getUsersData, loading: getUsersLoading, error: getUsersError } = useGetUsersQuery()

  const router = useRouter()
  const { user } = useAuthContext()
  const { setIsLoading } = useLoadingContext()

  /**
   * 本
   */
  const {
    data: getBooksQueData,
    loading: getBooksQueLoading,
    // error: getBooksQueError,
  } = useGetBooksQuery({
    variables: {
      input: {
        userId: user?.uid || '',
      },
    },
  })
  const [bookItemList, setBookItemList] = useState<BookItem[]>([])
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (getBooksQueData?.getBooks.books) {
        const books = getBooksQueData?.getBooks.books!
        const bookAddedFlags = await Promise.all(
          books.map(async (book) => {
            const imgData = await generateImageData(book?.isbn!, 'l')
            return {
              id: book?.id!,
              isbn: book?.isbn!,
              title: book?.title!,
              authors: book?.authors!,
              publisher: book?.publisher!,
              tags: book?.tags.map((tag) => ({
                id: tag?.id!,
                name: tag?.name!,
                userId: tag?.userId!,
              }))!,
              memo: book?.memo!,
              userId: book?.userId!,
              imageUrl: imgData.url,
              imageFlag: imgData.flag,
              isDisplay: true,
            }
          })
        )
        setBookItemList(() => {
          return [...bookAddedFlags].reverse()
        })
      }

      // 本データから著者、出版社、タグを取得
      const _authors: string[] = ['著者で絞り込み']
      const _publishers: string[] = ['出版社で絞り込み']
      const _tags: { id: string; name: string; userId: string }[] = []
      bookItemList.forEach((bookItem) => {
        bookItem.authors.forEach((v) => {
          _authors.push(v)
        })
        _publishers.push(bookItem.publisher)
        bookItem.tags.forEach((v) => {
          _tags.push(v)
        })
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBooksQueData])

  /**
   * 全タグ
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
    if (getTagsQueData?.getTags.tags) {
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
  }, [getTagsQueData])

  //////////////////////////////////////////////////
  // 検索
  const handleSearchBookInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    searchByText(event.target.value, setBookItemList)
  }

  //////////////////////////////////////////////////
  // 絞り込み

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  /**
   * selectedTagIdsの値で本リストを絞り込み
   */
  useEffect(() => {
    // タグ未選択の場合は全ての本を表示
    if (selectedTagIds.length === 0) {
      setBookItemList((prevState) => {
        return prevState.map((v) => {
          return {
            ...v,
            isDisplay: true,
          }
        })
      })
      return
    }

    setBookItemList((prevState) => {
      return prevState.map((bookItem) => {
        // 本のタグIDの配列を取得。
        const bookItemTagIds = bookItem.tags.map((tag) => {
          return tag.id
        })
        // 選択中のタグIDすべてを、本が持っているかどうかを確認。
        // 選択中のタグIDを全て持っていればtrue。一つでも不足していればfalse。
        const result = selectedTagIds.every((tagId) => {
          return bookItemTagIds.indexOf(tagId) > -1
        })

        return {
          ...bookItem,
          isDisplay: result,
        }
      })
    })
    // eslint-disable-next-line
  }, [selectedTagIds])

  //////////////////////////////////////////////////
  // 並び替え

  const [sortTypeItemList, setSortTypeItemList] = useState([
    {
      type: 'title',
      text: 'タイトル',
      isActive: false,
    },
    {
      type: 'author',
      text: '著者',
      isActive: false,
    },
    {
      type: 'publisher',
      text: '出版社',
      isActive: false,
    },
  ])

  //////////////////////////////////////////////////
  // 一覧表示切り替え
  const [bookViewType, setBookViewType] = useState<'list' | 'grid'>('list')
  useEffect(() => {
    const savedViewType = localStorage.getItem('viewType') as 'list' | 'grid' | null
    if (savedViewType) {
      setBookViewType(savedViewType)
    }
  }, [])
  const handleViewChangeBtnClick = (viewType: 'list' | 'grid') => {
    localStorage.setItem('viewType', viewType)
    setBookViewType(viewType)
  }

  //////////////////////////////////////////////////
  // ローディング制御
  useEffect(() => {
    // setIsLoading(true)
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
      <HeadCommon title="Bookshelf | Apps" description="本の一覧ページです。" />
      <MenuListPage
        // 検索
        handleSearchBookInputChange={handleSearchBookInputChange}
        // 絞り込み
        setSelectedTagIds={setSelectedTagIds}
        setBookItemList={setBookItemList}
        // 並び替え
        sortTypeItemList={sortTypeItemList}
        setSortTypeItemList={setSortTypeItemList}
        tagItemList={tagItemList}
        // 表示切り替え
        bookViewType={bookViewType}
        handleViewChangeBtnClick={handleViewChangeBtnClick}
      />

      <div className="overflow-auto h-[calc(100vh_-_var(--root-header-height)_-_var(--bookshelf-header-height)_-_var(--bookshelf-navi-height))]">
        <div className="mx-auto px-4 sm:px-8 w-full max-w-4xl">
          <div className="py-4">
            {bookViewType === 'list' ? (
              <ul>
                {bookItemList.map((bookItem) => {
                  if (!bookItem.isDisplay) return null
                  return (
                    <li key={bookItem.id} className="sm:flex sm:items-center py-3 [&:nth-child(n+2)]:border-t-[1px]">
                      <div className="flex items-center sm:w-[calc(100%_-_150px)]">
                        <div className="w-[80px]">
                          <ImageBasic
                            src={bookItem.imageUrl}
                            alt={bookItem.title!}
                            priority={true}
                            className="shadow"
                          />
                        </div>
                        <div className="px-4 w-[calc(100%_-_80px)]">
                          <div className="flex items-center flex-wrap">
                            <div className="text-lg font-bold underline">
                              <Link
                                className="hover:text-sky-500 transition-all duration-300"
                                href={`/bookshelf/${bookItem.isbn}`}
                              >
                                {bookItem.title}
                              </Link>
                            </div>
                            <div className="text-slate-500">（{bookItem.publisher}）</div>
                          </div>
                          <div className="flex flex-wrap mt-1 text-slate-500">
                            {bookItem.authors.map((author, index) => {
                              return (
                                <div key={index} className="mr-4">
                                  {author}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap sm:w-[150px]">
                        {bookItem.tags.map((tag) => {
                          return <div key={tag.id}>{tag.name}</div>
                        })}
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : null}
            {bookViewType === 'grid' ? (
              <ul className="flex flex-wrap items-center">
                {bookItemList.map((bookItem) => {
                  if (!bookItem.isDisplay) return null
                  return (
                    <li
                      key={bookItem.id}
                      className="w-[33.33%] sm:w-[20%] scale-95 sm:hover:scale-100 sm:transition-all sm:duration-300 sm:ease-out"
                    >
                      <Link href={`/bookshelf/${bookItem.isbn}`}>
                        <div>
                          <ImageBasic
                            src={bookItem.imageUrl}
                            alt={bookItem.title!}
                            priority={true}
                            className="shadow"
                          />
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : null}

            {/* <ul>
              {bookItemList.map((bookItem) => {
                if (!bookItem.isDisplay) return null
                return (
                  <li key={bookItem.id} className="sm:flex sm:items-center p-3 [&:nth-child(n+2)]:border-t-[1px]">
                    <div className="flex items-center sm:w-[calc(100%_-_150px)]">
                      <div className="w-[80px]">
                        <ImageBasic src={bookItem.imageUrl} alt={bookItem.title!} />
                      </div>
                      <div className="px-4 w-[calc(100%_-_80px)]">
                        <div className="flex items-center flex-wrap">
                          <div className="text-zinc-600 text-lg font-bold underline">
                            <Link href={`/bookshelf/${bookItem.isbn}`}>{bookItem.title}</Link>
                          </div>
                          <div className="text-zinc-500">（{bookItem.publisher}）</div>
                        </div>
                        <div className="flex mt-1 text-zinc-600">
                          {bookItem.authors.map((author, index) => {
                            return (
                              <div key={index} className="mr-4">
                                {author}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap sm:w-[150px]">
                      {bookItem.tags.map((tag) => {
                        return <div key={tag.id}>{tag.name}</div>
                      })}
                    </div>
                  </li>
                )
              })}
            </ul> */}
          </div>
        </div>
      </div>

      <NaviBookshelf />
    </Layout>
  )
}

export default Bookshelf
