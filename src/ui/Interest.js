import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import noop from '~/utils/noop'
import { colors } from '~/ui/theme'

const Interest = ({
  type = '',
  value = '',
  onPress = noop,
  active = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.interest,
        active ? styles.active : '',
        type ? styles[type] : '',
      ]}
      onPress={onPress}
    >
      <Text style={[styles.interestText, active ? styles.activeText : '']}>
        {value}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  interest: {
    backgroundColor: colors.borderGrey,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.pureBlack,
  },
  active: {
    backgroundColor: colors.successGreen,
  },
  activeText: {
    color: colors.whiteSystem,
  },
})

export default Interest
