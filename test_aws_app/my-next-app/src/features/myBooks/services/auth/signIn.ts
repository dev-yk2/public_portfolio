// import type { NextApiRequest, NextApiResponse } from 'next'
// import * as Utils from '@/features/myBooks/utils'
// import { prisma } from '@/lib/prisma'

/**
 * 成功時レスポンスデータ
{
  kind: 'identitytoolkit#VerifyPasswordResponse',
  localId: 'RfozsCYz6wTFn7a8B51Z4LRPVF73',
  email: 'devkatayama@gmail.com',
  displayName: '',
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVtby1hcHAyLTRiZGUzIiwiYXVkIjoibWVtby1hcHAyLTRiZGUzIiwiYXV0aF90aW1lIjoxNjgxOTIyNjgzLCJ1c2VyX2lkIjoiUmZvenNDWXo2d1RGbjdhOEI1MVo0TFJQVkY3MyIsInN1YiI6IlJmb3pzQ1l6NndURm43YThCNTFaNExSUFZGNzMiLCJpYXQiOjE2ODE5MjI2ODMsImV4cCI6MTY4MTkyNjI4MywiZW1haWwiOiJkZXZrYXRheWFtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZXZrYXRheWFtYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.QB3N7m3bfjDjpCEVqQdEhyK_0LbWVLiwf2Nbe9InXau_j7Om9EV9HNhD-ncZSZFpSC7yy7Ba5r0M274krj-T0aj_oI4iRlFwUQAtuotBN0W2AvGgN_zO5MKLYcDhgW4kFQt-poD_zU8nAMAJn8vO3vpJGmDjK0UI342ySIYZnw1szMqnHX35c_LE8ArN68zG_ZoV-QIo-N3sA-ZaBwW2Dx8REDs47wIsNoV5WDHKcJ09iRQVw3XTa04m7-GlXl0tCHjhzgeE24FSdvTBjLwp4E-cDCLX1ktTGUWsNj306EpiIsKYvuxtVK9RzM0Ai4LwYF7YLPc34sfmyLfvNMt5Zw',
  registered: true,
  refreshToken: 'APJWN8fQVS_11hY7D-n4mgpGe3YUvDcPoqacizinspbDNryHcUKSpvZFW2y-u9q1qUI3JqukWhF-QuDr_Y838l91VBLpzqU6ypJNODDgW-GWvX_7HYgz2vjY2FMo-gSqRkVCAQi_B99WqLMIN_UFHjHAmtQjllxnaIQdqGiONP8Y61n0AUYEMY9hcRk5aMgP_QZnMHkH1a0aEABQma5SPeWKQbMw9uFDtg',
  expiresIn: '3600'
}
 *
 * 失敗時レスポンスデータ
 * emailがエラーの場合のdataの中身
{
  error: { code: 400, message: 'EMAIL_NOT_FOUND', errors: [ { message: 'EMAIL_NOT_FOUND', domain: 'global', reason: 'invalid' } ] }
}
 * passwordがエラーの場合のdataの中身
{
  error: { code: 400, message: 'INVALID_PASSWORD', errors: [ { message: 'INVALID_PASSWORD', domain: 'global', reason: 'invalid' } ]
}
 */

// type ResData =
//   | {
//       email: string
//     }
//   | {
//       errorCode: number
//       errorMessage: string
//     }

const signIn = async (email: string, password: string) => {
  const signInResult = await fetch(
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
  const signInData = await signInResult.json()
  // console.log('[signInData]', signInData)

  if ('error' in signInData) {
    return {
      errorCode: 3,
      errorMessage: '入力内容に誤りがあります。',
    }
  }

  try {
    const userResult = await fetch(`/api/v0.2/myBooks/user/${email}`)
    // unused-varsでエラーになるため
    // const userData = await userResult.json()
    await userResult.json()

    // unused-varsでエラーになるため
    // const setCookieResult = await fetch('/api/v0.2/myBooks/cookie', {
    await fetch('/api/v0.2/myBooks/cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          name: 'refreshToken',
          refreshToken: signInData.refreshToken,
          path: '/',
          httpOnly: true,
          secure: true,
        },
        {
          name: 'idToken',
          value: signInData.idToken,
          path: '/',
          httpOnly: true,
          secure: true,
        },
      ]),
    })

    // return res.status(200).json({email: data.email})
    // return res.status(200).json(user)
    return { signIn: true }
  } catch (e) {
    // -------------------------------------
    // -------------------------------------
    // firebaseのアカウントもログアウトする必要がある
    // -------------------------------------
    // -------------------------------------

    return {
      errorCode: 2,
      errorMessage: 'ログインに失敗しました。',
    }
  }
}

export default signIn

/**

curl -X POST -H "Content-Type: application/json" -d '{"email": "devkatayama@gmail.com", "password": "uW5dsYRB", returnSecureToken: true}' --dump-header -  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAOxP3W-TZKDqN2l1L9KI0hDVP-ZzAMC5E"

curl -X POST -H "Content-Type: application/json" -d '{"email": "devkatayama@gmail.com", "password": "uW5dsYRB", returnSecureToken: true}' --dump-header -  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOxP3W-TZKDqN2l1L9KI0hDVP-ZzAMC5E"


// express
HTTP/1.1 200 OK
X-Powered-By: Express
Set-Cookie: jwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZ2Vob2dlQGZ1Z2EuY29tIiwiaWF0IjoxNjgxODMxNjAzLCJleHAiOjE2ODE5MTgwMDN9.xAMYuHXd5UIiiMcGQKkhf_lpLXcdknXHPwlNzfp8Y7M; Path=/; HttpOnly; Secure
Set-Cookie: hoge=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZ2Vob2dlQGZ1Z2EuY29tIiwiaWF0IjoxNjgxODMxNjAzLCJleHAiOjE2ODE5MTgwMDN9.xAMYuHXd5UIiiMcGQKkhf_lpLXcdknXHPwlNzfp8Y7M; Path=/; HttpOnly; Secure
Content-Type: application/json; charset=utf-8
Content-Length: 167
ETag: W/"a7-Sp+4Az8yXTu9qpEbHs7gIpVtT1I"
Date: Tue, 18 Apr 2023 15:26:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5

 */
