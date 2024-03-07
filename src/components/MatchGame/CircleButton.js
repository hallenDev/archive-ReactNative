import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '~/ui/theme'

const CircleButton = ({ Icon, onPress, disabled, bgColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrap, { backgroundColor: bgColor }]}
      disabled={disabled}
    >
      <Icon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
})

export default CircleButton
