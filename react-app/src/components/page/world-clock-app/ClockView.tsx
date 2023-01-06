import Styled from 'styled-components'
import React from 'react'

export const ClockView: React.FC<{
  title: string
  day: string
  hours: number
  time: string
  index: number
  removeTimeZone: (index: number) => void
}> = React.memo(({ title, day, hours, time, index, removeTimeZone }) => {

  return (
    <StyledDiv>
      <button
        className="remove"
        onClick={() => {removeTimeZone(index)}}
      ></button>
      <div className="data">
        <p className="diff">
          {day}、{hours >= 0 && '+'}{hours}時間
        </p>
        <p className="title">{title}</p>
      </div>
      <p className="time">{time}</p>
    </StyledDiv>
  )
})

const StyledDiv = Styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0.6em;
  padding: 0.8em 1em;
  background-color: var(--root-bg-color-dark);
  border: 1px solid var(--root-bdr-color-main);
  border-radius: 0.4em;
  .remove {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(30%,-30%);
    width: 1em;
    height: 1em;
    background-color: #666;
    border-radius: 50%;
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 15%;
      top: 50%;
      display: block;
      width: 70%;
      height: 1px;
      background-color: var(--root-font-color-main);
    }
    &::before {
      transform: translateY(-50%) rotate(45deg);
    }
    &::after {
      transform: translateY(-50%) rotate(-45deg);
    }
  }
  .data {
    display: flex;
    flex-direction: column;
    font-size: 100%;
    .diff {
      color: #929799;
      font-size: 0.75em;
    }
    .title {
      margin-top: 0.2em;
      font-size: 1em;
    }
  }
  .time {
    margin-left: 0.6em;
    font-size: 1.8em;
    line-height: 1.1;
  }

`
