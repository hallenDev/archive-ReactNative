import React from 'react'
import { colors } from '~/ui/theme'
import PressableHighlight from '~/ui/PressableHighlight'
import SvgPaperAirplane from '~/ui/icons/PaperAirplane'
import { StyleSheet } from 'react-native'
import { TabItemBg } from '~/ui/icons'

const ChatSendBtn = ({ onPress = () => {} }) => {
  return (
    <PressableHighlight
      backgroundColor={colors.transparent}
      style={styles.sendButton}
      onPress={onPress}
    >
      <TabItemBg width={39} height={34} style={styles.bg} fill={colors.white} />
      <SvgPaperAirplane
        width={20}
        height={20}
        color={colors.text}
        style={styles.icon}
      />
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 32,
    width: 32,
  },
  bg: {
    opacity: 0.9,
    zIndex: -1,
  },
  icon: {
    position: 'absolute',
  },
})

export default ChatSendBtn
