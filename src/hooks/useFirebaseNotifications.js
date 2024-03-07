import React from 'react'
import messaging from '@react-native-firebase/messaging'
import { useMutation } from 'react-query'

import DeviceInfo from '~/services/DeviceInfo'
import { requestUserPermission } from '~/utils/requestUserPermission'
import { addFirebaseToken } from '~/shared/api/members'
import debug from '~/utils/debug'
import { useRedirectNotificationContext } from '~/context/RedirectNotificationContext'
import useStorage from './useStorage'

const useFirebaseNotifications = ({ setLoading }) => {
  const { mutate } = useMutation(addFirebaseToken)
  const { setNotification } = useRedirectNotificationContext()
  const { setFirebaseToken, isLoading: isStoreLoading } = useStorage()

  React.useEffect(() => {
    let isMounted = true

    const getFcmToken = async () => {
      const deviceid = await DeviceInfo.getUniqueId()

      if (!isMounted) return

      const token = await messaging().getToken()
      if (token) {
        mutate({ token, deviceid })
        setFirebaseToken(token)
      }

      messaging().onTokenRefresh(async refreshToken => {
        if (refreshToken) {
          mutate({ token: refreshToken, deviceid })
          setFirebaseToken(refreshToken)
        }
      })
    }

    try {
      if (!isStoreLoading) {
        requestUserPermission(getFcmToken)
      }
    } catch (error) {
      debug('requestUserPermission', error)
    }

    return () => {
      isMounted = false
    }
  }, [isStoreLoading])

  React.useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      debug(
        'Notification caused app to open from background state:',
        remoteMessage,
      )

      setNotification(remoteMessage)
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          debug(
            'Notification caused app to open from quit state:',
            remoteMessage,
          )
          setNotification(remoteMessage)
        }

        setLoading?.(false)
      })
  }, [])
}

export default useFirebaseNotifications
