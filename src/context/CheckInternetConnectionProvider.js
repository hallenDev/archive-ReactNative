import React, { createContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import NetInfo from '@react-native-community/netinfo'
import { useUser } from '~/context/UserContext'
import {
  hideNotification,
  showNotificationError,
} from '~/services/in-app-notifications'

export const CheckInternetConnectionContext = createContext()

const TITLE = 'No Internet Connection'
const DESCRIPTION = `You are not connected to the internet.\n Make sure your Wi-Fi is connected,\n and try again.`

const CheckInternetConnectionProvider = ({ children }) => {
  const [isShowMessage, setIsShowMessage] = useState(false)

  const navigation = useNavigation()
  const { isSignedIn } = useUser()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        if (isShowMessage) {
          hideNotification()

          setIsShowMessage(false)
        }
      } else {
        if (!isSignedIn) {
          showNotificationError({
            message: 'Check your internet connection',
            autoHide: false,
          })

        } else {
          navigation.navigate('ErrorScreen', {
            title: TITLE,
            description: DESCRIPTION,
          })
        }

        setIsShowMessage(true)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [isShowMessage, isSignedIn, navigation])

  return (
    <CheckInternetConnectionContext.Provider
      value={{ withoutConnection: isShowMessage }}
    >
      {children}
    </CheckInternetConnectionContext.Provider>
  )
}

export default CheckInternetConnectionProvider
