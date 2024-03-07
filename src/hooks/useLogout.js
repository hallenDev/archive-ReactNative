import { useMutation, useQueryClient } from 'react-query'
import { logout } from '~/shared/api/public'
import { useUser } from '~/context/UserContext'

const useLogout = () => {
  const { updateUserWithSid } = useUser()
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onSettled: () => {
      updateUserWithSid(null)

      queryClient.clear()
    },
  })
}

export default useLogout
