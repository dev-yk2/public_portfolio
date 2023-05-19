import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

type ResData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>,
) {
  const idToken = req.cookies.idToken || ''

  const resUserData = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    },
  )

  if (!resUserData.ok) {
    return res.status(400).json({
      message: 'アカウント削除に失敗しました',
    })
  }

  const dataUserData = await resUserData.json()
  // console.log('[dataUserData]', dataUserData)
  const user = await prisma.user.delete({
    where: {
      email: dataUserData.users[0].email,
    },
  })
  console.log('[user]', user)

  // unused-varsでエラーになるため
  // もし if (result.ok) {} みたいなので使えれば使いたい
  // const result = await fetch(
  await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    },
  )

  return res.json({
    message: 'アカウントを削除しました',
  })
}
