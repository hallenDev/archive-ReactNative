import React, { createContext, useState, useEffect, useContext } from 'react'
import { Platform } from 'react-native'
import FullScreenLoader from '~/ui/fullscreen-loader'

export const LoadingContext = createContext()

export default function LoadingProvider({ children = null }) {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={setLoading}>
      {children}
      {loading ? <FullScreenLoader /> : null}
    </LoadingContext.Provider>
  )
}

export const useLoading = (isLoading = false) => {
  const setLoading = useContext(LoadingContext)

  if (setLoading === undefined) {
    throw new Error('useLoading must be used within a LoadingContext')
  }

  useEffect(() => {
    if (isLoading) {
      if (Platform.OS === 'ios') {
        return setLoading(true)
      }

      setTimeout(() => {
        setLoading(true)
      }, 100)

      return
    }

    const timer = setTimeout(() => setLoading(false), 500)
    return () => {
      clearTimeout(timer)
    }
  }, [isLoading, setLoading])
}
