import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import FeedType from '~/shared/types/FeedType'
import { CaretDown } from '~/ui/icons/Solid'
import { colors, typography } from '~/ui/theme'

const RecentButton = ({ filter, toggleModal }) => {
  const selectedFilterText = FeedType[filter] || 'Recent'
  return (
    <Pressable style={styles.recentContainer} onPress={toggleModal}>
      <Text style={styles.text}>{selectedFilterText} </Text>
      <CaretDown width="16" height="16" color={colors.primary} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  recentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.h3,
    color: colors.textMain,
  },
})

export default RecentButton
