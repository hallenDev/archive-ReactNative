import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useMutation, useQueryClient } from 'react-query'

import useAxiosConfig from '~/hooks/useAxiosConfig'
import useStorage from '~/hooks/useStorage'

import DeviceInfo from '~/services/DeviceInfo'
import { logout } from '~/shared/api/public'
import AccountStatusMap from '~/shared/types/AccountStatusMap'
import { LoadingContext } from './LoadingContext'
import Bugsnag from '@bugsnag/react-native'

const defaultUserObject = {
  duid: -1,
  seeking: '',
  interested_in: [],
}

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const setLoading = useContext(LoadingContext)
  const {
    isLoading: isStoreLoading,
    userStore,
    setUserStore,
    appLaunched,
    setAppLaunched,
    authToken,
    setAuthToken,
    removeAuthToken,
  } = useStorage()
  const [user, setUser] = useState(defaultUserObject)
  const [isReady, setIsReady] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(null)
  const [, setIsFirstLaunch] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(logout)

  const updateUser = useCallback(
    user => {
      setUserStore(user)
      setUser(user)
    },
    [setUserStore],
  )

  const updateUserWithSid = useCallback(
    data => {
      setUserStore(data?.user)

      setUser(data?.user || defaultUserObject)

      const _authToken = data?.sid

      if (_authToken) {
        setIsSignedIn(true)
        setAuthToken(_authToken)
      } else {
        setIsSignedIn(false)
        removeAuthToken()
      }
    },
    [removeAuthToken, setAuthToken, setUserStore],
  )

  const onImmediateLogoutAndRestart = useCallback(async () => {
    Bugsnag.notify(new Error('onImmediateLogoutAndRestart'), function (event) {
      event.severity = 'info'
      event.addMetadata('User info', {
        user: userStore,
        authToken: authToken,
      })
    })

    const deviceid = await DeviceInfo.getUniqueId()

    mutate({ deviceid })

    updateUserWithSid(null)

    queryClient.clear()
  }, [mutate, queryClient, updateUserWithSid, userStore, authToken])

  const onDisabledUser = useCallback(() => {
    setUser(u => ({
      ...u,
      accountStatus: AccountStatusMap.USER_DISABLED,
    }))
    setLoading(false)
  }, [setLoading])

  useAxiosConfig({
    onImmediateLogoutAndRestart,
    onDisabledUser,
  })

  useEffect(() => {
    let isMounted = true

    const restoreState = async () => {
      try {
        if (isMounted) {
          setUser(userStore || defaultUserObject)
          setIsSignedIn(!!authToken)
          setIsFirstLaunch(!appLaunched)

          if (appLaunched === null) {
            setAppLaunched('true')
          }
        }
      } finally {
        SplashScreen.hide()
        setIsReady(true)
      }
    }

    if (!isReady && !isStoreLoading) {
      restoreState()
    }

    return () => {
      isMounted = false
    }
  }, [
    appLaunched,
    authToken,
    isReady,
    setAppLaunched,
    userStore,
    isStoreLoading,
  ])

  const userContext = React.useMemo(
    () => ({
      user,
      setUser: updateUser,
      updateUserWithSid,
    }),
    [updateUser, updateUserWithSid, user],
  )

  if (isSignedIn === null) return null

  return (
    <UserContext.Provider value={{ ...userContext, isSignedIn }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext')
  }

  return context
}

export { useUser }

export default UserProvider
