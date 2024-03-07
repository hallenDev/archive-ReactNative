import { useQueryClient, useMutation } from 'react-query'
import { msgAcceptAttachType } from '~/shared/api/members'

export default function useMsgAcceptAttachType({
  fromDuid = '',
  otherUserId = '',
}) {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(msgAcceptAttachType, {
    onSuccess: () => queryClient.invalidateQueries(['msgThread', otherUserId]),
  })

  return {
    mutate: () => mutate({ fromDuid, type: 'APPROVED' }),
    isLoading,
  }
}
