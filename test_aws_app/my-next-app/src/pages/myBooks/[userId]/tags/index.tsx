import { NextPage, GetServerSideProps } from 'next'
import React, { useState, useEffect, useCallback, useContext } from 'react'

import LayoutSubPage from '@/features/myBooks/components/layout/LayoutSubPage'
import HeadBasic from '@/features/myBooks/components/layout/head/HeadBasic'
import ManageTags from '@/features/myBooks/components/page/tag/ManageTags'

import { UserContext } from '@/features/myBooks/context/UserContext'
import middlewareAuth from '@/features/myBooks/middleware/middlewareAuth'
import deleteTag from '@/features/myBooks/services/deleteTag'
import getTags from '@/features/myBooks/services/getTags'
import postTag from '@/features/myBooks/services/postTag'
import putTag from '@/features/myBooks/services/putTag'

import * as Types from '@/features/myBooks/types'

type Props = {
  userId: number
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const result = await middlewareAuth(context)
  return result
}

const Tags: NextPage<Props> = (props) => {
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

  const initialStateEditTag = {
    id: NaN,
    name: '',
  }

  // 全既存タグ
  const [tagListAll, setTagListAll] = useState<Types.TagEditable[]>([])

  // 編集中既存タグ
  const [editTag, setEditTag] = useState<Types.PreTag>(initialStateEditTag)

  // 新規タグ
  const [newTag, setNewTag] = useState<string>('')

  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      const tags = await getTags(props.userId)
      console.log(tags)

      if ('errorMessage' in tags) return
      setTagListAll(() => {
        const reverse = [...tags].reverse()
        return reverse.map((tag) => {
          return {
            ...tag,
            displayFlag: true,
            editMode: false,
          }
        })
      })
    })()
    // eslint-disable-next-line
  }, [])

  const registerTag = useCallback(async () => {
    const res = await postTag(newTag, props.userId)
    console.log(res)
    if ('errorMessage' in res) {
      console.log(res.errorMessage)
      window.alert('登録に失敗しました。')
      return
    }
    setNewTag('')
    setTagListAll((prevState) => {
      const newState = prevState.map((v) => {
        return {
          ...v,
          displayFlag: true,
          editMode: false,
        }
      })
      return [
        {
          ...res,
          displayFlag: true,
          editMode: false,
        },
        ...newState,
      ]
    })
    // eslint-disable-next-line
  }, [newTag])

  const updateTag = useCallback(async () => {
    // 更新後のalert表示用
    const prevTag = tagListAll.find(
      (v) => v.id === editTag.id,
    ) as Types.TagEditable

    const res = await putTag(editTag, props.userId)
    if ('errorMessage' in res) {
      console.log(res.errorMessage)
      window.alert('タグの更新に失敗しました。')
      return
    }
    window.alert(`「${prevTag.name}」を「${res.name}」に変更しました。`)
    setTagListAll((prevState) => {
      return prevState.map((v) => {
        if (v.id === res.id) {
          return {
            ...v,
            name: res.name,
            displayFlag: true,
            editMode: false,
          }
        } else {
          return {
            ...v,
            displayFlag: true,
            editMode: false,
          }
        }
      })
    })
    // eslint-disable-next-line
  }, [editTag])

  const removeTag = useCallback(
    async (tagId: number) => {
      const res = await deleteTag(tagId, props.userId)
      if ('errorMessage' in res) {
        console.log(res.errorMessage)
        window.alert('タグの削除に失敗しました。')
        return
      }
      setTagListAll((prevState) => {
        const newState = prevState.filter((v) => {
          return v.id !== res.id
        }) as Types.TagEditable[]
        return newState
      })
      window.alert(`タグ「${res.name}」を削除しました。`)
    },
    // eslint-disable-next-line
    [editTag],
  )

  return (
    <LayoutSubPage pageTitle="タグ管理">
      <HeadBasic
        title="タグ管理ページ | 本管理アプリ"
        pagePath={`/myBooks/${props.userId}/tags`}
      />

      <ManageTags
        tagListAll={tagListAll}
        setTagListAll={setTagListAll}
        editTag={editTag}
        setEditTag={setEditTag}
        newTag={newTag}
        setNewTag={setNewTag}
        registerTag={registerTag}
        updateTag={updateTag}
        removeTag={removeTag}
      />
    </LayoutSubPage>
  )
}

export default Tags
