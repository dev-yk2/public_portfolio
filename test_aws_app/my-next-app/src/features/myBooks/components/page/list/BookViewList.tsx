import React, { useContext } from 'react'
import styled from 'styled-components'

import styles from '../../../const/styles'
import type * as Types from '../../../types'

import ImageBasic from '../../image/ImageBasic'
import LinkBasic from '../../link/LinkBasic'
import TagBasic from '../../tag/TagBasic'

import { UserContext } from '@/features/myBooks/context/UserContext'

type Props = {
  bookList: Types.BookItem[]
}

const BookViewList: React.FC<Props> = (props) => {
  // console.log(props.bookList)
  const { state } = useContext(UserContext)
  return (
    <StyledDiv>
      {props.bookList.map((bookItem, index) => {
        if (!bookItem.displayFlag) return null
        return (
          <div className="book_item" key={index}>
            <div className="data_wrap">
              <div className="img_wrap">
                <ImageBasic
                  src={bookItem.imageUrl}
                  alt={bookItem.title}
                  // styles={{
                  //   'width': '100% !important;',
                  // }}
                />
              </div>
              <div className="detail_wrap">
                <div>
                  <div className="title_wrap">
                    <LinkBasic
                      key={index}
                      styles={{
                        // 'color': `${styles['--color-font-accent']}`,
                        'text-decoration': 'underline',
                      }}
                      hoverStyles={{
                        color: `${styles['--color-font-accent']}`,
                      }}
                      href={{
                        pathname: `/myBooks/${state.userId}/${bookItem.isbn}`,
                      }}
                    >
                      {bookItem.title}
                    </LinkBasic>

                    <span className="publisher">（{bookItem.publisher}）</span>
                  </div>
                  <div className="authors">
                    {bookItem.authors.map((author, index) => (
                      <div key={index}>{author}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="tag_wrap">
              {bookItem.tags.map((tag, index) => {
                return <TagBasic key={index} id={tag.id} name={tag.name} />
              })}
            </div>
          </div>
        )
      })}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  .book_item {
    --width-image: 70px;
    --width-tags: 150px;
    display: flex;
    flex-flow: wrap row;
    justify-content: space-between;
    align-items: center;
    padding: 0.6em;
    @media screen and (max-width: ${styles['--break-point']}px) {
    }
    &:not(:first-child) {
      border-top: 1px solid ${styles['--color-border-default']};
    }
    .data_wrap {
      display: flex;
      justify-content: space-between;
      width: calc(100% - var(--width-tags));
      @media screen and (max-width: ${styles['--break-point']}px) {
        width: 100%;
      }
    }
    .img_wrap {
      position: relative;
      display: flex;
      /* justify-content: center; */
      align-items: center;
      /* text-align: center; */
      /* width: auto !important; */
      /* height: 50px !important; */
      /* min-height: 60px !important; */
      width: var(--width-image);
      /* height: 70px !important; */
      img {
        /* object-fit: contain; */
        /* position: relative !important; */
        /* background: url('https://placehold.jp/120/aaaaaa/ffffff/500x720.jpg?text=No%0AImage') no-repeat center center/100% auto; */
        /* width: 100%; */
      }
    }
    .detail_wrap {
      display: flex;
      align-items: center;
      padding: 0 1em;
      width: calc(100% - var(--width-image));
    }
    .title_wrap {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      font-size: 1.2em;
      line-height: 1.5;
      font-weight: bold;
      /* & * {
        display: inline;
      } */
      .publisher {
        display: inline-block;
        color: ${styles['--color-font-sub']};
        font-size: 0.8em;
        font-weight: normal;
      }
    }
    .authors {
      display: flex;
      margin-top: 0.2em;
      font-size: 0.9em;
      & > div {
        &:not(:first-child) {
          margin-left: 0.4em;
        }
      }
    }
    .tag_wrap {
      display: flex;
      flex-wrap: wrap;
      width: var(--width-tags);
      @media screen and (max-width: ${styles['--break-point']}px) {
        margin-top: 0.5em;
        width: 100%;
      }
    }
  }
`

export default BookViewList
