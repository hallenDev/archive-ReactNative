import { useQueryClient, useMutation } from 'react-query'
import { report } from '~/shared/api/members'
import noop from '~/utils/noop'
import { APP_DISPLAY_NAME } from '../configs/constants'

const useReportUser = ({
  reportedDuid,
  reportedFrom,
  reportedUserReasonId,
  additionalInfo,
  onSuccess = noop,
  onError = noop,
}) => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(report, {
    onSuccess: () => {
      queryClient.invalidateQueries('quickSearch')
      queryClient.invalidateQueries('block')
      queryClient.invalidateQueries('msgInbox')
      queryClient.invalidateQueries('queuePlay')

      const trendings = queryClient.getQueriesData('trending')

      trendings.forEach(([params, data]) => {
        const newData = { ...data }

        newData.pages = newData?.pages?.map(page => {
          page.content = page.content.filter(
            post => post.duid !== reportedDuid.toString(),
          )

          return page
        })

        queryClient.setQueryData(params, newData)
      })

      onSuccess(reportedDuid)
    },
    onError,
  })

  return {
    mutate: () =>
      mutate({
        reportedDuid,
        reportedFrom,
        reportedUserReasonId,
        additionalInfo: `${additionalInfo} from ${APP_DISPLAY_NAME} app`,
      }),
    isLoading,
  }
}

export default useReportUser
