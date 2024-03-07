import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'

import noop from '~/utils/noop'

import { Coin } from '~/ui/icons'

import { colors } from '~/ui/theme'
import { buttonStyles as styles } from '~/styles'

const Button = ({
  children,
  onPress = noop,
  style = {},
  textStyle = {},
  credits,
  iconSize = 20,
  type,
  loading,
  Chevron = () => null,
  IconLeft = () => null,
  IconRight = () => null,
  isDisabled = false,
}) => (
  <TouchableOpacity
    disabled={isDisabled}
    style={[styles.button, type ? styles[`${type}Container`] : '', style]}
    onPress={loading ? noop : onPress}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} />
    ) : (
      <>
        <IconLeft
          width={iconSize}
          height={iconSize}
          style={[
            styles.chevron,
            type ? styles[`${type}Chevron`] : '',
            { marginRight: 5 },
          ]}
        />
        {typeof children === 'string' ? (
          <Text
            style={[styles.text, type ? styles[`${type}Text`] : '', textStyle]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        <IconRight
          width={iconSize}
          height={iconSize}
          style={[
            styles.chevron,
            type ? styles[`${type}Chevron`] : '',
            { marginLeft: 5 },
          ]}
        />
        {credits && (
          <View style={styles.credits}>
            <Coin width={10} height={10} color={colors.primary} />
            <Text style={styles.creditsTxt}>{credits}</Text>
          </View>
        )}
        <Chevron
          width={iconSize}
          height={iconSize}
          style={[styles.chevron, type ? styles[`${type}Chevron`] : '']}
        />
      </>
    )}
  </TouchableOpacity>
)

export default Button
