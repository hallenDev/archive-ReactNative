import React from 'react'
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'

import { ChevronLeft } from '~/ui/icons'
import { colors } from '~/ui/theme'

const BackButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={() => {
      onPress()
      Keyboard.dismiss()
    }}
    style={styles.action}
  >
    <ChevronLeft width="22" height="22" color={colors.textSub} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  action: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default BackButton
