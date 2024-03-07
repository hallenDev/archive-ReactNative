import React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { SITE_URL } from '~/configs/constants'

const config = {
  screens: {
    LoginInformationChanged: 'user/login_changed/:type/:email/:code',
    VerifyDevice: 'user/verify_device/:email/:token',
    ResetPasswordScreen: 'resetpassword/:userId/:token',
  },
}

const linking = {
  prefixes: [SITE_URL, 'honeypages://'],
  config,
}

const NavigationProvider = ({ children }) => {
  const scheme = useColorScheme()

  const theme =
    scheme === 'dark'
      ? require('~/configs/darkSchema').default
      : require('~/configs/lightSchema').default

  return (
    <NavigationContainer theme={theme} linking={linking}>
      {children}
    </NavigationContainer>
  )
}

export default NavigationProvider
