import React from 'react'
import styled from 'styled-components'

import styles from '../../const/styles'

type Props = {
  id: number
  name: string
}

const TagBasic: React.FC<Props> = (props) => {
  return <StyledDiv>{props.name}</StyledDiv>
}

const StyledDiv = styled.div`
  margin: 0.2em;
  padding: 0.2em 0.4em 0.1em;
  border: 1px solid ${styles['--color-border-default']};
  border-radius: 0.6em;
  background-color: ${styles['--color-background-sub']};
  font-size: 0.8em;
`

export default TagBasic
