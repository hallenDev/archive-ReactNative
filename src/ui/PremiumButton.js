import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import LinearGradient from '~/ui/LinearGradient'

import noop from '~/utils/noop'

import { Premium } from '~/ui/icons'

import { typography, colors } from '~/ui/theme'

const PremiumButton = props => {
  const {
    children,
    onPress = noop,
    style = {},
    disabled = false,
    type,
    isLoading,
  } = props

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type ? styles[`${type}Container`] : '',
        disabled ? styles.disabled : '',
        style,
      ]}
      onPress={disabled || isLoading ? noop : onPress}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={colors.goldGradient}
        style={styles.bg}
      >
        <View style={styles.body}>
          {isLoading ? (
            <ActivityIndicator color={colors.pureBlack} />
          ) : (
            <>
              <Premium
                width={24}
                height={24}
                color={colors.pureBlack}
                style={styles.icon}
              />
              {typeof children === 'string' ? (
                <Text style={[styles.text]}>{children}</Text>
              ) : (
                children
              )}
            </>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    backgroundColor: '#FF2B00',
    minHeight: 48,
    minWidth: 107,
    overflow: 'hidden',
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typography.bodyBold14,
    lineHeight: 20,
    color: colors.pureBlack,
  },
})

export default PremiumButton
