export const memoDataUrl = process.env.NODE_ENV === 'development' ?
  process.env.REACT_APP_FIREBASE_DATABASE_URL + '/development/memoData/current' :
  process.env.REACT_APP_FIREBASE_DATABASE_URL + '/production/memoData/current'

export const isDev = process.env.NODE_ENV === 'development' ? true : false
