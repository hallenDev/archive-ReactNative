import React from 'react'
import { Pressable, Platform } from 'react-native'
import noop from '~/utils/noop'

const PressableHighlight = ({
  backgroundColor = 'rgba(0,0,0,0.1)',
  onPress = noop,
  children = null,
  style,
  disabled,
} = {}) => {
  return (
    <Pressable
      android_ripple={{
        color: backgroundColor,
      }}
      style={({ pressed }) => [
        style,
        pressed &&
          Platform.select({
            ios: {
              backgroundColor,
            },
          }),
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </Pressable>
  )
}

export default PressableHighlight
