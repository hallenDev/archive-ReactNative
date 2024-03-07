import React from 'react'
import { StyleSheet, Pressable } from 'react-native'

import percentage from '~/utils/percentage'

import { Search } from '~/ui/icons'

import { colors, text } from '~/ui/theme'

const FilterButton = ({ showSearchModal, style }) => (
  <Pressable onPress={showSearchModal} style={[style, styles.container]}>
    <Search width={20} height={20} color={colors.textMain} />
  </Pressable>
)

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    backgroundColor: colors.semiBlack25,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: text.regular.fontFamily,
    fontSize: 8,
    lineHeight: percentage(8, 120),
    letterSpacing: 0,
    color: colors.textSub,
  },
})

export default FilterButton
