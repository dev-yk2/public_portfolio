import type { NextApiRequest, NextApiResponse } from 'next'
import getIdToken from '@/features/myBooks/services/auth/getIdToken'
import * as Utils from '@/features/myBooks/utils'

type ResData =
  | {
      email: string
    }
  | {
      errorCode: number
      errorMessage: string
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>,
) {
  const refreshToken = req.cookies.refreshToken || ''
  const result = await getIdToken(refreshToken)

  if (!result.ok) {
    return res.status(400).json({
      errorCode: 2,
      errorMessage: 'IDトークンを取得できませんでした。',
    })
  }

  const data = await result.json()

  // 新たに取得したIDトークンとリフレッシュトークンをSet-Cookieに格納する。
  res.setHeader(
    'Set-Cookie',
    Utils.generateCookieStringArray([
      {
        name: 'refreshToken',
        value: data.refresh_token,
        path: '/',
        httpOnly: true,
        secure: true,
      },
      {
        name: 'idToken',
        value: data.id_token,
        path: '/',
        httpOnly: true,
        secure: true,
      },
    ]),
  )

  return res.status(200).json({ email: data.email })
}
