import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState, useCallback, useContext } from 'react'

import LayoutListPage from '@/features/myBooks/components/layout/LayoutListPage'
import HeadBasic from '@/features/myBooks/components/layout/head/HeadBasic'
import BookViewGrid from '@/features/myBooks/components/page/list/BookViewGrid'
import BookViewList from '@/features/myBooks/components/page/list/BookViewList'

import { UserContext } from '@/features/myBooks/context/UserContext'

import useAuthors from '@/features/myBooks/hooks/useAuthors'
import useBookList from '@/features/myBooks/hooks/useBookList'
import usePublishers from '@/features/myBooks/hooks/usePublishers'
import useTagList from '@/features/myBooks/hooks/useTagList'

import middlewareAuth from '@/features/myBooks/middleware/middlewareAuth'

import getMyBooks from '@/features/myBooks/services/getMyBooks'

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

const UserId: NextPage<Props> = (props) => {
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

  const { bookList, setBookList } = useBookList()
  const {
    // authors,
    setAuthors,
  } = useAuthors()
  const {
    // publishers,
    setPublishers,
  } = usePublishers()
  const { tagList, setTagList } = useTagList()

  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const [bookViewMode, setBookViewMode] = useState<'list' | 'grid'>('list')

  /**
   * 本データ取得
   */
  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      const books = await getMyBooks(props.userId)
      if ('errorMessage' in books) return

      // 画像を取得できるかどうかを確認し、本データにフラグを追加。
      // ついでに、絞り込みの際に使用する表示フラグを追加。
      const booksAddedFlags = await Promise.all(
        books.map(async (book) => {
          const imgData = await Utils.generateImageData(book.isbn, 'l')

          return {
            ...book,
            imageUrl: imgData.url,
            imageFlag: imgData.flag,
            displayFlag: true,
          }
        }),
      )

      setBookList(() => {
        return [...booksAddedFlags].reverse()
      })

      // 本データから著者、出版社、タグを取得
      const _authors: Types.BookAuther[] = ['著者で絞り込み']
      const _publishers: Types.BookPublisher[] = ['出版社で絞り込み']
      const _tags: Types.Tag[] = []
      books.forEach((book) => {
        book.authors.forEach((v) => {
          _authors.push(v)
        })
        _publishers.push(book.publisher)
        book.tags.forEach((v) => {
          _tags.push(v)
        })
      })

      // 表示フラグを持った配列を生成
      setTagList(() => {
        // [オブジェクトの配列を重複削除する方法](https://qiita.com/allJokin/items/28cd023335641e8796c5)
        const removedDuplicates = Array.from(
          new Map(_tags.map((tag) => [tag.id, tag])).values(),
        )
        const newState = removedDuplicates.map((tag) => {
          return {
            ...tag,
            displayFlag: true,
          }
        })
        return newState
      })

      // 重複削除してsetState
      // プリミティブ型の配列はSetで重複削除
      setAuthors(Array.from(new Set(_authors)))
      setPublishers(Array.from(new Set(_publishers)))
    })()
    // eslint-disable-next-line
  }, [])

  /**
   * 「検索」ロジック
   * スペース区切りのアンド検索に対応
   */
  const searchByText = useCallback((searchText: string) => {
    // 1.検索文字列前後のスペースを削除 2.全角スペースを半角スペースに変換 3.splitで配列化 4.zen2Hanで全角英数を半角に変換 5.kata2Hiraでカタカナをひらがなに変換
    const convertedSearchTextArray = searchText
      .trim()
      .replace(/　/g, ' ')
      .split(' ')
      .map((str) => Utils.kata2Hira(Utils.zen2Han(str)))
    setBookList((prevState) => {
      return prevState.map((bookItem) => {
        const searchFlag = convertedSearchTextArray.every(
          (convertedSearchText) => {
            // 今回はtest（正規表現）だが、includesでも可。
            const regexp = new RegExp(convertedSearchText, 'i') // アルファベット大文字小文字の区別なし。includesの場合toLowerCaseを使う。
            // ISBNをチェック
            if (regexp.test(Utils.kata2Hira(Utils.zen2Han(bookItem.isbn))))
              return true
            // タイトルをチェック
            if (regexp.test(Utils.kata2Hira(Utils.zen2Han(bookItem.title))))
              return true
            // 著者をチェック
            for (let i = 0; i < bookItem.authors.length; i++) {
              if (
                regexp.test(Utils.kata2Hira(Utils.zen2Han(bookItem.authors[i])))
              )
                return true
              // breakをしなくてもreturn trueした時点でeveryは次の値に進むので、forの残りの処理もスキップされる。
            }
            // 出版社をチェック
            if (regexp.test(Utils.kata2Hira(Utils.zen2Han(bookItem.publisher))))
              return true
            // タグをチェック
            for (let i = 0; i < bookItem.tags.length; i++) {
              if (
                regexp.test(
                  Utils.kata2Hira(Utils.zen2Han(bookItem.tags[i].name)),
                )
              )
                return true
            }
            return false
          },
        )
        bookItem.displayFlag = searchFlag
        return bookItem
      })
    })
    // eslint-disable-next-line
  }, [])

  /**
   * selectedTagIdsの値で絞り込み
   */
  useEffect(() => {
    // タグ未選択の場合は全ての本を表示
    if (selectedTagIds.length === 0) {
      setBookList((prevState) => {
        return prevState.map((v) => {
          return {
            ...v,
            displayFlag: true,
          }
        })
      })
      return
    }

    setBookList((prevState) => {
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
          displayFlag: result,
        }
      })
    })
    // eslint-disable-next-line
  }, [selectedTagIds])

  /**
   * 「タグで絞り込み」のロジック
   * クリックしたタグをselectedTagIdsに追加または削除する。
   */
  const filterByTag = useCallback((tagId: number) => {
    setSelectedTagIds((prevState) => {
      if (prevState.indexOf(tagId) === -1) {
        // クリックしたタグが未選択だったら、selectedTagIdsに追加する
        return [...prevState, tagId]
      } else {
        // クリックしたタグが選択済みだったら、selectedTagIdsから削除する
        const newState = prevState.filter((v) => v !== tagId)
        return newState
      }
    })
  }, [])

  /**
   * 「並び替え」のロジック
   */
  const sortBy = useCallback((sortType: string) => {
    setBookList((prevState) => {
      const newState = [...prevState]
      newState.sort((first, second) => {
        if (sortType === 'title') {
          if (first.title > second.title) return 1
          if (first.title < second.title) return -1
          return 0
        }
        if (sortType === 'author') {
          if (first.authors[0] > second.authors[0]) return 1
          if (first.authors[0] < second.authors[0]) return -1
          return 0
        }
        if (sortType === 'publisher') {
          if (first.publisher > second.publisher) return 1
          if (first.publisher < second.publisher) return -1
          return 0
        }
        return 0
      })
      return newState
    })
    // eslint-disable-next-line
  }, [])

  return (
    <LayoutListPage
      // リスト、グリッド切り替え
      bookViewMode={bookViewMode}
      setBookViewMode={setBookViewMode}
      // 検索
      searchByText={searchByText}
      // 絞り込み
      tagList={tagList}
      setSelectedTagIds={setSelectedTagIds}
      filterByTag={filterByTag}
      // 並び替え
      setBookList={setBookList}
      sortBy={sortBy}
    >
      <HeadBasic
        title="本一覧ページ | 本管理アプリ"
        pagePath={`/myBooks/${props.userId}`}
      />

      {/* book list */}
      {bookViewMode === 'list' ? (
        <BookViewList bookList={bookList} />
      ) : bookViewMode === 'grid' ? (
        <BookViewGrid bookList={bookList} />
      ) : null}
    </LayoutListPage>
  )
}

export default UserId
