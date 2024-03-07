import React from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'
import { X } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const FilterPill = ({ params, onDelete }) => {
  let title = ''
  if ((params.interestValue || params.value) === 'Online flirting')
    title = 'Online Flirting'
  else title = params.interestValue || params.value

  return (
    <Pressable style={styles.container} onPress={() => onDelete(params)}>
      <Text style={styles.title}>{title}</Text>
      <X style={styles.icon} width="14" height="14" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.p3,
    color: colors.white,
    marginRight: 10,
    maxWidth: '95%',
  },
  icon: {
    color: colors.white,
  },
})

export default FilterPill
