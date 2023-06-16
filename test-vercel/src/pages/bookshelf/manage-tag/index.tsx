import { useGetTagsQuery } from '@/__generated__/graphql'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { ButtonBasic } from '@/features/bookshelf/components/ButtonBasic'
import { NaviBookshelf } from '@/features/bookshelf/components/NaviBookshelf'
import { useTag } from '@/features/bookshelf/hooks/useTag'
import { TagItem } from '@/features/bookshelf/types'
import { HeadCommon } from '@/features/root/components/HeadCommon'
import { Layout } from '@/features/root/components/Layout'
import { useLoadingContext } from '@/features/root/context/LoadingContext'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useConfirm from '@/features/root/hooks/useConfirm'

const ManageTag: NextPage = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { confirmAsync } = useConfirm()
  // useEffect(() => {
  //   if (user === null) {
  //     router.replace('/login')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user])

  const { createTag, updateTag, deleteTag } = useTag()

  // 新規タグ
  const [newTag, setNewTag] = useState<string>('')

  // 全既存タグ
  type EditTagItem = TagItem & {
    isEditMode: boolean
  }
  const [tagItemList, setTagItemList] = useState<EditTagItem[]>([])
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
  useEffect(() => {
    if (getTagsQueData?.getTags.tags) {
      setTagItemList(() => {
        return getTagsQueData?.getTags.tags.map((tag) => {
          return {
            id: tag?.id!,
            name: tag?.name!,
            userId: tag?.userId!,
            isDisplay: true,
            isEditMode: false,
          }
        })
      })
    }
  }, [getTagsQueData])

  // 編集中既存タグ
  const initialEditTagState = {
    id: '',
    name: '',
    userId: '',
  }
  const [editTag, setEditTag] = useState<typeof initialEditTagState>(initialEditTagState)

  //////////////////////////////////////////////////
  // 新規タグ
  const handleNewTagInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTag(event.target.value)
  }

  const handleCreateTagBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const { data } = await createTag({ name: newTag, userId: user?.uid! })
    if (data) {
      toast.success(`「${data.createTag.tag.name}」\nを追加しました。`)
    } else {
      toast.error('タグを追加できませんでした。')
    }
    setNewTag('')
  }

  const handleEditTagInputChage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditTag((prevState) => {
      return {
        ...prevState,
        name: event.target.value,
      }
    })
  }

  const handleCancelEditTagBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTagItemList((prevState) => {
      return prevState.map((v) => {
        return {
          ...v,
          isDisplay: true,
          isEditMode: false,
        }
      })
    })
  }

  const handleEditTagBtnClick = (tagItem: EditTagItem, index: number) => {
    setEditTag(() => {
      return {
        name: tagItem.name,
        id: tagItem.id,
        userId: tagItem.userId,
      }
    })
    setTagItemList((prevState) => {
      return prevState.map((v, i) => {
        if (i === index) {
          return {
            ...v,
            isDisplay: true,
            isEditMode: true,
          }
        } else {
          return {
            ...v,
            isDisplay: false,
            isEditMode: false,
          }
        }
      })
    })
  }

  const handleUpdateTagBtnClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (editTag.name === '') return
    // const updatedTag = await updateTag({ id: editTag.id, name: editTag.name })
    const { data } = await updateTag({ id: editTag.id, name: editTag.name })
    if (data) {
      toast.success(`「${data.updateTag.tag.name}」\nに更新しました。`)
    } else {
      toast.error('更新できませんでした。')
    }

    setTagItemList((prevState) => {
      return prevState.map((v) => {
        return {
          ...v,
          isDisplay: true,
          isEditMode: false,
        }
      })
    })
  }

  const handleDeleteTagBtnClick = async (tagId: string) => {
    if (tagId === '') return

    const confirmResult = await confirmAsync(['削除してもよいですか?', 'この処理は取り消すことができません。'])
    if (!confirmResult) return

    const { data } = await deleteTag({ id: tagId })
    if (data) {
      toast.success(`「${data.deleteTag.tag.name}」\nを削除しました。`)
    } else {
      toast.error('削除できませんでした。')
    }
  }

  //////////////////////////////////////////////////
  // ローディング制御
  useEffect(() => {
    if (user === null) {
      router.replace('/login')
    } else if (user === undefined || getTagsQueLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, getTagsQueLoading])

  return (
    <Layout pageTitle="Bookshelf">
      <HeadCommon title="Manage tag | Bookshelf | App" description="タグの管理ページです。" />
      <div className="overflow-auto h-[calc(100vh_-_var(--root-header-height)_-_var(--bookshelf-navi-height))]">
        <div className="mx-auto px-4 sm:px-8 py-6 w-full max-w-4xl">
          <dl>
            {/* 新規タグ追加 */}
            <dt className="text-lg font-bold">タグを作成</dt>
            <dd className="mt-2">
              <input className="bg-zinc-200" type="text" onChange={handleNewTagInputChange} value={newTag} />
              <ButtonBasic className="ml-4" onClick={handleCreateTagBtnClick}>
                作成する
              </ButtonBasic>
            </dd>
          </dl>

          <dl className="mt-6">
            {/* 「タグを検索」機能は必要か？ */}
            <dt className="text-lg font-bold">タグを編集</dt>
            <dd className="mt-2">
              {/* 既存タグ編集削除 */}
              {tagItemList.map((tagItem, index) => {
                return (
                  <div
                    className={`relative flex justify-between py-2 border-t-[1px] [&:last-child]:border-b-[1px] border-zinc-200 ${
                      tagItem.isDisplay
                        ? ''
                        : 'pointer-events-none after:content=[""] after:absolute after:left-0 after:top-[1px] after:block after:w-full after:h-[calc(100%_-_1px)] after:bg-zinc-50 after:opacity-50'
                    }`}
                    key={index}
                  >
                    <div className="w-[calc(100%_-_14rem)]">
                      {tagItem.isEditMode ? (
                        <input
                          className="w-full bg-zinc-200"
                          type="text"
                          onChange={handleEditTagInputChage}
                          value={editTag.name}
                        />
                      ) : (
                        <p>{tagItem.name}</p>
                      )}
                    </div>
                    <div className="flex">
                      {tagItem.isEditMode ? (
                        <div>
                          <ButtonBasic className="w-24 text-sm" onClick={handleCancelEditTagBtnClick}>
                            キャンセル
                          </ButtonBasic>
                        </div>
                      ) : (
                        <div>
                          <ButtonBasic
                            className="w-24 text-sm"
                            onClick={() => {
                              handleEditTagBtnClick(tagItem, index)
                            }}
                          >
                            編集
                          </ButtonBasic>
                        </div>
                      )}
                      {tagItem.isEditMode ? (
                        <div>
                          <ButtonBasic className="ml-2 w-24 text-sm" onClick={handleUpdateTagBtnClick}>
                            更新
                          </ButtonBasic>
                        </div>
                      ) : (
                        <div>
                          <ButtonBasic
                            className="ml-2 w-24 text-sm !border-red-500 hover:!bg-red-500 !text-red-500 hover:!text-zinc-50"
                            onClick={() => {
                              handleDeleteTagBtnClick(tagItem.id)
                            }}
                          >
                            削除
                          </ButtonBasic>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </dd>
          </dl>
        </div>
      </div>

      <NaviBookshelf />
    </Layout>
  )
}

export default ManageTag
