import React from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { colors, typography } from '~/ui/theme'

const RadioInput = ({
  filterType,
  filterName,
  pressAction,
  isChecked = false,
}) => {
  return (
    <Pressable style={styles.container} onPress={() => pressAction(filterType)}>
      <View style={styles.radioBtn}>
        {isChecked && <View style={styles.checked} />}
      </View>
      <Text style={styles.text}>{filterName}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 17,
    height: 17,
    borderRadius: 17,
    backgroundColor: colors.primary,
  },
  text: {
    ...typography.p1,
    color: colors.textSub,
    marginLeft: 20,
  },
})

export default RadioInput
