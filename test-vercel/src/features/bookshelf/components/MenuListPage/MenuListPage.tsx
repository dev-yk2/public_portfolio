import React, { useEffect, useRef } from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { BsFilter, BsGrid, BsListUl, BsSearch } from 'react-icons/bs'
import { BookItem, TagItem } from '../../types'
import { filterByTag } from '../../services/filterByTag'
import { sortBySortItemList } from '../../services/sortBySortItemList'
import useMenuReducer from '@/features/bookshelf/hooks/useMenuReducer'
import { ButtonWithSvgIcon } from '@/features/bookshelf/components/ButtonWithSvgIcon'

type MenuListPageProps = {
  // 検索
  handleSearchBookInputChange: React.ChangeEventHandler<HTMLInputElement>
  // 絞り込み
  setSelectedTagIds: React.Dispatch<React.SetStateAction<string[]>>
  setBookItemList: React.Dispatch<React.SetStateAction<BookItem[]>>
  // 並び替え
  sortTypeItemList: {
    type: string
    text: string
    isActive: boolean
  }[]
  setSortTypeItemList: React.Dispatch<
    React.SetStateAction<
      {
        type: string
        text: string
        isActive: boolean
      }[]
    >
  >
  tagItemList: TagItem[]
  // 表示切り替え
  bookViewType: 'list' | 'grid'
  // eslint-disable-next-line no-unused-vars
  handleViewChangeBtnClick: (viewType: 'list' | 'grid') => void
}

export const MenuListPage: React.FC<MenuListPageProps> = ({
  // 検索
  handleSearchBookInputChange,
  // 絞り込み
  setSelectedTagIds,
  setBookItemList,
  // 並び替え
  sortTypeItemList,
  setSortTypeItemList,
  tagItemList,
  // 表示切り替え
  bookViewType,
  handleViewChangeBtnClick,
}) => {
  //////////////////////////////////////////////////
  // 「絞り込み」「並び替え」のトグルメニューの状態を管理
  const { menuState, menuDispatch } = useMenuReducer()

  // メニューの参照
  const refMenuFilter = useRef(null)
  const refMenuSort = useRef(null)

  // メニューとボタンを含めた領域の参照
  // 領域外をクリックでトグルメニューを閉じるために使用する
  const refMenuFilterContainer = useRef(null)
  const refMenuSortContainer = useRef(null)

  useEffect(() => {
    const documentClickHandler = (e: MouseEvent) => {
      console.log(e.target)

      if (!refMenuFilterContainer.current || !refMenuSortContainer.current) return
      const menuFilterEle = refMenuFilterContainer.current as HTMLDivElement
      const menuSortEle = refMenuSortContainer.current as HTMLDivElement
      const targetEle = e.target as Node // containsの引数にできるよう、無理矢理Node型にしている

      // 特定の領域外をクリックしたらトグルメニューを閉じる
      if (!menuFilterEle.contains(targetEle) && !menuSortEle.contains(targetEle)) {
        menuDispatch({
          type: 'updateIsActive',
          payload: {
            filterIsActive: false,
            sortIsActive: false,
          },
        })
      }
    }
    document.addEventListener('click', documentClickHandler, false)

    return () => {
      document.removeEventListener('click', documentClickHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Menu表示切り替えロジック
  useEffect(() => {
    if (!refMenuFilter.current || !refMenuSort.current) return

    const refMenuFilterContainer = refMenuFilter.current as HTMLDivElement
    const originalFilterContainerHeight = refMenuFilterContainer.scrollHeight
    if (menuState.filterIsActive) {
      refMenuFilterContainer.style.height = `${originalFilterContainerHeight}px`
    } else {
      refMenuFilterContainer.style.height = `0px`
    }

    const refMenuSortContainer = refMenuSort.current as HTMLDivElement
    const originalSortContainerHeight = refMenuSortContainer.scrollHeight
    if (menuState.sortIsActive) {
      refMenuSortContainer.style.height = `${originalSortContainerHeight}px`
    } else {
      refMenuSortContainer.style.height = `0px`
    }
  }, [menuState])

  const handleFilterBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    menuDispatch({
      type: 'updateFilterIsActive',
      payload: {
        filterIsActive: !menuState.filterIsActive,
      },
    })
  }

  const handleSortBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    menuDispatch({
      type: 'updateSortIsActive',
      payload: {
        sortIsActive: !menuState.sortIsActive,
      },
    })
  }

  const handleSortTypeBtnClick = (
    sortType: string,
    setBookItemList: React.Dispatch<React.SetStateAction<BookItem[]>>,
    index: number
  ) => {
    sortBySortItemList(sortType, setBookItemList)
    setSortTypeItemList((prevState) => {
      return prevState.map((v, i) => {
        v.isActive = i === index ? true : false
        return v
      })
    })
  }

  return (
    // <div className="h-[var(--bookshelf-header-height)] border-b-[1px] border-zinc-200">
    <div className="h-[var(--bookshelf-header-height)] border-b-[1px] border-zinc-300 bg-zinc-100">
      <div className="mx-auto px-4 sm:px-8 w-full max-w-4xl">
        <div className="flex justify-center items-center h-[calc(var(--bookshelf-header-height)_*_0.5_-_1px)]">
          <div className="relative w-52">
            <BsSearch className="absolute left-2 top-[50%] -translate-y-[50%] w-4 h-4" />
            <input
              className="pl-8 pr-3 w-full bg-zinc-200 rounded-full"
              type="text"
              placeholder="本棚を検索する"
              onChange={handleSearchBookInputChange}
            />
          </div>
        </div>

        <div className="flex justify-between items-center h-[calc(var(--bookshelf-header-height)_*_0.5)] ">
          <div className="relative" ref={refMenuFilterContainer}>
            {/* <button className="flex items-center" onClick={handleFilterBtnClick}>
              <BsFilter className="w-5 h-5" />
              <span className="ml-1">絞り込み</span>
            </button> */}

            <ButtonWithSvgIcon text="絞り込み" onClick={handleFilterBtnClick}>
              <BsFilter className="w-5 h-5" />
            </ButtonWithSvgIcon>

            <div className="z-10 overflow-hidden absolute left-0 top-6 h-0 transition-all" ref={refMenuFilter}>
              <div className="pt-3">
                <div className="relative flex flex-wrap w-56 p-2 bg-zinc-100 border border-zinc-300 shadow before:content-[''] before:absolute before:left-10 before:-top-2 before:rotate-45 before:block before:w-4 before:h-4 before:bg-zinc-300 after:content-[''] after:absolute after:left-10 after:-top-2 after:translate-y-[2px] after:rotate-45 after:block after:w-4 after:h-4 after:bg-zinc-100">
                  {tagItemList.map((tagItem) => {
                    return (
                      <button
                        className={`${tagItem.isDisplay ? '' : 'text-blue-400'}`}
                        key={tagItem.id}
                        onClick={() => {
                          filterByTag(tagItem, setSelectedTagIds)
                        }}
                      >
                        {tagItem.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              className={`hover:text-sky-500 hover:opacity-100 ${bookViewType === 'list' ? '' : 'opacity-30'}`}
              onClick={() => {
                handleViewChangeBtnClick('list')
              }}
            >
              <BsListUl className="w-5 h-5" />
            </button>
            <button
              className={`hover:text-sky-500 hover:opacity-100 ${bookViewType === 'grid' ? '' : 'opacity-30'}`}
              onClick={() => {
                handleViewChangeBtnClick('grid')
              }}
            >
              <BsGrid className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="relative" ref={refMenuSortContainer}>
            {/* <button className="flex items-center" onClick={handleSortBtnClick}>
              <BiSortAlt2 className="w-5 h-5" />
              <span className="ml-1">並び替え</span>
            </button> */}

            <ButtonWithSvgIcon text="並び替え" onClick={handleSortBtnClick}>
              <BiSortAlt2 className="w-5 h-5" />
            </ButtonWithSvgIcon>

            <div className="z-10 overflow-hidden absolute right-0 top-6 h-0 transition-all" ref={refMenuSort}>
              <div className="pt-3">
                <div className="relative flex flex-col items-start p-2 min-w-[8em] bg-zinc-100 border border-zinc-300 shadow before:content-[''] before:absolute before:right-10 before:-top-2 before:rotate-45 before:block before:w-4 before:h-4 before:bg-zinc-300 after:content-[''] after:absolute after:right-10 after:-top-2 after:translate-y-[2px] after:rotate-45 after:block after:w-4 after:h-4 after:bg-zinc-100">
                  {sortTypeItemList.map((sortTypeItem, index) => {
                    return (
                      <button
                        className={`relative pr-6 w-full text-left whitespace-nowrap [&:nth-child(n+2)]:mt-1 after:contet-[] after:absolute after:right-2 after:top-[50%] after:-translate-y-[60%] after:rotate-45 after:block after:w-1.5 after:h-3 after:border-r-2 after:border-b-2 after:border-sky-500 after:opacity-0 ${
                          sortTypeItem.isActive ? 'after:opacity-100' : ''
                        }`}
                        key={index}
                        onClick={() => {
                          handleSortTypeBtnClick(sortTypeItem.type, setBookItemList, index)
                        }}
                      >
                        {sortTypeItem.text}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
