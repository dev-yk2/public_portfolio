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
  // const {email, password} = req.body
  const email = req.body.email || ''
  const password = req.body.password || ''

  const result = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
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

  if ('error' in data) {
    res.status(400).json({
      errorCode: 3,
      errorMessage: '入力内容に誤りがあります。',
    })
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
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
    res.status(400).json({
      errorCode: 2,
      errorMessage: 'ログインに失敗しました。',
    })
  }
}
