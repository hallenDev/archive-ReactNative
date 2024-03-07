import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TrendingScreen from '~/screens/members/TrendingScreen'
import LocationScreen, {
  options as LocationScreenOptions,
} from '~/screens/members/LocationScreen'

const TRENDING_SCREEN_MAP = [
  ['TrendingScreen', TrendingScreen],
  ['LocationScreen', LocationScreen, LocationScreenOptions],
]

const TrendingStack = createNativeStackNavigator()

export default function TrendingNavigator() {
  return (
    <TrendingStack.Navigator>
      <TrendingStack.Group>
        {TRENDING_SCREEN_MAP.map(([name, component, options]) => (
          <TrendingStack.Screen
            key={name}
            name={name}
            component={component}
            options={component?.options || options}
          />
        ))}
      </TrendingStack.Group>
    </TrendingStack.Navigator>
  )
}
