import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from 'react-query'
import { useNavigation } from '@react-navigation/native'

const NetworkProvider = ({ children, setNetworkError }) => {
  const navigation = useNavigation()
  const { reset } = useQueryErrorResetBoundary()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: error => {
          if (error.message === 'Network Error') {
            reset()
            setNetworkError(true)
          }

          if (!!error.status && !error?.data?.error?.USER_DISABLED) {
            navigation.navigate('ErrorScreen', { statusCode: error.status })
          }
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default NetworkProvider
