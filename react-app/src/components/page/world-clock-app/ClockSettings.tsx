import Styled from 'styled-components'
import { useContext } from 'react'

// コンポーネント
import { ClockContext } from './ClockContext'

type Props = {
  refreshInterval: number | null
  onIntervalChange?: (interval: number | null) => void
}

export const ClockSettings: React.FC<Props> = ({ refreshInterval, onIntervalChange }) => {
  const { updates, now } = useContext(ClockContext)

  return (
    <StyledDiv>
      Updated {updates} times / {now.format('HH:mm:ss')} / Interval:
      <select
        value={refreshInterval ?? ''}
        onChange={(e) => {
          const value = e.target.value === '' ? null : Number(e.target.value)
          const interval = Number.isNaN(value) ? null : value

          onIntervalChange && onIntervalChange(interval)
        }}>
        <option value="">stop timer</option>
        <option value="100">100 msec</option>
        <option value="500">500 msec</option>
        <option value="1000">1 sec</option>
        <option value="5000">5 sec</option>
      </select>
    </StyledDiv>
  )
}

const StyledDiv = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px 0;
  letter-spacing: 0.5px;
  font-size: 80%;

  select {
    margin-left: 5px;
    border: 1px solid var(--root-font-color-main);
    appearance: auto;
  }
`
