import { useQueryClient, useMutation } from 'react-query'
import { deleteMsgThread } from '~/shared/api/members'
import { noop } from '~/utils/noop'

const useDeleteMsgThread = ({
  threadId,
  onSettled = noop,
  onSuccess = noop,
}) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(deleteMsgThread, {
    onMutate: async data => {
      await queryClient.cancelQueries('msgInbox')
      const previousData = queryClient.getQueryData('msgInbox')

      queryClient.setQueryData('msgInbox', old => {
        const nextData = {
          ...old,
          pages: old?.pages?.map(page => ({
            ...page,
            threads: page?.threads?.filter(v => v.thread_id !== threadId),
          })),
        }

        // console.log(nextData.pages[0].threads.length, 'nextData')
        return nextData
      })

      return { previousData }
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData('msgInbox', context.previousData)
    },
    onSettled: () => {
      // queryClient.invalidateQueries('msgInbox')
      onSettled && onSettled()
    },
    onSuccess: onSuccess,
  })

  return {
    mutate: () => mutate({ threadId }),
    isLoading,
  }
}

export default useDeleteMsgThread
