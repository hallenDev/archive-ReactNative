import React from 'react'
import { decode } from 'html-entities'
import { StyleSheet, View, Text } from 'react-native'

import { countAbbreviatedForm } from '~/shared/utils/count-abbreviated-form'
import TagType from '~/shared/types/TagType'
import Avatar from '~/ui/Avatar'
import { typography, colors } from '~/ui/theme'
import { formatInboxDate } from '~/utils/datetime'
import { useNavigation } from '@react-navigation/native'
import PressableHighlight from '~/ui/PressableHighlight'

const MessageDescription = {
  [TagType.ATTACHMENT]: '🖼 Image',
  [TagType.VIDEO_ATTACHMENT]: '🎥 Video',
  [TagType.AUDIO_ATTACHMENT]: '▶ Audio',
  [TagType.PRIVATE_VIDEO_CHAT]: 'Prvate Videochat',
}

const InboxItem = ({
  thread_id = '',
  msg_system_id = '',
  username = '',
  message = '',
  pg_pic: uri = '',
  online = false,
  unread_total: unreadCount = 0,
  other_duid: otherUserId = '',
  ctime = '',
  tag = [],
}) => {
  const navigation = useNavigation()
  const unreadCountTxt = countAbbreviatedForm(unreadCount)

  const handleGoToChat = () => {
    navigation.navigate('Chat', {
      otherUserId,
    })
  }

  let text = message ? decode(message) : ''
  Object.entries(MessageDescription).forEach(([key, value]) => {
    if (tag?.includes(key)) {
      text = value
    }
  })

  if (msg_system_id === '688') {
    text = '📹 Private videochat'
  }

  const time = formatInboxDate(ctime)

  return (
    <PressableHighlight style={styles.container} onPress={handleGoToChat}>
      <View>
        <Avatar uri={uri} online={online} />
      </View>
      <View style={styles.content}>
        <View style={styles.chatItemInfo}>
          <View style={styles.row}>
            <Text style={styles.title} numberOfLines={1}>
              {username}
            </Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.description} numberOfLines={1}>
              {text}
            </Text>
            {unreadCount > 0 && (
              <View style={styles.count}>
                <Text style={styles.countText}>{unreadCountTxt}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

    // paddingBottom: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  chatItemInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    ...typography.p2,
    color: colors.textMain,
    flex: 1,
  },
  description: {
    ...typography.p3,
    color: colors.textSub,

    flex: 1,
  },
  count: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    ...typography.p3,
    color: colors.white,
  },
  time: {
    ...typography.c2,
    color: colors.textSub,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default InboxItem
