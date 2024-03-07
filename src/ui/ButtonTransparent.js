import React from 'react'
import { StyleSheet, TouchableHighlight, Text } from 'react-native'
import noop from '~/utils/noop'
import { colors } from '~/ui/theme'

const ButtonTransparent = props => {
  const { children, onPress = noop, style = {} } = props

  return (
    <TouchableHighlight
      underlayColor="transparent"
      style={[styles.button, props.invert && styles.invert, style]}
      onPress={onPress}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, props.invert && styles.textInvert]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 36,
    minWidth: 107,
  },
  invert: {
    borderColor: colors.grey,
    backgroundColor: 'transparant',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  textInvert: {
    color: colors.grey,
  },
})

export default ButtonTransparent
