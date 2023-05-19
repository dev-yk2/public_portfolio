/**
 * idTokenの有効期限切れの際に、refreshTokenを渡して新たなidTokenを取得する。
 * @param refreshToken headerのSet-Cookieに格納しているrefreshTokenを引数に渡す
 * @returns
 *
 * fetchが成功したときに取得できる値
{
  access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVtby1hcHAyLTRiZGUzIiwiYXVkIjoibWVtby1hcHAyLTRiZGUzIiwiYXV0aF90aW1lIjoxNjgxOTIyNjgzLCJ1c2VyX2lkIjoiUmZvenNDWXo2d1RGbjdhOEI1MVo0TFJQVkY3MyIsInN1YiI6IlJmb3pzQ1l6NndURm43YThCNTFaNExSUFZGNzMiLCJpYXQiOjE2ODE5Mzc5NTIsImV4cCI6MTY4MTk0MTU1MiwiZW1haWwiOiJkZXZrYXRheWFtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZXZrYXRheWFtYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.aokKnjui1YhvhMe5CqOY3ceXPbkIvjv9L7vpted6rYjhREp80E06BeCIo9c-5QAnA-zCeu78pGlIZrBm8OxfqdjAv8f8j_D8eaWOiRWBkTlJFtrGVbW85I4SWV1eqByCsrxmsqdgCAdE2QAzfx5rgwzjDHmHJWODYxCollEdNsCmefa5AdHYZoj6-fe0rqM_Z8p0X-b6jd8XeS2NhSeAsfjiz653uIMTMSSgSm3GZbwCO7JA_dtV9pHU4nrHMyWRanaGcA8QIQseE8o9nuUYC3BVsphRHYj8JEQMpcq8Eoo3WtO3romd2O8g6q34HIIIxCyRxj6wWX0m151hEHf6tg',
  expires_in: '3600',
  token_type: 'Bearer',
  refresh_token: 'APJWN8fQVS_11hY7D-n4mgpGe3YUvDcPoqacizinspbDNryHcUKSpvZFW2y-u9q1qUI3JqukWhF-QuDr_Y838l91VBLpzqU6ypJNODDgW-GWvX_7HYgz2vjY2FMo-gSqRkVCAQi_B99WqLMIN_UFHjHAmtQjllxnaIQdqGiONP8Y61n0AUYEMY9hcRk5aMgP_QZnMHkH1a0aEABQma5SPeWKQbMw9uFDtg',
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVtby1hcHAyLTRiZGUzIiwiYXVkIjoibWVtby1hcHAyLTRiZGUzIiwiYXV0aF90aW1lIjoxNjgxOTIyNjgzLCJ1c2VyX2lkIjoiUmZvenNDWXo2d1RGbjdhOEI1MVo0TFJQVkY3MyIsInN1YiI6IlJmb3pzQ1l6NndURm43YThCNTFaNExSUFZGNzMiLCJpYXQiOjE2ODE5Mzc5NTIsImV4cCI6MTY4MTk0MTU1MiwiZW1haWwiOiJkZXZrYXRheWFtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZXZrYXRheWFtYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.aokKnjui1YhvhMe5CqOY3ceXPbkIvjv9L7vpted6rYjhREp80E06BeCIo9c-5QAnA-zCeu78pGlIZrBm8OxfqdjAv8f8j_D8eaWOiRWBkTlJFtrGVbW85I4SWV1eqByCsrxmsqdgCAdE2QAzfx5rgwzjDHmHJWODYxCollEdNsCmefa5AdHYZoj6-fe0rqM_Z8p0X-b6jd8XeS2NhSeAsfjiz653uIMTMSSgSm3GZbwCO7JA_dtV9pHU4nrHMyWRanaGcA8QIQseE8o9nuUYC3BVsphRHYj8JEQMpcq8Eoo3WtO3romd2O8g6q34HIIIxCyRxj6wWX0m151hEHf6tg',
  user_id: 'RfozsCYz6wTFn7a8B51Z4LRPVF73',
  project_id: '414131414321'
}
 */
const getIdToken = async (refreshToken: string) => {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)
  return await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    },
  )
}

// const getIdToken = async (refreshToken: string) => {
//   return await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       grant_type: 'refresh_token',
//       refresh_token: refreshToken,
//     })
//   })
// }

export default getIdToken
