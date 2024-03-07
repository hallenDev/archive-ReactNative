import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import Image from '~/ui/Image'
import SvgX from '~/ui/icons/X'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'
import NotificationType from './NotificationType'
import SiteMasterIcon from '~/assets/images/local/site-master.png'

const NotificationToast = ({ data: notificationData }) => {
  const { notification, handleNotification, closeHandler } = notificationData

  const { data, notification: notificationPayload } = notification || {}

  console.log(notificationData)

  const { type, username, avatar, message } = data || {}
  const { body } = notificationPayload || {}

  const isSystemNotification =
    type === NotificationType.LEVEL_UP_PROFILE ||
    type === NotificationType.ACCOUNT_UPDATED

  return (
    <View style={styles.container}>
      <View
        style={styles.centeredView}
        onPress={() => closeHandler(notification)}
      >
        <View style={styles.modalView}>
          <PressableHighlight
            style={styles.content}
            onPress={() => handleNotification(notification)}
          >
            <Image
              style={styles.image}
              source={isSystemNotification ? SiteMasterIcon : { uri: avatar }}
            />
            <View style={styles.center}>
              <Text style={styles.username}>
                {isSystemNotification ? 'Site Master' : username}
              </Text>
              <Text style={styles.message}>
                {type === NotificationType.NEW_MESSAGE ? body : message}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => closeHandler(notification)}
            >
              <SvgX width="24" height="24" color={colors.placeholder} />
            </TouchableOpacity>
          </PressableHighlight>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  modalView: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.bgBlack,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.semiBlack25,
  },
  center: {
    flex: 1,
    marginHorizontal: 8,
  },
  username: {
    ...typography.p3,
    color: colors.textMain,

    marginBottom: 4,
  },
  message: {
    ...typography.p3,
    color: colors.textSub,
  },
  closeButton: {
    borderRadius: 24,
  },
})

export default NotificationToast
