import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { colors } from '~/ui/theme'

const RadioButton = ({ checked, onPress, className }) => (
  <Pressable style={[styles.radioButton, className]} onPress={onPress}>
    {checked && <View style={styles.checked} />}
  </Pressable>
)

const styles = StyleSheet.create({
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: colors.semiBlack50,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
})

export default RadioButton
