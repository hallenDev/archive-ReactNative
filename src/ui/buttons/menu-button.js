import React from 'react'
import { StyleSheet } from 'react-native'
import SvgDotsHorizontal from '~/ui/icons/DotsHorizontal'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors } from '~/ui/theme'

export default function MenuButton({ onPress }) {
  return (
    <PressableHighlight onPress={onPress} style={styles.button}>
      <SvgDotsHorizontal width="22" height="22" color={colors.textSub} />
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
