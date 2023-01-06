import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Navi: React.FC = React.memo(() => {
  const naviList = [
    {to: '/', name: 'Home'},
    {to: '/world-clock-app/', name: 'WorldClockApp'},
    {to: '/memo-app/', name: 'MemoApp'},
    {to: '/generate-card-app/', name: 'GenerateCardApp'},
  ]
  return (
    <StyledUl>
      {naviList.map((v, i) => {
        return (
          <li key={i}>
            <NavLink to={v.to}>{v.name}</NavLink>
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
    }
  }
`
