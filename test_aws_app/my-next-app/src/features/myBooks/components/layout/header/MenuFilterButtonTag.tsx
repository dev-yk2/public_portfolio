import React, { useState } from 'react'
import styled from 'styled-components'
import styles from '../../../const/styles'

import type * as Types from '../../../types'

type Props = {
  tag: Types.TagItem
  onClick: (tagId: number) => void
}

const ButtonTag: React.FC<Props> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <StyledButton
      className={isActive ? 'active' : undefined}
      displayFlag={props.tag.displayFlag}
      onClick={() => {
        props.onClick(props.tag.id)
        setIsActive((prevState) => !prevState)
      }}
    >
      {props.tag.name}
    </StyledButton>
  )
}

type StyleProps = {
  displayFlag: boolean
}

const StyledButton = styled.button<StyleProps>`
  margin: 0.2em;
  padding: 0.2em 0.6em 0.1em;
  border: 1px solid ${styles['--color-border-default']};
  border-radius: 0.4em;
  background-color: ${styles['--color-background-default']};
  white-space: nowrap;
  font-size: 1em;
  &.active {
    background-color: ${styles['--color-background-accent']};
  }
`

export default ButtonTag
