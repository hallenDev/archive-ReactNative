import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { withIAPContext } from 'react-native-iap'
import { ToastProvider } from 'react-native-toast-notifications'

import FlashMessage from '~/services/in-app-notifications'
import ErrorBoundary from '~/services/Bugsnag'
import UserProvider from '~/context/UserContext'
import LoadingProvider from '~/context/LoadingContext'
import NetworkProvider from '~/context/NetworkProvider'
import BlurHeaderProvider from '~/context/BlurHeaderProvider'
import ReportSuccessModalProvider from '~/context/ReportModalContext'
import NavigationProvider from '~/navigation/NavigationProvider'
import Navigator from '~/navigation/Navigator'
import CheckInternetConnectionProvider from '~/context/CheckInternetConnectionProvider'
import ErrorBoundaryComponent from '~/ui/ErrorBoundary'
import { AFInit } from '~/utils/AppsFlyer'

import '~/utils/polyfills'
import '~/configs/day'
import NotificationToast from '../notification/NotificationToast'
import { MenuProvider } from 'react-native-popup-menu'

const App = () => {
  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    AFInit()
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
      <LoadingProvider>
        <SafeAreaProvider>
          <BlurHeaderProvider>
            <NavigationProvider>
              <MenuProvider>
                <NetworkProvider setNetworkError={setNetworkError}>
                  <ToastProvider
                    swipeEnabled={false}
                    renderType={{
                      notification_type: toast => (
                        <NotificationToast data={toast.data} />
                      ),
                    }}
                    offsetBottom={85}
                  >
                    <UserProvider>
                      <CheckInternetConnectionProvider>
                        <ReportSuccessModalProvider>
                          {networkError ? (
                            <ErrorBoundaryComponent
                              networkError
                              resetAction={() => {
                                setNetworkError(false)
                              }}
                            />
                          ) : (
                            <Navigator />
                          )}
                          <FlashMessage position="top" />
                        </ReportSuccessModalProvider>
                      </CheckInternetConnectionProvider>
                    </UserProvider>
                  </ToastProvider>
                </NetworkProvider>
              </MenuProvider>
            </NavigationProvider>
          </BlurHeaderProvider>
        </SafeAreaProvider>
      </LoadingProvider>
    </ErrorBoundary>
  )
}

export default withIAPContext(App)
