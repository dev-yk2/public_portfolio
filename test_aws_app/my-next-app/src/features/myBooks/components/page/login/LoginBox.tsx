import React from 'react'
import styled from 'styled-components'

import ButtonBasic from '../../button/ButtonBasic'
import styles from '@/features/myBooks/const/styles'

type Props = {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  sendData: () => Promise<void>
  errorMessage: null | string
  boxName: string
  buttonName: string
}

const LoginBox: React.FC<Props> = (props) => {
  return (
    <StyledDiv>
      <p className="box_title">{props.boxName}</p>
      <dl>
        <dt>Email</dt>
        <dd>
          <input
            type="email"
            value={props.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.setEmail(e.target.value)
            }}
          />
        </dd>
      </dl>
      <dl>
        <dt>パスワード</dt>
        <dd>
          <input
            type="password"
            value={props.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.setPassword(e.target.value)
            }}
          />
        </dd>
      </dl>
      {props.errorMessage ? (
        <p className="error_message">{props.errorMessage}</p>
      ) : null}
      <div className="button_wrap">
        <ButtonBasic
          styles={
            {
              // 'background-color': `${styles['--color-button-default']}`,
            }
          }
          onClick={props.sendData}
        >
          {props.buttonName}
        </ButtonBasic>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  margin: 1em;
  padding: 1.2em;
  border: 1px solid ${styles['--color-border-default']};
  transition: border 0.3s;
  &:hover {
    border-color: ${styles['--color-border-accent']};
  }

  input {
    width: 14em;
    border: 1px solid ${styles['--color-border-default']};
    background-color: ${styles['--color-background-sub']};
    @media screen and (max-width: ${styles['--break-point']}px) {
      font-size: 16px;
    }
  }

  .box_title {
    text-align: center;
    font-size: 1.1em;
    font-weight: bold;
  }
  dl {
    margin-top: 0.8em;
    & ~ dl {
      margin-top: 0.5em;
    }
  }
  .error_message {
    margin-top: 1em;
    margin-bottom: -0.8em;
    color: ${styles['--color-font-error']};
    font-size: 0.9em;
    text-align: center;
  }
  .button_wrap {
    display: flex;
    justify-content: center;
    margin-top: 1.2em;
  }
`

export default LoginBox
