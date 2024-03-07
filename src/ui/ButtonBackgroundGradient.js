import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { LinearGradient } from '~/ui'
import { colors, typography } from '~/ui/theme'

const ButtonBackgroundGradient = ({ children, className }) => {
  return (
    <LinearGradient
      style={className}
      colors={colors.linerGradient}
      start={{ x: 1.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
    >
      {typeof children === 'string' ? (
        <Text style={styles.btnText}>{children}</Text>
      ) : (
        children
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  btnText: {
    ...typography.p3,
    color: colors.textMain,
  },
})

export default ButtonBackgroundGradient
