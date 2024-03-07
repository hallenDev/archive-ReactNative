import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen from '~/screens/public/WelcomeScreen'
import LoginScreen from '~/screens/public/LoginScreen'
import SignupScreen from '~/screens/public/SignupScreen'
import ForgotScreen from '~/screens/public/ForgotScreen'
import ForgotSuccessScreen from '~/screens/public/ForgotSuccessScreen'
import ResetPasswordScreen from '~/screens/public/ResetPasswordScreen'
import ResetPasswordSuccessScreen from '~/screens/public/ResetPasswordSuccessScreen'
import VerifyDeviceScreen from '~/screens/public/VerifyDeviceScreen'
import PublicPrivacyPolicyScreen, {
  options as PrivacyPolicyScreenOptions,
} from '~/screens/public/PublicPrivacyPolicyScreen'
import PublicTermsOfUseScreen, {
  options as PublicTermsOfUseScreenOptions,
} from '~/screens/public/PublicTermsOfUseScreen'
import AppStatusBar from '~/components/AppStatusBar'

const SCREEN_MAP = [
  ['WelcomeScreen', WelcomeScreen],
  ['LoginScreen', LoginScreen],
  ['SignupScreen', SignupScreen],
  ['ForgotScreen', ForgotScreen],
  ['ForgotSuccessScreen', ForgotSuccessScreen],
  ['ResetPasswordScreen', ResetPasswordScreen, 'resetpassword/:userId/:token'],
  ['ResetPasswordSuccessScreen', ResetPasswordSuccessScreen],
  ['VerifyDeviceScreen', VerifyDeviceScreen],
  [
    'PrivacyPolicyScreen',
    PublicPrivacyPolicyScreen,
    '',
    PrivacyPolicyScreenOptions,
  ],
  [
    'TermsOfUseScreen',
    PublicTermsOfUseScreen,
    '',
    PublicTermsOfUseScreenOptions,
  ],
]

const Stack = createNativeStackNavigator()

const PublicNavigator = () => (
  <>
    <AppStatusBar />

    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Group screenOptions={{ headerShown: false }}>
        {SCREEN_MAP.map(([name, component, path, options]) => (
          <Stack.Screen
            key={name}
            name={name}
            options={options}
            component={component}
            path={path}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  </>
)

export default PublicNavigator
