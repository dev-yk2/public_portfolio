/* eslint-disable no-unused-vars */
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { prismaClient } from '@/features/root/lib/prismaClient'
import { ParsedUrlQuery } from 'querystring'
import { Layout } from '@/features/root/components/Layout'
import { useGetBooksQuery, useGetUsersQuery } from '@/__generated__/graphql'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { useEffect } from 'react'

/**
 *
 * 今回はISGによるページの生成は行わない
 *
 */

// getStaticPropsからコンポーネントに渡すpropsの型定義
type Props = {
  userId: string
}

// getStaticPropsのcontextのparamsの値を型定義
// 今回だとgetStaticPathsからgetStaticPropsに渡されるparams
interface Params extends ParsedUrlQuery {
  userId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prismaClient.user.findMany()
  const paths = users.map((user) => {
    return {
      params: {
        userId: user.firebaseAuthId,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  return {
    props: {
      userId: context.params!['userId'],
    },
    revalidate: 60,
  }
}

const UserId: NextPage<Props> = ({ userId }) => {
  const { data: getUsersData, loading: getUsersLoading, error: getUsersError } = useGetUsersQuery()
  console.log(getUsersData?.getUsers.users)

  const router = useRouter()

  const { user } = useAuthContext()

  const { data, loading, error } = useGetBooksQuery({
    variables: {
      input: {
        userId,
      },
    },
  })

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Layout pageTitle="Bookshelf">
      <div>
        <h1>userId: {userId}</h1>
        <div>
          {data?.getBooks.books.map((book) => {
            return (
              <div key={book?.id}>
                <div>{book?.isbn}</div>
                <div>{book?.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default UserId
