// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

import styles from '@/features/myBooks/const/styles'

import UserContextProvider from '@/features/myBooks/context/UserContext'

const GlobalStyle = createGlobalStyle`
/*! destyle.css v4.0.0 | MIT License | https://github.com/nicolas-cusan/destyle.min.css */
*,::before,::after{box-sizing:border-box;border-style:solid;border-width:0}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}body{margin:0}main{display:block}p,table,blockquote,address,pre,iframe,form,figure,dl{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;margin:0}ul,ol{margin:0;padding:0;list-style:none}/* dt{font-weight:700} */dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border-top-width:1px;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:transparent;text-decoration:none;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}svg,img,embed,object,iframe{vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;background:transparent;padding:0;margin:0;border-radius:0;text-align:inherit;text-transform:inherit}button,[type="button"],[type="reset"],[type="submit"]{cursor:pointer}button:disabled,[type="button"]:disabled,[type="reset"]:disabled,[type="submit"]:disabled{cursor:default}:-moz-focusring{outline:auto}select:disabled{opacity:inherit}option{padding:0}fieldset{margin:0;padding:0;min-width:0}legend{padding:0}progress{vertical-align:baseline}textarea{overflow:auto}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type="number"]{-moz-appearance:textfield;appearance:textfield}label[for]{cursor:pointer}details{display:block}summary{display:list-item}[contenteditable]:focus{outline:auto}table{border-color:inherit;border-collapse:collapse}caption{text-align:left}td,th{vertical-align:top;padding:0}th{text-align:left;font-weight:700}
/* user add */
*:focus-visible {
  outline: none;
}

/* variables */
/* :root {
  --color-background-default: #0d1117;
  --color-background-sub: #161b22;
  --color-font-default: #c9d1d9;
  --color-font-sub: #7a8490;
  --color-border-default: #30363d;

  --size-font-default: 16px;

  --height-menu-default: 60px
} */

/* basic */
body {
  height: calc(var(--vh)*100);
  /* background-color: var(--color-background-default); */
  background-color: ${styles['--color-background-default']};
  font-family: "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", sans-serif;
  color: ${styles['--color-font-default']};
  font-size: ${styles['--size-font-default']};
  line-height: 1.6;
  @media screen and (max-width: ${styles['--break-point']}px) {
    font-size: ${styles['--size-font-default-sp']};
   }
}
#__next {
  height: 100%;
}
`

const MyApp = ({ Component, pageProps }: AppProps) => {
  // cssカスタムプロパティをセット
  useEffect(() => {
    const setCustomPropaty = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      document.documentElement.style.setProperty('--vw', width / 100 + 'px')
      document.documentElement.style.setProperty('--vh', height / 100 + 'px')
    }
    setCustomPropaty()
    window.addEventListener('resize', setCustomPropaty, false)
    return () => window.removeEventListener('resize', setCustomPropaty)
  }, [])

  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=5"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
      </Head>
      <GlobalStyle />
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  )
}

export default MyApp
