import type { NextApiRequest, NextApiResponse } from 'next'
// import * as Utils from '@/features/myBooks/utils'

import getUserData from '@/features/myBooks/services/auth/getUserData'
import { prisma } from '@/lib/prisma'

// import { setCookie } from 'nookies'

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
  const idToken = req.cookies.idToken || ''
  const result = await getUserData(idToken)

  if (!result.ok) {
    return res.status(400).json({
      errorCode: 3,
      errorMessage: 'ユーザーデータを取得できませんでした。',
    })
  }

  const data = await result.json()

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.users[0].email,
      },
    })
    return res.status(200).json(user)
  } catch (e) {
    return res.status(400).json({
      errorCode: 2,
      errorMessage: 'ユーザーデータを取得できませんでした。',
    })
  }

  return res.status(200).json({ email: data.email })
}
