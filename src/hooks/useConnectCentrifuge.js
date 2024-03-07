import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { useUser } from '~/context/UserContext'
import { connectToCentrifuge } from '~/utils/centrifuge'

export default function useConnectCentrifuge() {
  const appState = useRef(AppState.currentState)

  const {
    user: { jwt_token },
  } = useUser()

  useEffect(() => {
    const unsubscribe = connectToCentrifuge(jwt_token)

    return () => {
      unsubscribe()
    }
  }, [jwt_token])

  useEffect(() => {
    const changeAppState = nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        connectToCentrifuge(jwt_token)
      }

      appState.current = nextAppState
    }

    const appStateListener = AppState.addEventListener('change', changeAppState)

    return () => {
      appStateListener?.remove()
    }
  }, [])
}
