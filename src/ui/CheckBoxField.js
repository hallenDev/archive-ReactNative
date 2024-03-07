import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Controller } from 'react-hook-form'

import noop from '~/utils/noop'

import { Tick } from '~/ui/icons'
import { checkboxStyles as styles } from '~/styles'

export const CheckBox = ({
  onPress = noop,
  type = '',
  checked = true,
  size = 22,
}) => (
  <TouchableOpacity onPress={onPress}>
    {checked ? (
      <View style={[styles.icon(size), styles.active]}>
        <Tick
          width={size / 1.3}
          height={size / 1.3}
          color={styles.active.borderColor}
        />
      </View>
    ) : (
      <View style={[styles.icon(size), styles[type]]} />
    )}
  </TouchableOpacity>
)

const CheckBoxField = ({ checked = false, name, ...props }) => (
  <Controller
    name={name}
    render={({ field: { value = checked, onChange } }) => (
      <CheckBox
        checked={!!value}
        {...props}
        onPress={() => {
          onChange(!value)
        }}
      />
    )}
  />
)

export default CheckBoxField
