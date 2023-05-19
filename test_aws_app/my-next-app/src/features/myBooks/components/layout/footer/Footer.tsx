import { useRouter } from 'next/router'

import SvgIconAdd from 'public/image/svg/icon_add.svg'
import SvgIconMore from 'public/image/svg/icon_more.svg'
import SvgIconTag from 'public/image/svg/icon_tag.svg'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import styles from '../../../const/styles'
import SvgWrapper from '@/features/myBooks/components/image/SvgWrapper'
import LinkBasic from '@/features/myBooks/components/link/LinkBasic'

import { UserContext } from '@/features/myBooks/context/UserContext'

const Footer: React.FC = () => {
  const { state } = useContext(UserContext)
  const router = useRouter()

  const refOtherMenuWrap = useRef(null)
  const refOtherMenu = useRef(null)
  const [otherMenuState, setOtherMenuState] = useState<boolean>(false)
  const toggleOtherMenu = useCallback(() => {
    setOtherMenuState((prevState) => !prevState)
    // eslint-disable-next-line
  }, [otherMenuState])

  useEffect(() => {
    const documentClickHandler = (e: MouseEvent) => {
      if (!refOtherMenuWrap.current) return
      const otherMenuWrapEle = refOtherMenuWrap.current as HTMLDivElement
      const targetEle = e.target as Node // containsの引数にできるよう、無理矢理Node型にしている

      // 特定の領域外をクリックしたらトグルメニューを閉じる
      if (!otherMenuWrapEle.contains(targetEle)) {
        setOtherMenuState(false)
      }
    }
    document.addEventListener('click', documentClickHandler, false)

    return () => {
      document.removeEventListener('click', documentClickHandler)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (refOtherMenu.current === null) return
    const otherMenu = refOtherMenu.current as HTMLDivElement
    const otherMenuHeight = otherMenu.scrollHeight
    if (otherMenuState) {
      otherMenu.style.height = `${otherMenuHeight}px`
    } else {
      otherMenu.style.height = `0px`
    }
  }, [otherMenuState])

  return (
    <StyledFooter>
      <LinkBasic
        styles={{
          display: 'flex',
          'align-items': 'center',
        }}
        href={{
          pathname: `/myBooks/${state.userId}/register`,
        }}
      >
        <SvgWrapper
          styles={{
            'margin-right': '0.3em',
            width: '1.6em',
            height: '1.6em',
          }}
        >
          <SvgIconAdd fill={styles['--color-font-default']} />
        </SvgWrapper>
        新規登録
      </LinkBasic>

      <LinkBasic
        styles={{
          display: 'flex',
          'align-items': 'center',
        }}
        href={{
          pathname: `/myBooks/${state.userId}/tags`,
        }}
      >
        <SvgWrapper
          styles={{
            'margin-right': '0.3em',
            width: '1.6em',
            height: '1.6em',
          }}
        >
          <SvgIconTag fill={styles['--color-font-default']} />
        </SvgWrapper>
        タグ管理
      </LinkBasic>

      <div className="other_menu_wrap" ref={refOtherMenuWrap}>
        <button onClick={toggleOtherMenu}>
          <SvgWrapper
            styles={{
              'margin-right': '0.3em',
              width: '1.6em',
              height: '1.6em',
            }}
          >
            <SvgIconMore fill={styles['--color-font-default']} />
          </SvgWrapper>
          その他
        </button>
        <div className="other_menu" ref={refOtherMenu}>
          <div className="other_menu_inner_pd">
            <div className="other_menu_inner_bdr">
              <div className="other_menu_inner_bg">
                <ul>
                  <li>
                    <button
                      onClick={async () => {
                        const res = await fetch(`/api/v0.2/auth/signOut`)
                        const data = await res.json()
                        window.alert(data.message)
                        router.replace(`/myBooks/login`)
                      }}
                    >
                      ログアウト
                    </button>
                  </li>
                  <li>
                    <button
                      className="delete_account"
                      onClick={async () => {
                        const confirm = window.confirm(
                          `アカウントを削除すると本のデータも全て削除されます。\nこの操作を取り消すことはできません。\nアカウントを削除しますか？`,
                        )
                        if (!confirm) return
                        const res = await fetch(`/api/v0.2/auth/deleteAccount`)
                        const data = await res.json()
                        window.alert(data.message)
                        router.replace(`/myBooks/login`)
                      }}
                    >
                      アカウント削除
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <LinkBasic
        styles={{
          'display': 'flex',
          'align-items': 'center',
        }}
        href={{
          pathname: `/myBookshelf/logout`
        }}
      >
        <SvgWrapper
          styles={{
            'margin-right': '0.3em',
            'width': '1.6em',
            'height': '1.6em',
          }}
        >
          <SvgIconMore
            fill={styles['--color-font-default']}
          />
        </SvgWrapper>
        その他
      </LinkBasic> */}
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .other_menu_wrap {
    position: relative;
    button {
      display: flex;
      align-items: center;
    }
    .other_menu {
      z-index: 1;
      position: absolute;
      right: 10%;
      bottom: 100%;
      overflow: hidden;
      height: 0;
      transition: height 0.2s;

      .other_menu_inner_pd {
        padding-top: 1em;
      }
      .other_menu_inner_bdr {
        position: relative;
        border: 1px solid ${styles['--color-border-default']};
        &::before {
          content: '';
          position: absolute;
          right: 1em;
          bottom: -0.7em;
          display: block;
          width: 1.4em;
          height: 1.4em;
          border: 1px solid ${styles['--color-border-default']};
          background-color: ${styles['--color-background-sub']};
          transform: rotate(45deg);
        }
      }
      .other_menu_inner_bg {
        position: relative;
        padding: 0.6em;
        background-color: ${styles['--color-background-sub']};
        ul {
          & > li {
            white-space: nowrap;
            &:not(:first-child) {
              margin-top: 0.2em;
            }
            button {
              display: block;
              width: 100%;
              transition: color 0.2s;
              &:hover {
                color: ${styles['--color-font-accent']};
              }
              &.delete_account {
                @media screen and (max-width: ${styles['--break-point']}px) {
                  color: ${styles['--color-font-error']};
                }
                &:hover {
                  color: ${styles['--color-font-error']};
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Footer
