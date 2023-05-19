import type { NextApiRequest, NextApiResponse } from 'next'
import * as Utils from '@/features/myBooks/utils'
import { prisma } from '@/lib/prisma'

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
  const email = req.body.email || ''
  const password = req.body.password || ''

  const result = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  )
  const data = await result.json()
  console.log('[data]', data)

  if ('error' in data) {
    res.status(400).json({
      errorCode: 3,
      errorMessage: 'アカウント作成に失敗しました。',
    })
  }

  // firebaseに登録できたらアプリDBにも登録
  try {
    const user = await prisma.user.create({
      data: {
        email,
      },
    })
    res.setHeader(
      'Set-Cookie',
      Utils.generateCookieStringArray([
        {
          name: 'refreshToken',
          value: data.refreshToken,
          path: '/',
          httpOnly: true,
          secure: true,
        },
        {
          name: 'idToken',
          value: data.idToken,
          path: '/',
          httpOnly: true,
          secure: true,
        },
      ]),
    )
    return res.status(200).json(user)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      errorCode: 2,
      errorMessage: 'アカウント作成に失敗しました。',
    })
  }
}
