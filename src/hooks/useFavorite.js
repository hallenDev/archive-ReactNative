import { useQueryClient, useMutation } from 'react-query'

import { addFavorites, removeFavorites } from '~/shared/api/members'
import { noop } from '~/utils/noop'

const useFavorite = ({ isMatchPage = false, onSettled = noop }) => {
  const queryClient = useQueryClient()
  const { mutateAsync: addMutate } = useMutation('addFavorites', addFavorites)
  const { mutateAsync: removeMutate, isLoading } = useMutation(
    'removeFavorites',
    removeFavorites,
    {
      onSettled: () => {
        onSettled()
      },
    },
  )

  return {
    isLoading,
    mutate: (userId, status = true) => {
      const mutate = status ? addMutate : removeMutate

      mutate({ fuid: userId }).then(() => {
        queryClient.invalidateQueries('favorites')
        queryClient.invalidateQueries('counts')
      })

      if (isMatchPage) {
        const matchQueries = queryClient.getQueriesData('queuePlay')

        matchQueries.forEach(([params, data]) => {
          const newData = { ...data }
          const foundIndex = newData.users.findIndex(
            user => user.duid == userId,
          )
          if (foundIndex >= 0) {
            newData.users[foundIndex].isFavorite = status
            queryClient.setQueryData(params, newData)
          }
        })
      } else {
        queryClient.invalidateQueries('queuePlay')
      }

      const profile = queryClient.getQueryData(['profile', parseInt(userId)])

      if (profile) {
        queryClient.setQueryData(['profile', parseInt(userId)], {
          ...profile,
          isFavorite: status,
        })
      }
    },
  }
}

export default useFavorite
