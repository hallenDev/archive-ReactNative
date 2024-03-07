import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet } from 'react-native'
import PressableHighlight from '../../ui/PressableHighlight'
import SvgVideo from '../../ui/icons/Video'
import Clabel from './ui/c-label'
import { colors } from '~/ui/theme'
import noop from '../../utils/noop'

const TIME_CLOSE_KEYBOARD = 500

const VideoChatBtn = ({ action = noop }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false)

  const onVideoChat = () => {
    if (keyboardStatus) {
      Keyboard.dismiss()
      setTimeout(() => {
        action()
      }, TIME_CLOSE_KEYBOARD)
    } else {
      action()
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <PressableHighlight
      style={styles.attachButton}
      onPress={onVideoChat}
      backgroundColor={colors.semiTransparentWhite15}
    >
      <Clabel Icon={SvgVideo} />
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  attachButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    height: 32,
    width: 32,
    borderRadius: 32,
  },
})

export default VideoChatBtn
