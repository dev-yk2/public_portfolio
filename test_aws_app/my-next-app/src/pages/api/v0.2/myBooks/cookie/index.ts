import type { NextApiRequest, NextApiResponse } from 'next'

import * as Types from '@/features/myBooks/types'
import * as Utils from '@/features/myBooks/utils'

type Data = { [key: string]: true } | Types.FetchError

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const refreshToken = req.body.refreshToken as string
    const idToken = req.body.idToken as string

    res.setHeader(
      'Set-Cookie',
      Utils.generateCookieStringArray([
        {
          name: 'refreshToken',
          value: refreshToken,
          path: '/',
          httpOnly: true,
          secure: true,
        },
        {
          name: 'idToken',
          value: idToken,
          path: '/',
          httpOnly: true,
          secure: true,
        },
      ]),
    )

    return res.json({ setCookie: true })
  }
}
