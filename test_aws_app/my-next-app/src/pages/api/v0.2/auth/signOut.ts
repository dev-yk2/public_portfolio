import type { NextApiRequest, NextApiResponse } from 'next'
import * as Utils from '@/features/myBooks/utils'

type ResData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>,
) {
  res.setHeader(
    'Set-Cookie',
    Utils.generateCookieStringArray([
      {
        name: 'refreshToken',
        value: '',
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: true,
      },
      {
        name: 'idToken',
        value: '',
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: true,
      },
    ]),
  )

  return res.json({
    message: 'ログアウトしました',
  })
}
