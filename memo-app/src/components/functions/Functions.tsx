import React, { useEffect } from 'react'

const Functions: React.FC = () => {

  // cssカスタムプロパティをセット
  const setCustomPropaty = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    document.documentElement.style.setProperty('--vw', width / 100 + 'px')
    document.documentElement.style.setProperty('--vh', height / 100 + 'px')
  }
  useEffect(() => {
    setCustomPropaty()
    window.addEventListener('resize', setCustomPropaty, false)
    return () => window.removeEventListener('resize', setCustomPropaty)
  }, [])

  return null
}

export default Functions
