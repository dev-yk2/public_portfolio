import {
  CreateTagInput,
  DeleteTagInput,
  UpdateTagInput,
  GetTagsDocument,
  useCreateTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
} from '@/__generated__/graphql'

export const useTag = () => {
  const [createTagMut, { loading: createTagMutLoading, error: createTagMutError }] = useCreateTagMutation()
  const [updateTagMut, { loading: updateTagMutLoading, error: updateTagMutError }] = useUpdateTagMutation()
  const [deleteTagMut, { loading: deleteTagMutLoading, error: deleteTagMutError }] = useDeleteTagMutation()

  const createTag = async (createTagInput: CreateTagInput) => {
    const createdTag = await createTagMut({
      variables: {
        input: createTagInput,
      },
      refetchQueries: [GetTagsDocument],
    })
    return createdTag
  }

  const updateTag = async (updateTagInput: UpdateTagInput) => {
    const updatedTag = await updateTagMut({
      variables: {
        input: updateTagInput,
      },
      refetchQueries: [GetTagsDocument],
    })
    return updatedTag
  }

  const deleteTag = async (deleteTagInput: DeleteTagInput) => {
    const deletedTag = await deleteTagMut({
      variables: {
        input: deleteTagInput,
      },
      refetchQueries: [GetTagsDocument],
    })
    return deletedTag
  }

  return {
    createTag,
    createTagMutLoading,
    createTagMutError,

    updateTag,
    updateTagMutLoading,
    updateTagMutError,

    deleteTag,
    deleteTagMutLoading,
    deleteTagMutError,
  } as const
}
