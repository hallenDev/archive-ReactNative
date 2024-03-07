import { useQueryClient, useMutation } from 'react-query'
import { addBlock } from '~/shared/api/members'
import { noop } from '~/utils/noop'

const useBlockUser = ({ blockDuid, onSettled = noop, onSuccess = noop }) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(addBlock, {
    onMutate: () => {
      queryClient.setQueriesData('quickSearch', previousData => {
        const nextData = {
          ...previousData,
          pages: previousData?.pages?.map(page => ({
            ...page,
            searchResults: page?.searchResults?.filter(
              u => u.duid !== blockDuid?.toString(),
            ),
          })),
        }

        return nextData
      })

      queryClient.setQueryData('queueMatches', previousData => {
        return previousData?.filter(u => u.duid !== blockDuid?.toString())
      })

      queryClient.setQueryData('queueLikes', previousData => {
        return previousData?.filter(u => u.duid !== blockDuid?.toString())
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries('block')
      queryClient.invalidateQueries('msgInbox')
      queryClient.invalidateQueries(['profile', blockDuid])
      queryClient.invalidateQueries('queuePlay')

      const trendings = queryClient.getQueriesData('trending')

      trendings.forEach(([params, data]) => {
        const newData = { ...data }

        newData.pages = newData?.pages?.map(page => {
          page.content = page.content.filter(
            post => post.duid !== blockDuid.toString(),
          )

          return page
        })

        queryClient.setQueryData(params, newData)
      })

      onSettled?.(blockDuid)
    },
    onSuccess: onSuccess,
  })

  return {
    mutate: () => mutate({ blockDuid }),
    isLoading,
  }
}

export default useBlockUser
