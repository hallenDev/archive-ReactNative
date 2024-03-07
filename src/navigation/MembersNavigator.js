import React, { useState, useEffect, useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import useZendeskChat from '~/hooks/useZendeskChat'
import useConnectCentrifuge from '~/hooks/useConnectCentrifuge'
import NotificationMessage from '~/components/notification/NotificationMessage'
import { useThreadsUnreadTotal } from '~/context/ThreadsUnreadTotalContext'
import useFirebaseNotifications from '~/hooks/useFirebaseNotifications'
import useFirebaseMessage from '~/hooks/useFirebaseMessage'
import { BottomTabNavigator } from '~/components'
import LoginInformationChanged from '~/screens/members/LoginInformationChanged'
import VerifyDevice from '~/screens/members/VerifyDevice'
import ResetPasswordConfirm from '~/screens/members/ResetPasswordConfirm'
import CommentsScreen from '~/screens/members/CommentsScreen'
import AddMediaScreen from '~/screens/members/AddMediaScreen'
import UploadGuidelinesScreen from '~/screens/members/UploadGuidelinesScreen'
import ErrorScreen, {
  options as ErrorScreenOptions,
} from '~/screens/members/ErrorScreen'
import VideoChatScreen, {
  options as VideoChatScreenOptions,
} from '~/screens/members/VideoChatScreen'
import VerifyProfileScreen, {
  options as VerifyProfileScreenOptions,
} from '~/screens/members/MyAccount/Settings/VerifyProfileScreen'
import ReportCommentScreen from '~/screens/members/ReportCommentScreen'
import { useRedirectNotificationContext } from '~/context/RedirectNotificationContext'
import NotificationType from '~/components/notification/NotificationType'
import { useUser } from '~/context/UserContext'
import TermsOfUseScreen, {
  options as TermsOfUseScreenOptions,
} from '../screens/members/MyAccount/TermsOfUseScreen'
import AppStatusBar from '~/components/AppStatusBar'
import UserProfileScreen from '~/screens/members/UserProfileScreen'

const HOME_SCREEN_MAP = [
  [
    'LoginInformationChanged',
    LoginInformationChanged,
    null,
    'user/login_changed/:type/:email/:code',
  ],
  ['VerifyDevice', VerifyDevice, null, 'user/verify_device/:email/:token'],
  [
    'ResetPasswordConfirm',
    ResetPasswordConfirm,
    null,
    'resetpassword/:userId/:token',
  ],
  ['Comments', CommentsScreen],
  ['AddMedia', AddMediaScreen],
  ['UploadGuidelines', UploadGuidelinesScreen],
  ['ErrorScreen', ErrorScreen, ErrorScreenOptions],
  ['VideoChatScreen', VideoChatScreen, VideoChatScreenOptions],
  [
    'MyAccountVerifyProfileScreen',
    VerifyProfileScreen,
    VerifyProfileScreenOptions,
  ],
  ['ReportCommentScreen', ReportCommentScreen],
  ['TermsOfServiceScreen', TermsOfUseScreen, TermsOfUseScreenOptions],
  ['UserProfileScreen', UserProfileScreen],
]

const HomeStack = createNativeStackNavigator()

const MembersNavigator = ({ user }) => {
  const {
    user: { duid: myDuid },
  } = useUser()
  const navigation = useNavigation()
  const { notification, setNotification } = useRedirectNotificationContext()
  const [loading, setLoading] = useState(true)
  const [initialRoute, setInitialRoute] = useState('Home')
  const [, setUnreadTotal] = useThreadsUnreadTotal()

  const initialRouteName =
    user?.primaryPicSet || !user.profilePic?.toLowerCase().includes('nopic')
      ? 'Trending'
      : 'MyAccount'

  useZendeskChat()
  useFirebaseNotifications({ navigation, setInitialRoute, setLoading })
  useFirebaseMessage(() => setUnreadTotal(s => s + 1))
  useConnectCentrifuge()

  const handleRedirectNotification = useCallback(
    notification => {
      const { otherUserId, type, content_id } = notification?.data || {}
      if (
        type === NotificationType.NEW_MESSAGE ||
        type === NotificationType.VIDEO_CHAT
      ) {
        navigation.navigate('Chat', { otherUserId })
      } else if (
        type === NotificationType.ACCOUNT_UPDATED ||
        type === NotificationType.LEVEL_UP_PROFILE
      ) {
        navigation.navigate('MyAccount')
      } else if (
        type === NotificationType.MUTUAL_MATCH ||
        type === NotificationType.MATCH_LIKE ||
        type === NotificationType.FAVORITE_ADDED ||
        type === NotificationType.NEW_FRIEND ||
        type === NotificationType.FRIEND_REQUEST ||
        type === NotificationType.FRIEND_SUGGESTION
      ) {
        navigation.navigate('UserProfileScreen', { duid: otherUserId })
      } else if (
        type === NotificationType.COMMENT_CONTENT ||
        type === NotificationType.COMMENT_VIDEO
      ) {
        if (content_id) {
          navigation.navigate('Comments', {
            contentId: content_id,
            duid: myDuid,
          })
        }
      }
    },
    [myDuid, navigation],
  )

  useEffect(() => {
    if (notification && !loading) {
      handleRedirectNotification(notification)
      setNotification(null)
    }
  }, [notification, loading, handleRedirectNotification, setNotification])

  if (loading || !user?.accountStatus) return null

  return (
    <>
      <AppStatusBar />

      <HomeStack.Navigator initialRouteName={initialRoute}>
        <HomeStack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false, initialRouteName }}
          initialRouteName={initialRouteName}
          initialParams={{ initialRouteName }}
        />

        <HomeStack.Group>
          {HOME_SCREEN_MAP.map(([name, component, options, path]) => (
            <HomeStack.Screen
              key={name}
              name={name}
              component={component}
              options={options}
              path={path}
            />
          ))}
        </HomeStack.Group>
      </HomeStack.Navigator>

      <NotificationMessage />
    </>
  )
}

export default MembersNavigator
