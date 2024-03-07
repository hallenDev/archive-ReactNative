import { useQueryClient, useMutation } from 'react-query'
import { deleteMedia } from '~/shared/api/members'
import { useUser } from '~/context/UserContext'

const useDeleteMediaMutation = props => {
  const queryClient = useQueryClient()
  const {
    user: { duid },
  } = useUser()

  return useMutation('deleteMedia', deleteMedia, {
    onMutate: ({ contentId }) => {
      queryClient.setQueriesData(
        ['profileTrending', parseInt(duid)],
        previousData => {
          let indexItem
          const indexArray = previousData?.pages?.findIndex(arr => {
            indexItem = arr.findIndex(
              item => parseInt(item.contentId) === parseInt(contentId),
            )

            return indexItem !== -1
          })

          const nextData = {
            ...previousData,
            pages: [
              ...previousData?.pages?.slice(0, indexArray),
              [
                ...previousData?.pages[indexArray]?.slice(0, indexItem),
                ...previousData?.pages[indexArray]?.slice(indexItem + 1),
              ],
              ...previousData?.pages?.slice(indexArray + 1),
            ],
          }

          return nextData
        },
      )
    },
    onSuccess: () => {
      props?.onSuccess()
    },
  })
}

export default useDeleteMediaMutation
