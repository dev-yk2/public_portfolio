import Styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { siteConfig } from '../../config/siteConfig'

const Home = () => {

  return (
    <StyledDiv>
      <h1 className="siteTitle">ポートフォリオサイト</h1>

      <div className="pageLink">
        {siteConfig.pages.map((v, i) => {
          if (!v.homeNavi) return null
          return (
            <NavLink
              to={v.path}
              key={i}
            >
              <div className="inner">
                <p className="pageTitle">{v.title}</p>
                <p className="pageDescription">{v.description}</p>
              </div>
            </NavLink>
          )
        })}
      </div>
    </StyledDiv>
  )
}

export default Home

const StyledDiv = Styled.div`
  margin: 0 auto;
  padding: 0 30px;
  width: 100%;
  max-width: 860px;
  height: 100%;
  .siteTitle {
    padding: 2em 0;
    font-size: 20px;
    text-align: center;
  }
  .pageLink {
    display: flex;
    justify-content: center;
    a {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 31%;
      overflow: hidden;
      border: 1px solid var(--root-bdr-color-main);
      border-radius: 0.8em;
      transition: all 1s;
      &:not(:nth-child(3n + 1)) {
        margin-left: 3.5%;
      }
      &:nth-child(n + 4) {
        margin-top: 3.5%;
      }
      &:hover {
        border-color: transparent;
        &::before {
          animation: rotate 6s linear 0s infinite;
        }
        &::after {
          background-color: var(--root-bg-color-dark);
        }
      }
      .inner {
        padding: 0.6em 1em;
        width: 100%;
        height: 100%;
      }
      .pageTitle {
        width: 100%;
        color: var(--root-font-color-accent);
        font-size: 1.1em;
        text-align: center;
      }
      .pageDescription {
        margin-top: 0.6em;
        width: 100%;
        color: var(--root-font-color-sub);
        font-size: 0.9em;
      }
      &::before,
      &::after {
        content: "";
        z-index: -1;
        position: absolute;
        display: block;
      }
      &::before {
        width: 200%;
        height: 500%;
        background: conic-gradient(#ffffff80,#ffffff40,#ffffff30,#ffffff20,#ffffff10,#ffffff10,#ffffff80);
        /* animation: rotate 6s linear 0s infinite; */
        transition: all 1s;
        @keyframes rotate {
          0% {transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
      }
      &::after {
        background-color: var(--root-bg-color-main);
        border-radius: inherit;
        inset: 0;
        padding: 1px;
        background-clip: content-box;
        transition: all 1s;
      }
    }
  }
`
