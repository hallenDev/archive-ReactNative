import { useQuery } from 'react-query'

import { fetchProfile } from '~/shared/api/members'
import { useUser } from '~/context/UserContext'

const staleTime = 10000

const useProfile = ({ duid } = {}) => {
  const { user, setUser } = useUser()
  const profileId = duid ?? user.duid
  const isMe = user.duid === profileId

  const { data = isMe && user, ...rest } = useQuery(
    ['profile', profileId],
    () => fetchProfile({ duid: profileId }),
    {
      staleTime,
      onSuccess: resp => {
        if (isMe) {
          setUser({
            ...user,
            ...resp,
          })
        }
      },
    },
  )

  return { data, ...rest }
}

export default useProfile
