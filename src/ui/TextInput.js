import React from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import noop from '~/utils/noop'

import { typography, colors } from '~/ui/theme'

const TextInput = ({
  placeholder = '',
  onChangeText = noop,
  value = '',
  multiline = false,
  maxLength,
  numberOfLines = 1,
  inputContainterStyle,
  secureTextEntry = false,
  style,
  ...rest // autoCapitalize | keyboardType
} = {}) => {
  const theme = useTheme()

  return (
    <View style={[styles.inputContainter(numberOfLines), inputContainterStyle]}>
      <RNTextInput
        style={[styles.input(numberOfLines), style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grey}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        textAlignVertical="top"
        selectionColor={colors.primary}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainter: numberOfLines => ({
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BDC7DB',

    height: numberOfLines <= 1 ? 48 : 'auto',
  }),
  input: numberOfLines => ({
    ...typography.bodyRegular14,
    color: colors.pureBlack,

    marginVertical: 12,
    marginHorizontal: 20,
    minHeight: numberOfLines > 1 ? numberOfLines * 20 + numberOfLines : 'auto',
  }),
})

export default TextInput
