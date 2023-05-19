/**
 * IDトークンを渡してユーザーデータを取得する
 * @param idToken
 * @returns
 *
 * データ取得成功時
{
  kind: 'identitytoolkit#GetAccountInfoResponse',
  users: [
    {
      localId: 'RfozsCYz6wTFn7a8B51Z4LRPVF73',
      email: 'devkatayama@gmail.com',
      passwordHash: 'UkVEQUNURUQ=',
      emailVerified: true,
      passwordUpdatedAt: 1681816847843,
      providerUserInfo: [Array],
      validSince: '1681816847',
      lastLoginAt: '1681962230069',
      createdAt: '1668860501704',
      lastRefreshAt: '2023-04-20T03:43:50.069Z'
    }
  ]
}
 */
const getUserData = async (idToken: string) => {
  return await fetch(
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
}

export default getUserData
