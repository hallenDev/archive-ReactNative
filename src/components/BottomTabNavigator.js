import React, { useContext } from 'react'
import { Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UnmountPagesContext } from '~/context/UnmountPagesProvider'
import { hasNotch } from 'react-native-device-info'

import MyAccountNavigator from '~/navigation/MyAccountNavigator'
import TrendingNavigator from '~/navigation/TrendingNavigator'
import { options as TrendingScreenOptions } from '~/screens/members/TrendingScreen'
import SearchScreen, {
  options as SearchScreenOptions,
} from '~/screens/members/SearchScreen'
import MatchScreen from '~/screens/members/MatchScreen'
import InboxScreen, {
  options as InboxScreenOptions,
} from '~/screens/members/InboxScreen'
import { optionsTabsScreen as MyAccountOptions } from '~/screens/members/MyAccountScreen'
import UserProfileScreen, {
  options as UserProfileScreenOptions,
} from '~/screens/members/UserProfileScreen'
import ChatScreen, {
  options as ChatScreenOptions,
} from '~/screens/members/ChatScreen'
import PaymentScreen, {
  options as PaymentScreenOptions,
} from '~/screens/members/Payment'
import LikedScreen, {
  options as LikedScreenOptions,
} from '~/screens/members/LikedScreen'

import { colors, typography } from '~/ui/theme'

const TAB_MAP = [
  ['Trending', TrendingNavigator, TrendingScreenOptions],
  ['Search', SearchScreen, SearchScreenOptions],
  ['Match', MatchScreen],
  ['Inbox', InboxScreen, InboxScreenOptions],
  ['MyAccount', MyAccountNavigator, MyAccountOptions],
  ['Chat', ChatScreen, ChatScreenOptions],
  ['UserProfileScreen', UserProfileScreen, UserProfileScreenOptions],
  ['Payment', PaymentScreen, PaymentScreenOptions],
  ['Liked', LikedScreen, LikedScreenOptions],
]

const Tab = createBottomTabNavigator()

const BOTTOM_NAVBAR_HEIGHT = 56

export default function BottomTabNavigator({ route }) {
  const insets = useSafeAreaInsets()
  const safeAreaBottom = hasNotch() ? insets.bottom : 16
  const { width } = Dimensions.get('screen')

  const { isUnmount } = useContext(UnmountPagesContext)

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.darkViolet,
      borderBottomColor: colors.semiBlack25,
      borderBottomWidth: 1,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      ...typography.h3,
      color: colors.text,
    },
    unmountOnBlur: isUnmount,
    headerBackTitleVisible: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text,
    tabBarStyle: {
      position: 'absolute',
      left: 16,
      right: 16,
      borderTopWidth: 0,
      elevation: 5,
      paddingHorizontal: width * 0.05,
      backgroundColor: 'white',
      bottom: safeAreaBottom,
      height: BOTTOM_NAVBAR_HEIGHT,
      borderRadius: 46,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      paddingBottom: 0,
    },
    tabBarHideOnKeyboard: true,
    tabBarIconStyle: {
      width: 16,
      height: 16,
    },
  }

  const initialRouteName = route?.params?.initialRouteName ?? 'Trending'

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
      backBehavior="history"
    >
      {TAB_MAP.map(([name, component, options]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={component?.options || options}
        />
      ))}
    </Tab.Navigator>
  )
}
