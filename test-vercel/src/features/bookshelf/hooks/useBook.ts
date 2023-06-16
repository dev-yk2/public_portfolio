import {
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  GetBooksDocument,
  DeleteBookInput,
  CreateBookInput,
  UpdateBookInput,
} from '@/__generated__/graphql'

export const useBook = () => {
  const [createBookMut, { loading: createBookMutLoading, error: createBookMutError }] = useCreateBookMutation()
  const [updateBookMut, { loading: updateBookMutLoading, error: updateBookMutError }] = useUpdateBookMutation()
  const [deleteBookMut, { loading: deleteBookMutLoading, error: deleteBookMutError }] = useDeleteBookMutation()

  const createBook = async (createBookInput: CreateBookInput) => {
    const createdBook = await createBookMut({
      variables: {
        input: createBookInput,
      },
      refetchQueries: [GetBooksDocument],
    })
    return createdBook
  }

  const updateBook = async (updateBookInput: UpdateBookInput) => {
    const updatedBook = await updateBookMut({
      variables: {
        input: updateBookInput,
      },
      refetchQueries: [GetBooksDocument],
    })
    return updatedBook
  }

  const deleteBook = async (deleteBookInput: DeleteBookInput) => {
    const deletedBook = await deleteBookMut({
      variables: {
        input: deleteBookInput,
      },
      refetchQueries: [GetBooksDocument],
    })
    return deletedBook
  }

  return {
    createBook,
    createBookMutLoading,
    createBookMutError,

    updateBook,
    updateBookMutLoading,
    updateBookMutError,

    deleteBook,
    deleteBookMutLoading,
    deleteBookMutError,
  } as const
}
