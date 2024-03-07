import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Eye from '~/ui/icons/Eye'
import EyeOff from '~/ui/icons/EyeOff'
import { colors } from '~/ui/theme'
import noop from '~/utils/noop'

const WithSecureTextEntryIcon = ({
  children,
  color = colors.grey,
  size = '24',
  style,
  value,
  onPress = noop,
}) => {
  return (
    <View style={styles.container}>
      {children}
      <TouchableWithoutFeedback onPress={onPress}>
        {!value ? (
          <Eye
            width={size}
            height={size}
            color={color}
            style={[styles.icon, style]}
          />
        ) : (
          <EyeOff
            width={size}
            height={size}
            color={color}
            style={[styles.icon, style]}
          />
        )}
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
})

export default WithSecureTextEntryIcon
