import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styled from 'styled-components'
import styles from '../../../const/styles'
import type * as Types from '../../../types'

import ImageBasic from '../../image/ImageBasic'

import { UserContext } from '@/features/myBooks/context/UserContext'

type Props = {
  bookList: Types.BookItem[]
}

const BookViewGrid: React.FC<Props> = (props) => {
  const { state } = useContext(UserContext)

  const router = useRouter()
  return (
    <StyledDiv>
      {props.bookList.map((bookItem, index) => {
        if (!bookItem.displayFlag) return null
        return (
          <div
            key={index}
            className="grid_item"
            onClick={() => {
              router.push(`/myBooks/${state.userId}/${bookItem.isbn}`)
            }}
          >
            <ImageBasic
              src={bookItem.imageUrl}
              alt={bookItem.title}
              // styles={{
              //   'width': '100% !important;',
              // }}
            />
            {!bookItem.imageFlag ? (
              <div className="book_data">
                <p className="book_title">{bookItem.title}</p>
                <p className="book_authors">
                  {bookItem.authors.map((author, i) => {
                    return <span key={i}>{author}</span>
                  })}
                </p>
              </div>
            ) : null}
          </div>
        )
      })}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em 0;
  .grid_item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18%;
    cursor: pointer;
    @media screen and (max-width: ${styles['--break-point']}px) {
      width: 23.5%;
      font-size: 2.8vw;
    }
    @media screen and (min-width: ${styles['--break-point'] + 1}px) {
      &:not(:nth-child(5n + 1)) {
        margin-left: 2.5%;
      }
    }
    @media screen and (max-width: ${styles['--break-point']}px) {
      &:not(:nth-child(4n + 1)) {
        margin-left: 2%;
      }
    }
    @media screen and (min-width: ${styles['--break-point'] + 1}px) {
      &:nth-child(n + 6) {
        margin-top: 2.5%;
      }
    }
    @media screen and (max-width: ${styles['--break-point']}px) {
      &:nth-child(n + 5) {
        margin-top: 2%;
      }
    }
    .book_data {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0.2em;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      text-align: center;
      line-height: 1.4;
      .book_title {
        font-size: 1.1em;
        font-weight: bold;
      }
      .book_authors {
        margin-top: 0.4em;
        font-size: 0.9em;
        span {
          &:not(:first-child) {
            margin-left: 0.4em;
          }
        }
      }
    }
  }
`

export default BookViewGrid
