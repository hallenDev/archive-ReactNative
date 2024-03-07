import React from 'react'
import messaging from '@react-native-firebase/messaging'
import noop from '~/utils/noop'

const useFirebaseMessage = (callbackFn = noop) => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      callbackFn(remoteMessage)
    })

    return () => {
      unsubscribe()
    }
  }, [])
}

export default useFirebaseMessage
