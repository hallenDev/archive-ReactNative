import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { colors, typography } from '~/ui/theme'

const EditItem = ({ title, info, onPress = () => null }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {!!info && (
        <Text style={styles.info} numberOfLines={1}>
          {info}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.semiTransparentWhite30,
  },
  title: {
    ...typography.p1b,
    color: colors.textMain,
  },
  info: {
    ...typography.p2,
    color: colors.textSub,
  },
})

export default EditItem
