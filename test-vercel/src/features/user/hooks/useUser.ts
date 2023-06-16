import { useCreateUserMutation, useDeleteUserMutation } from '@/__generated__/graphql'

export const useUser = () => {
  // これは使用するときに定義するしかない？
  // const { data, loading, error } = useGetUserQuery({
  //   variables: {
  //     input: {
  //       firebaseAuthId: ''
  //     }
  //   }
  // })

  const [createUserMut, { loading: createUserMutLoading, error: createUserMutError }] = useCreateUserMutation()

  const [deleteUserMut, { loading: deleteUserMutLoading, error: deleteUserMutError }] = useDeleteUserMutation()

  const createUser = async (id: string, email: string) => {
    const user = await createUserMut({
      variables: {
        input: {
          firebaseAuthId: id,
          email: email,
        },
      },
    })
    return user
  }

  const deleteUser = async (id: string) => {
    const user = await deleteUserMut({
      variables: {
        input: {
          firebaseAuthId: id,
        },
      },
    })
    return user
  }

  return {
    createUser,
    createUserMutLoading,
    createUserMutError,
    deleteUser,
    deleteUserMutLoading,
    deleteUserMutError,
  } as const
}
