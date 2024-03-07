import { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useNavigationState } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'

import useFirebaseMessage from '~/hooks/useFirebaseMessage'
import NotificationType from './NotificationType'
import { useUser } from '~/context/UserContext'

const NotificationMessage = () => {
  const {
    user: { duid: myDuid },
  } = useUser()
  const toast = useToast()
  const navigation = useNavigation()
  const routes = useNavigationState(state => state?.routes)
  const toastIdsRef = useRef([])
  const currentRouteName = useRef('Home')

  const routeHistory = (
    routes?.[routes?.length - 1]?.state?.history || []
  ).filter(h => h.type === 'route')
  currentRouteName.current =
    routeHistory.length > 0 ? routeHistory[routeHistory.length - 1].key : 'Home'

  useFirebaseMessage(remoteMessage => {
    const {
      data: { type },
    } = remoteMessage

    if (!Object.values(NotificationType).includes(type)) return

    if (
      (type === NotificationType.NEW_MESSAGE ||
        type === NotificationType.VIDEO_CHAT) &&
      currentRouteName.current.indexOf('Chat') === 0
    ) {
      return
    }

    const toastId = toast.show('', {
      type: 'notification_type',
      data: {
        notification: { ...remoteMessage },
        handleNotification,
        closeHandler,
      },
    })

    toastIdsRef.current.push({ messageId: remoteMessage.messageId, toastId })
  })

  const closeHandler = notification => {
    const idx = toastIdsRef.current.findIndex(
      t => t.messageId === notification.messageId,
    )

    if (idx !== -1) {
      toast.hide(toastIdsRef.current[idx].toastId)
      toastIdsRef.current.splice(idx, 1)
    }
  }

  const handleNotification = notification => {
    closeHandler(notification)

    const { data } = notification || {}

    const { otherUserId, type: notificationType, content_id } = data || {}

    if (
      notificationType === NotificationType.NEW_MESSAGE ||
      notificationType === NotificationType.VIDEO_CHAT
    ) {
      navigation.navigate('Chat', { otherUserId })
    } else if (
      notificationType === NotificationType.ACCOUNT_UPDATED ||
      notificationType === NotificationType.LEVEL_UP_PROFILE
    ) {
      navigation.navigate('MyAccount')
    } else if (
      notificationType === NotificationType.MUTUAL_MATCH ||
      notificationType === NotificationType.MATCH_LIKE ||
      notificationType === NotificationType.FAVORITE_ADDED ||
      notificationType === NotificationType.NEW_FRIEND ||
      notificationType === NotificationType.FRIEND_REQUEST ||
      notificationType === NotificationType.FRIEND_SUGGESTION
    ) {
      navigation.navigate('UserProfileScreen', { duid: otherUserId })
    } else if (
      notificationType === NotificationType.COMMENT_CONTENT ||
      notificationType === NotificationType.COMMENT_VIDEO
    ) {
      if (content_id) {
        navigation.navigate('Comments', {
          contentId: content_id,
          duid: myDuid,
        })
      }
    }
  }

  return null
}

export default NotificationMessage
