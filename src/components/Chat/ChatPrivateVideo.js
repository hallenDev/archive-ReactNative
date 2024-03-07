import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from '~/ui'
import { VideoCamera } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const ChatPrivateVideo = ({ call_ended, otherUserId, navigation }) => {
  const joinVideoChat = () => {
    navigation.navigate('VideoChatScreen', { duid: otherUserId })
  }

  return (
    <TouchableOpacity style={styles.wrapper}>
      <Text style={styles.text}>
        {call_ended ? 'Call ended' : 'Private videochat'}
      </Text>
      {!call_ended && (
        <Button
          type="accept"
          IconLeft={VideoCamera}
          style={styles.joinBtn}
          onPress={joinVideoChat}
        >
          Join
        </Button>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.p2,
    color: colors.textSub,
  },
  joinBtn: {
    marginLeft: 10,
  },
})

export default ChatPrivateVideo
