import { useEffect } from 'react'
import { useUser } from '~/context/UserContext'
import { subscribeToChannel } from '~/utils/centrifuge'
import { notificationMapper } from '~/utils/notificationManager'

export const useSubscribeToChannel = (subscribeFn, channel) => {
  const {
    user: { duid },
  } = useUser()

  useEffect(() => {
    let subscription = null

    const publishCallback = message => {
      subscribeFn(notificationMapper(message))
    }

    const joinCallback = message => {
      subscribeFn(message)
    }

    if (duid) {
      try {
        subscription = subscribeToChannel(channel || `notifications#${duid}`)
          .on('publish', publishCallback)
          .on('join', joinCallback)
      } catch (e) {}
    }

    return () => {
      subscription?.removeListener('publish', publishCallback)
      subscription?.removeListener('join', joinCallback)
    }
  }, [channel, duid, subscribeFn])
}
