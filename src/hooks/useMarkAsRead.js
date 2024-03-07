import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { useQueryClient, useMutation } from 'react-query'

import { useThreadsUnreadTotal } from '~/context/ThreadsUnreadTotalContext'
import { markAsRead } from '~/shared/api/members'

const useMarkAsRead = ({ otherUserId = '', myUnread = 0 }) => {
  const queryClient = useQueryClient()
  const isFocused = useIsFocused()
  const [, setUnreadTotal] = useThreadsUnreadTotal()
  const { mutate } = useMutation(markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries('msgInbox')
    },
  })

  React.useEffect(() => {
    if (myUnread && isFocused) {
      mutate({ otherUserId })
      setUnreadTotal(0)
    }
  }, [mutate, otherUserId, myUnread, setUnreadTotal, isFocused])
}

export default useMarkAsRead
