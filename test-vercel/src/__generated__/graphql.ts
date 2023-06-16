/* eslint-disable no-unused-vars */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: Date; output: Date }
}

export type Book = {
  __typename?: 'Book'
  authors: Array<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  isbn: Scalars['String']['output']
  memo: Scalars['String']['output']
  publisher: Scalars['String']['output']
  tags: Array<Maybe<Tag>>
  title: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
  userId: Scalars['String']['output']
}

export type CreateBookInput = {
  authors: Array<Scalars['String']['input']>
  isbn: Scalars['String']['input']
  memo: Scalars['String']['input']
  publisher: Scalars['String']['input']
  tags: Array<InputMaybe<TagInput>>
  title: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type CreateBookResponse = {
  __typename?: 'CreateBookResponse'
  book: Book
}

export type CreateTagInput = {
  name: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type CreateTagResponse = {
  __typename?: 'CreateTagResponse'
  tag: Tag
}

export type CreateUserInput = {
  email: Scalars['String']['input']
  firebaseAuthId: Scalars['String']['input']
}

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse'
  user: User
}

export type DeleteBook = {
  __typename?: 'DeleteBook'
  authors: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  isbn: Scalars['String']['output']
  publisher: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type DeleteBookInput = {
  id: Scalars['String']['input']
}

export type DeleteBookResponse = {
  __typename?: 'DeleteBookResponse'
  book: DeleteBook
}

export type DeleteTagInput = {
  id: Scalars['String']['input']
}

export type DeleteTagResponse = {
  __typename?: 'DeleteTagResponse'
  tag: Tag
}

export type DeleteUserInput = {
  firebaseAuthId: Scalars['String']['input']
}

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse'
  user: User
}

export type GetBookInput = {
  isbn: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type GetBookResponse = {
  __typename?: 'GetBookResponse'
  book: Book
}

export type GetBooksInput = {
  userId: Scalars['String']['input']
}

export type GetBooksResponse = {
  __typename?: 'GetBooksResponse'
  books: Array<Maybe<Book>>
}

export type GetTagInput = {
  id: Scalars['String']['input']
}

export type GetTagResponse = {
  __typename?: 'GetTagResponse'
  tag: Tag
}

export type GetTagsInput = {
  userId: Scalars['String']['input']
}

export type GetTagsResponse = {
  __typename?: 'GetTagsResponse'
  tags: Array<Maybe<Tag>>
}

export type GetUserInput = {
  firebaseAuthId: Scalars['String']['input']
}

export type GetUserResponse = {
  __typename?: 'GetUserResponse'
  user: User
}

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse'
  users: Array<Maybe<User>>
}

export type Mutation = {
  __typename?: 'Mutation'
  createBook: CreateBookResponse
  createTag: CreateTagResponse
  createUser: CreateUserResponse
  deleteBook: DeleteBookResponse
  deleteTag: DeleteTagResponse
  deleteUser: DeleteUserResponse
  updateBook: UpdateBookResponse
  updateTag: UpdateTagResponse
}

export type MutationCreateBookArgs = {
  input: CreateBookInput
}

export type MutationCreateTagArgs = {
  input: CreateTagInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteBookArgs = {
  input: DeleteBookInput
}

export type MutationDeleteTagArgs = {
  input: DeleteTagInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationUpdateBookArgs = {
  input: UpdateBookInput
}

export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

export type Query = {
  __typename?: 'Query'
  getBook: GetBookResponse
  getBooks: GetBooksResponse
  getTag: GetTagResponse
  getTags: GetTagsResponse
  getUser: GetUserResponse
  getUsers: GetUsersResponse
  greet?: Maybe<Scalars['String']['output']>
}

export type QueryGetBookArgs = {
  input: GetBookInput
}

export type QueryGetBooksArgs = {
  input: GetBooksInput
}

export type QueryGetTagArgs = {
  input: GetTagInput
}

export type QueryGetTagsArgs = {
  input: GetTagsInput
}

export type QueryGetUserArgs = {
  input: GetUserInput
}

export type Tag = {
  __typename?: 'Tag'
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  userId: Scalars['String']['output']
}

export type TagInput = {
  id: Scalars['String']['input']
  name: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type UpdateBookInput = {
  authors: Array<Scalars['String']['input']>
  id: Scalars['String']['input']
  isbn: Scalars['String']['input']
  memo: Scalars['String']['input']
  publisher: Scalars['String']['input']
  tags: Array<InputMaybe<TagInput>>
  title: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type UpdateBookResponse = {
  __typename?: 'UpdateBookResponse'
  book: Book
}

export type UpdateTagInput = {
  id: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type UpdateTagResponse = {
  __typename?: 'UpdateTagResponse'
  tag: Tag
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  firebaseAuthId: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type CreateBookMutationVariables = Exact<{
  input: CreateBookInput
}>

export type CreateBookMutation = {
  __typename?: 'Mutation'
  createBook: {
    __typename?: 'CreateBookResponse'
    book: {
      __typename?: 'Book'
      id: string
      isbn: string
      title: string
      authors: Array<string>
      publisher: string
      memo: string
      createdAt: Date
      updatedAt: Date
      userId: string
      tags: Array<{ __typename?: 'Tag'; id: string; name: string; userId: string } | null>
    }
  }
}

export type DeleteBookMutationVariables = Exact<{
  input: DeleteBookInput
}>

export type DeleteBookMutation = {
  __typename?: 'Mutation'
  deleteBook: {
    __typename?: 'DeleteBookResponse'
    book: {
      __typename?: 'DeleteBook'
      id: string
      isbn: string
      title: string
      authors: string
      publisher: string
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type UpdateBookMutationVariables = Exact<{
  input: UpdateBookInput
}>

export type UpdateBookMutation = {
  __typename?: 'Mutation'
  updateBook: {
    __typename?: 'UpdateBookResponse'
    book: {
      __typename?: 'Book'
      id: string
      isbn: string
      title: string
      authors: Array<string>
      publisher: string
      memo: string
      createdAt: Date
      updatedAt: Date
      userId: string
      tags: Array<{ __typename?: 'Tag'; id: string; name: string; userId: string } | null>
    }
  }
}

export type GetBookQueryVariables = Exact<{
  input: GetBookInput
}>

export type GetBookQuery = {
  __typename?: 'Query'
  getBook: {
    __typename?: 'GetBookResponse'
    book: {
      __typename?: 'Book'
      id: string
      isbn: string
      title: string
      authors: Array<string>
      publisher: string
      memo: string
      createdAt: Date
      updatedAt: Date
      userId: string
      tags: Array<{ __typename?: 'Tag'; id: string; name: string; userId: string } | null>
    }
  }
}

export type GetBooksQueryVariables = Exact<{
  input: GetBooksInput
}>

export type GetBooksQuery = {
  __typename?: 'Query'
  getBooks: {
    __typename?: 'GetBooksResponse'
    books: Array<{
      __typename?: 'Book'
      id: string
      isbn: string
      title: string
      authors: Array<string>
      publisher: string
      memo: string
      createdAt: Date
      updatedAt: Date
      userId: string
      tags: Array<{ __typename?: 'Tag'; id: string; name: string; userId: string } | null>
    } | null>
  }
}

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput
}>

export type CreateTagMutation = {
  __typename?: 'Mutation'
  createTag: { __typename?: 'CreateTagResponse'; tag: { __typename?: 'Tag'; id: string; name: string; userId: string } }
}

export type DeleteTagMutationVariables = Exact<{
  input: DeleteTagInput
}>

export type DeleteTagMutation = {
  __typename?: 'Mutation'
  deleteTag: { __typename?: 'DeleteTagResponse'; tag: { __typename?: 'Tag'; id: string; name: string; userId: string } }
}

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput
}>

export type UpdateTagMutation = {
  __typename?: 'Mutation'
  updateTag: { __typename?: 'UpdateTagResponse'; tag: { __typename?: 'Tag'; id: string; name: string; userId: string } }
}

export type GetTagQueryVariables = Exact<{
  input: GetTagInput
}>

export type GetTagQuery = {
  __typename?: 'Query'
  getTag: { __typename?: 'GetTagResponse'; tag: { __typename?: 'Tag'; id: string; name: string; userId: string } }
}

export type GetTagsQueryVariables = Exact<{
  input: GetTagsInput
}>

export type GetTagsQuery = {
  __typename?: 'Query'
  getTags: {
    __typename?: 'GetTagsResponse'
    tags: Array<{ __typename?: 'Tag'; id: string; name: string; userId: string } | null>
  }
}

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'CreateUserResponse'
    user: { __typename?: 'User'; firebaseAuthId: string; email: string; createdAt: Date; updatedAt: Date }
  }
}

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = {
  __typename?: 'Mutation'
  deleteUser: {
    __typename?: 'DeleteUserResponse'
    user: { __typename?: 'User'; firebaseAuthId: string; email: string; createdAt: Date; updatedAt: Date }
  }
}

export type GetUserQueryVariables = Exact<{
  input: GetUserInput
}>

export type GetUserQuery = {
  __typename?: 'Query'
  getUser: {
    __typename?: 'GetUserResponse'
    user: { __typename?: 'User'; firebaseAuthId: string; email: string; createdAt: Date; updatedAt: Date }
  }
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
  __typename?: 'Query'
  getUsers: {
    __typename?: 'GetUsersResponse'
    users: Array<{
      __typename?: 'User'
      firebaseAuthId: string
      email: string
      createdAt: Date
      updatedAt: Date
    } | null>
  }
}

export const CreateBookDocument = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      book {
        id
        isbn
        title
        authors
        publisher
        tags {
          id
          name
          userId
        }
        memo
        createdAt
        updatedAt
        userId
      }
    }
  }
`
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options)
}
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>
export const DeleteBookDocument = gql`
  mutation DeleteBook($input: DeleteBookInput!) {
    deleteBook(input: $input) {
      book {
        id
        isbn
        title
        authors
        publisher
        createdAt
        updatedAt
      }
    }
  }
`
export type DeleteBookMutationFn = Apollo.MutationFunction<DeleteBookMutation, DeleteBookMutationVariables>

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteBookMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteBookMutation, DeleteBookMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, options)
}
export type DeleteBookMutationHookResult = ReturnType<typeof useDeleteBookMutation>
export type DeleteBookMutationResult = Apollo.MutationResult<DeleteBookMutation>
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<DeleteBookMutation, DeleteBookMutationVariables>
export const UpdateBookDocument = gql`
  mutation UpdateBook($input: UpdateBookInput!) {
    updateBook(input: $input) {
      book {
        id
        isbn
        title
        authors
        publisher
        tags {
          id
          name
          userId
        }
        memo
        createdAt
        updatedAt
        userId
      }
    }
  }
`
export type UpdateBookMutationFn = Apollo.MutationFunction<UpdateBookMutation, UpdateBookMutationVariables>

/**
 * __useUpdateBookMutation__
 *
 * To run a mutation, you first call `useUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookMutation, { data, loading, error }] = useUpdateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument, options)
}
export type UpdateBookMutationHookResult = ReturnType<typeof useUpdateBookMutation>
export type UpdateBookMutationResult = Apollo.MutationResult<UpdateBookMutation>
export type UpdateBookMutationOptions = Apollo.BaseMutationOptions<UpdateBookMutation, UpdateBookMutationVariables>
export const GetBookDocument = gql`
  query GetBook($input: GetBookInput!) {
    getBook(input: $input) {
      book {
        id
        isbn
        title
        authors
        publisher
        tags {
          id
          name
          userId
        }
        memo
        createdAt
        updatedAt
        userId
      }
    }
  }
`

/**
 * __useGetBookQuery__
 *
 * To run a query within a React component, call `useGetBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBookQuery(baseOptions: Apollo.QueryHookOptions<GetBookQuery, GetBookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, options)
}
export function useGetBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookQuery, GetBookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, options)
}
export type GetBookQueryHookResult = ReturnType<typeof useGetBookQuery>
export type GetBookLazyQueryHookResult = ReturnType<typeof useGetBookLazyQuery>
export type GetBookQueryResult = Apollo.QueryResult<GetBookQuery, GetBookQueryVariables>
export const GetBooksDocument = gql`
  query GetBooks($input: GetBooksInput!) {
    getBooks(input: $input) {
      books {
        id
        isbn
        title
        authors
        publisher
        tags {
          id
          name
          userId
        }
        memo
        createdAt
        updatedAt
        userId
      }
    }
  }
`

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options)
}
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options)
}
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>
export const CreateTagDocument = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      tag {
        id
        name
        userId
      }
    }
  }
`
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options)
}
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>
export const DeleteTagDocument = gql`
  mutation DeleteTag($input: DeleteTagInput!) {
    deleteTag(input: $input) {
      tag {
        id
        name
        userId
      }
    }
  }
`
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTagMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, options)
}
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>
export const UpdateTagDocument = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      tag {
        id
        name
        userId
      }
    }
  }
`
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options)
}
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>
export const GetTagDocument = gql`
  query GetTag($input: GetTagInput!) {
    getTag(input: $input) {
      tag {
        id
        name
        userId
      }
    }
  }
`

/**
 * __useGetTagQuery__
 *
 * To run a query within a React component, call `useGetTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTagQuery(baseOptions: Apollo.QueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options)
}
export function useGetTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options)
}
export type GetTagQueryHookResult = ReturnType<typeof useGetTagQuery>
export type GetTagLazyQueryHookResult = ReturnType<typeof useGetTagLazyQuery>
export type GetTagQueryResult = Apollo.QueryResult<GetTagQuery, GetTagQueryVariables>
export const GetTagsDocument = gql`
  query GetTags($input: GetTagsInput!) {
    getTags(input: $input) {
      tags {
        id
        name
        userId
      }
    }
  }
`

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options)
}
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options)
}
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>
export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        firebaseAuthId
        email
        createdAt
        updatedAt
      }
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options)
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>
export const DeleteUserDocument = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      user {
        firebaseAuthId
        email
        createdAt
        updatedAt
      }
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options)
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>
export const GetUserDocument = gql`
  query GetUser($input: GetUserInput!) {
    getUser(input: $input) {
      user {
        firebaseAuthId
        email
        createdAt
        updatedAt
      }
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>
export const GetUsersDocument = gql`
  query GetUsers {
    getUsers {
      users {
        firebaseAuthId
        email
        createdAt
        updatedAt
      }
    }
  }
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Book: ResolverTypeWrapper<Book>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  CreateBookInput: CreateBookInput
  CreateBookResponse: ResolverTypeWrapper<CreateBookResponse>
  CreateTagInput: CreateTagInput
  CreateTagResponse: ResolverTypeWrapper<CreateTagResponse>
  CreateUserInput: CreateUserInput
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
  DeleteBook: ResolverTypeWrapper<DeleteBook>
  DeleteBookInput: DeleteBookInput
  DeleteBookResponse: ResolverTypeWrapper<DeleteBookResponse>
  DeleteTagInput: DeleteTagInput
  DeleteTagResponse: ResolverTypeWrapper<DeleteTagResponse>
  DeleteUserInput: DeleteUserInput
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>
  GetBookInput: GetBookInput
  GetBookResponse: ResolverTypeWrapper<GetBookResponse>
  GetBooksInput: GetBooksInput
  GetBooksResponse: ResolverTypeWrapper<GetBooksResponse>
  GetTagInput: GetTagInput
  GetTagResponse: ResolverTypeWrapper<GetTagResponse>
  GetTagsInput: GetTagsInput
  GetTagsResponse: ResolverTypeWrapper<GetTagsResponse>
  GetUserInput: GetUserInput
  GetUserResponse: ResolverTypeWrapper<GetUserResponse>
  GetUsersResponse: ResolverTypeWrapper<GetUsersResponse>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Tag: ResolverTypeWrapper<Tag>
  TagInput: TagInput
  UpdateBookInput: UpdateBookInput
  UpdateBookResponse: ResolverTypeWrapper<UpdateBookResponse>
  UpdateTagInput: UpdateTagInput
  UpdateTagResponse: ResolverTypeWrapper<UpdateTagResponse>
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Book: Book
  Boolean: Scalars['Boolean']['output']
  CreateBookInput: CreateBookInput
  CreateBookResponse: CreateBookResponse
  CreateTagInput: CreateTagInput
  CreateTagResponse: CreateTagResponse
  CreateUserInput: CreateUserInput
  CreateUserResponse: CreateUserResponse
  DateTime: Scalars['DateTime']['output']
  DeleteBook: DeleteBook
  DeleteBookInput: DeleteBookInput
  DeleteBookResponse: DeleteBookResponse
  DeleteTagInput: DeleteTagInput
  DeleteTagResponse: DeleteTagResponse
  DeleteUserInput: DeleteUserInput
  DeleteUserResponse: DeleteUserResponse
  GetBookInput: GetBookInput
  GetBookResponse: GetBookResponse
  GetBooksInput: GetBooksInput
  GetBooksResponse: GetBooksResponse
  GetTagInput: GetTagInput
  GetTagResponse: GetTagResponse
  GetTagsInput: GetTagsInput
  GetTagsResponse: GetTagsResponse
  GetUserInput: GetUserInput
  GetUserResponse: GetUserResponse
  GetUsersResponse: GetUsersResponse
  Mutation: {}
  Query: {}
  String: Scalars['String']['output']
  Tag: Tag
  TagInput: TagInput
  UpdateBookInput: UpdateBookInput
  UpdateBookResponse: UpdateBookResponse
  UpdateTagInput: UpdateTagInput
  UpdateTagResponse: UpdateTagResponse
  User: User
}

export type BookResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']
> = {
  authors?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  memo?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateBookResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateBookResponse'] = ResolversParentTypes['CreateBookResponse']
> = {
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateTagResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateTagResponse'] = ResolversParentTypes['CreateTagResponse']
> = {
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type DeleteBookResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteBook'] = ResolversParentTypes['DeleteBook']
> = {
  authors?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  publisher?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteBookResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteBookResponse'] = ResolversParentTypes['DeleteBookResponse']
> = {
  book?: Resolver<ResolversTypes['DeleteBook'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteTagResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteTagResponse'] = ResolversParentTypes['DeleteTagResponse']
> = {
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DeleteUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetBookResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetBookResponse'] = ResolversParentTypes['GetBookResponse']
> = {
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetBooksResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetBooksResponse'] = ResolversParentTypes['GetBooksResponse']
> = {
  books?: Resolver<Array<Maybe<ResolversTypes['Book']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetTagResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetTagResponse'] = ResolversParentTypes['GetTagResponse']
> = {
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetTagsResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetTagsResponse'] = ResolversParentTypes['GetTagsResponse']
> = {
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetUserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetUserResponse'] = ResolversParentTypes['GetUserResponse']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GetUsersResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GetUsersResponse'] = ResolversParentTypes['GetUsersResponse']
> = {
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createBook?: Resolver<
    ResolversTypes['CreateBookResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateBookArgs, 'input'>
  >
  createTag?: Resolver<
    ResolversTypes['CreateTagResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTagArgs, 'input'>
  >
  createUser?: Resolver<
    ResolversTypes['CreateUserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >
  deleteBook?: Resolver<
    ResolversTypes['DeleteBookResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBookArgs, 'input'>
  >
  deleteTag?: Resolver<
    ResolversTypes['DeleteTagResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTagArgs, 'input'>
  >
  deleteUser?: Resolver<
    ResolversTypes['DeleteUserResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'input'>
  >
  updateBook?: Resolver<
    ResolversTypes['UpdateBookResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBookArgs, 'input'>
  >
  updateTag?: Resolver<
    ResolversTypes['UpdateTagResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagArgs, 'input'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getBook?: Resolver<
    ResolversTypes['GetBookResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryGetBookArgs, 'input'>
  >
  getBooks?: Resolver<
    ResolversTypes['GetBooksResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryGetBooksArgs, 'input'>
  >
  getTag?: Resolver<ResolversTypes['GetTagResponse'], ParentType, ContextType, RequireFields<QueryGetTagArgs, 'input'>>
  getTags?: Resolver<
    ResolversTypes['GetTagsResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryGetTagsArgs, 'input'>
  >
  getUser?: Resolver<
    ResolversTypes['GetUserResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryGetUserArgs, 'input'>
  >
  getUsers?: Resolver<ResolversTypes['GetUsersResponse'], ParentType, ContextType>
  greet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateBookResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateBookResponse'] = ResolversParentTypes['UpdateBookResponse']
> = {
  book?: Resolver<ResolversTypes['Book'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateTagResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UpdateTagResponse'] = ResolversParentTypes['UpdateTagResponse']
> = {
  tag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firebaseAuthId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Book?: BookResolvers<ContextType>
  CreateBookResponse?: CreateBookResponseResolvers<ContextType>
  CreateTagResponse?: CreateTagResponseResolvers<ContextType>
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>
  DateTime?: GraphQLScalarType
  DeleteBook?: DeleteBookResolvers<ContextType>
  DeleteBookResponse?: DeleteBookResponseResolvers<ContextType>
  DeleteTagResponse?: DeleteTagResponseResolvers<ContextType>
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>
  GetBookResponse?: GetBookResponseResolvers<ContextType>
  GetBooksResponse?: GetBooksResponseResolvers<ContextType>
  GetTagResponse?: GetTagResponseResolvers<ContextType>
  GetTagsResponse?: GetTagsResponseResolvers<ContextType>
  GetUserResponse?: GetUserResponseResolvers<ContextType>
  GetUsersResponse?: GetUsersResponseResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Tag?: TagResolvers<ContextType>
  UpdateBookResponse?: UpdateBookResponseResolvers<ContextType>
  UpdateTagResponse?: UpdateTagResponseResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
