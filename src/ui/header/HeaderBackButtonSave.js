import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import noop from '~/utils/noop'
import { colors } from '~/ui/theme'

const HeaderBackButtonSave =
  (onPress = noop) =>
  () => {
    return (
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <Text style={styles.save}>Save</Text>
      </TouchableHighlight>
    )
  }

const styles = StyleSheet.create({
  save: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    color: colors.goodBlue,
  },
})

export default HeaderBackButtonSave
