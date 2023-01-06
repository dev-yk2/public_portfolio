import Styled from 'styled-components'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'

import { useContext } from 'react'
import { ClockContext } from './ClockContext'
import { ClockView } from './ClockView'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isYesterday)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export const ClockLogic: React.FC<{
  timeZoneList: {
    title: string
    timeZone: string
    // select: boolean
  }[]
  removeTimeZone: (index: number) => void
}> = ({ timeZoneList, removeTimeZone }) => {

  const { now, localTimeZone } = useContext(ClockContext)

  return (
    <StyledDiv>
      {timeZoneList.map((item, index) => {
        const tzNow = now.tz(item.timeZone)
        const tzLocalNow = tzNow.tz(localTimeZone, true)
        const day = tzLocalNow.isYesterday()
          ? '昨日' : tzLocalNow.isToday()
          ? '今日' : tzLocalNow.isTomorrow()
          ? '明日' : ''
        const hours = tzLocalNow.diff(now, 'hour')
        const time = tzNow.format('H:mm')

        return (
          <ClockView
            title={item.title}
            day={day}
            hours={hours}
            time={time}
            key={index}
            index={index}
            removeTimeZone={removeTimeZone}
          />
        )
      })}
    </StyledDiv>
  )
}

const StyledDiv = Styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1em;
`
