import { useQueryClient, useMutation } from 'react-query'
import { voteQueue } from '~/shared/api/members'

const useLikeUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: voteAction } = useMutation('voteQueue', voteQueue)

  return (userId, status = true) => {
    voteAction({
      duid: userId,
      rating: status ? 'cute' : 'not',
    })

    queryClient.removeQueries('queuePlay')

    const profile = queryClient.getQueryData(['profile', parseInt(userId)])

    if (profile) {
      const newProfile = {
        ...profile,
        matchVote: !!status ? 'LIKE' : 'DISLIKE',
      }

      queryClient.setQueryData(['profile', parseInt(userId)], newProfile)
    }
  }
}

export default useLikeUser
