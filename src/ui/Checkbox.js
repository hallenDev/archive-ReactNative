import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import noop from '~/utils/noop'
import LinearGradient from '~/ui/LinearGradient'
import { colors } from '~/ui/theme'
import SvgStroke from '~/ui/icons/Stroke'

const Checkbox = ({ onPress = noop, type = '', active = false, size = 24 }) => (
  <TouchableOpacity onPress={onPress}>
    {active ? (
      <LinearGradient
        colors={colors.baseGraient}
        style={[styles.icon(size), styles[type], styles.active]}
      >
        <SvgStroke
          width={size / 2}
          height={size / 2}
          color={colors.whiteSystem}
        />
      </LinearGradient>
    ) : (
      <View style={[styles.icon(size), styles[type]]} />
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  icon: size => ({
    width: size || 18,
    height: size || 18,
    borderWidth: 1,
    borderColor: colors.whiteSystem,
    borderRadius: size || 9,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  active: {
    borderWidth: 0,
  },
  grey: {
    borderColor: colors.grey,
  },
})

export default Checkbox
