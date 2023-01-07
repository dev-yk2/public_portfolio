import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { siteConfig } from '../config/siteConfig'

const Navi: React.FC = React.memo(() => {
  return (
    <StyledUl>
      {siteConfig.pages.map((v, i) => {
        if (!v.menuNavi) return null
        return (
          <li key={i}>
            <NavLink to={v.path}>{v.title}</NavLink>
          </li>
        )
      })}
    </StyledUl>
  )
})

export default Navi

const StyledUl = styled.ul`
  & > li {
    border-top: 1px solid var(--root-bdr-color-main);
    border-left: 1px solid var(--root-bdr-color-main);
    border-right: 1px solid var(--root-bdr-color-main);
    &:last-child {
      border-bottom: 1px solid var(--root-bdr-color-main);
    }
    a {
      display: block;
      padding: 0.4em 1em;
      white-space: nowrap;
    }
  }
`
