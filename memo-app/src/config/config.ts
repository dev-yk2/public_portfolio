export const memoDataUrl = process.env.NODE_ENV === 'development' ?
  process.env.REACT_APP_FIREBASE_DATABASEURL + '/development/memoData/current' :
  process.env.REACT_APP_FIREBASE_DATABASEURL + '/production/memoData/current'

export const isDev = process.env.NODE_ENV === 'development' ? true : false
