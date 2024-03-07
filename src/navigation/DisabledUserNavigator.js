import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import DisabledProfileScreen, {
  options as DisabledProfileScreenOptions,
} from '../screens/members/DisabledProfileScreen'
import { AppStatusBar } from '~/components'

const Stack = createNativeStackNavigator()

const DisabledUserNavigator = () => (
  <>
    <AppStatusBar />

    <Stack.Navigator initialRouteName="DisabledProfileScreen">
      <Stack.Screen
        name="DisabledProfileScreen"
        component={DisabledProfileScreen}
        options={DisabledProfileScreenOptions}
      />
    </Stack.Navigator>
  </>
)

export default DisabledUserNavigator
