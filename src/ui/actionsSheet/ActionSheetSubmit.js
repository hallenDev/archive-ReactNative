import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Button from '~/ui/Button'
import noop from '~/utils/noop'
import { typography, colors } from '~/ui/theme'

const ActionSheetSubmit = ({ title = '', submitText = '', onPress = noop }) => (
  <>
    <Text style={styles.title}>{title}</Text>
    <Button onPress={onPress}>{submitText}</Button>
  </>
)

const styles = StyleSheet.create({
  title: {
    ...typography.subtitle2Semibold,
    color: colors.mainBlack,
    marginBottom: 20,
  },
})

export default ActionSheetSubmit
