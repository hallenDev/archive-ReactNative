import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { colors } from '~/ui/theme'

const VideoPlayerBtn = ({ Icon, action, className }) => (
  <Pressable onPress={action} style={[styles.containerBtn, className]}>
    <Icon width="16" height="16" style={styles.svg} />
  </Pressable>
)

const styles = StyleSheet.create({
  containerBtn: {
    width: 60,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.semiBlack50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  svg: {
    color: colors.white,
  },
})

export default VideoPlayerBtn
