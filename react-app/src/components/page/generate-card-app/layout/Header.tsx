import React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
}

const Header: React.FC<Props> = (props) => {
  return (
    <StyledHeader>
      <div className="logo">
        {props.title}
      </div>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  height: var(--root-header-height);
  .logo {
    padding: 0.2em 0.6em;
    background-color: var(--root-bg-color-dark);
    border: 1px solid var(--root-bdr-color-main);
    border-radius: 0.4em;
    font-size: 0.9em;
  }
`
