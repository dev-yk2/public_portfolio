import type { GetServerSidePropsContext } from 'next'
import getIdToken from '../services/auth/getIdToken'
import getUserData from '../services/auth/getUserData'

import * as Utils from '../utils'
import { prisma } from '@/lib/prisma'

/**
 * getServerSideProps関数の中で使用する。
 * @param context
 * @returns
 */
const middlewareAuth = async (context: GetServerSidePropsContext) => {
  // console.log('[middlewareAuth]')

  const toRedirect = {
    redirect: {
      permanent: false,
      destination: '/myBooks/login',
    },
  }

  // headerのcookie情報をobjectのarrayにする
  // [{'idToken': 'hogehoge'}, {'refreshToken': 'fugafuga'}]
  const cookieStringArray = context.req.headers.cookie?.split(' ')
  if (!cookieStringArray) {
    return toRedirect
  }
  const cookieObjectArray = cookieStringArray.map((cookieString) => {
    const cookies = cookieString.split('=')
    const cookieName = cookies[0]
    const cookieValue = cookies[1]
    const cookieObject = {
      [cookieName]: cookieValue,
    }
    return cookieObject
  })

  // アプリ側DBからユーザーデータを取得するためのユーザーEメールを取得する
  let userEmail: string

  // ユーザーデータを取得
  const idTokenObject =
    cookieObjectArray.find((cookieObject) => 'idToken' in cookieObject) || {}
  const idToken = idTokenObject['idToken'] || ''
  const resUserData = await getUserData(idToken)
  const dataUserData = await resUserData.json()
  // console.log('[dataUserData]', dataUserData)

  if (resUserData.ok) {
    userEmail = dataUserData.users[0].email
  } else {
    // IDトークンを取得
    const refreshTokenObject =
      cookieObjectArray.find(
        (cookieObject) => 'refreshToken' in cookieObject,
      ) || {}
    const refreshToken = refreshTokenObject['refreshToken'] || ''
    const resGetToken = await getIdToken(refreshToken)

    // const hoge = await resGetToken.json()
    // console.log('[resGetToken]', hoge)
    const dataGetToken = await resGetToken.json()
    // console.log('[dataGetToken]', dataGetToken)

    if (!resGetToken.ok) {
      // リフレッシュトークンからIDトークンを取得できなかった場合、ログインページにリダイレクト
      // cookieを削除
      // context.res.setHeader('Set-Cookie', Utils.generateCookieStringArray([{
      //   name: 'refreshToken',
      //   value: '',
      //   path: '/',
      //   maxAge: 0,
      //   httpOnly: true,
      //   secure: true,
      // }, {
      //   name: 'idToken',
      //   value: '',
      //   path: '/',
      //   maxAge: 0,
      //   httpOnly: true,
      //   secure: true,
      // }]))
      // リダイレクト
      return {
        redirect: {
          permanent: false,
          destination: '/myBooks/login',
        },
      }
    } else {
      // const dataGetToken = await resGetToken.json()
      // console.log('[dataGetToken]', dataGetToken)

      // レスポンスヘッダーに新しいIDトークンとリフレッシュトークンをセット
      context.res.setHeader(
        'Set-Cookie',
        Utils.generateCookieStringArray([
          {
            name: 'refreshToken',
            value: dataGetToken.refresh_token,
            path: '/',
            httpOnly: true,
            secure: true,
          },
          {
            name: 'idToken',
            value: dataGetToken.id_token,
            path: '/',
            httpOnly: true,
            secure: true,
          },
        ]),
      )

      // ユーザーのEメール取得のため
      const resUserData2 = await getUserData(dataGetToken.id_token)
      const dataUserData2 = await resUserData2.json()
      // console.log('[dataUserData2]', dataUserData2)
      userEmail = dataUserData2.users[0].email
    }
  }

  // ユーザーEメールをもとに、ユーザーIDをアプリ側DBから取得し、request.nextUrl.pathnameと一致するか確認する
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  // IDトークンで取得したEmailによってアプリ側DBからユーザーを取得できなかった場合、login画面にリダイレクト
  // この場合firebase authにはユーザーが登録されているのに、アプリ側に登録されていないということになるので、対策が必要かも
  if (!user) {
    return toRedirect
  }

  if (!context.params) {
    return toRedirect
  }
  const userId = Number(context.params.userId)

  // IDトークンで取得したEmailによってアプリ側DBから取得したユーザーIDと、
  // ページ遷移時のcontext.params.userId（つまりURL）が異なる場合、
  // IDトークン側を優先し、リダイレクトさせる。
  if (user.id !== userId) {
    const path = context.resolvedUrl
    const regex = /^(\/myBooks\/)[0-9]+(.*)$/
    const matched = path.match(regex)
    return {
      redirect: {
        permanent: false,
        destination: `${matched?.[1]}${user.id}${matched?.[2]}`,
        // destination: `/myBooks/${user.id}`,
      },
    }
  }

  // 認証に問題がない場合、ユーザーIDを返す
  return {
    props: {
      userId,
    },
  }
}

export default middlewareAuth
