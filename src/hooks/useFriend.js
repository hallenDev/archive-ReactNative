import {
  addFriend as addToFriend,
  removeFriend as removeFromFriend,
} from '~/shared/api/members'
import { useMutation, useQueryClient } from 'react-query'
import { noop } from '~/utils/noop'

const useFriend = (onSettled = noop) => {
  const queryClient = useQueryClient()

  const { mutateAsync: addMutate } = useMutation('addToFriend', addToFriend)
  const { mutateAsync: removeMutate, isLoading } = useMutation(
    'removeFromFriend',
    removeFromFriend,
    {
      onSettled: () => {
        if (onSettled) {
          onSettled()
        }
      },
    },
  )

  return {
    isLoading,
    mutate: (userId, status = true) => {
      const mutate = status ? addMutate : removeMutate
      mutate({ fuid: userId }).then(() => {
        queryClient.invalidateQueries('friends')
        queryClient.invalidateQueries('counts')
        queryClient.invalidateQueries('profile', userId)
      })

      const profile = queryClient.getQueryData(['profile', parseInt(userId)])

      if (profile) {
        const newProfile = {
          ...profile,
          friendStatus: status === false ? null : 'REQUEST',
        }

        queryClient.setQueryData(['profile', parseInt(userId)], newProfile)
      }
    },
  }
}

export default useFriend
