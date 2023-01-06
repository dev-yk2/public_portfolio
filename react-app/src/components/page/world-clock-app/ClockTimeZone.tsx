import Styled from 'styled-components'
import React from 'react'

export const ClockTimeZone: React.FC<{
  timeZoneList: {
    title: string;
    timeZone: string;
    select: boolean;
  }[]
  selectTimeZone: (index: number) => void
}> = ({ timeZoneList, selectTimeZone }) => {
  return (
    <StyledDiv>
      <div className="timeZoneList">
        {timeZoneList.map((item, index) => {
          const isDisabled = item.select ? '' : 'disabled'
          return (
            <button
              key={index}
              className={isDisabled}
              onClick={() => {selectTimeZone(index)}}
            >
              {item.title}
            </button>
          )
        })}
      </div>
    </StyledDiv>
  )
}

const StyledDiv = Styled.div`
  padding: 1em;
  width: 100%;
  height: 210px;
  overflow: auto;
  border: 1px solid var(--root-bdr-color-main);
  background-color: var(--root-bg-color-dark);
  .timeZoneList {
    button {
      margin: 0.4em;
      padding: 0.2em 0.8em;
      background-color: var(--root-bg-color-dark);
      border: 1px solid var(--root-bdr-color-main);
      border-radius: 0.4em;
      font-size: 0.8em;
      font-weight: bold;
      transition: all 0.3s;
      &:hover {
        background-color: var(--root-bg-color-light);
        color: var(--root-font-color-accent);
      }
      &.disabled {
        pointer-events: none;
        opacity: 0.4;
      }
    }
  }
`
