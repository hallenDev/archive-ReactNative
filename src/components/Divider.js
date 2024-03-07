import React from 'react'
import { View } from 'react-native'
import { colors } from '~/ui/theme'

const Divider = ({ gap = 16, color = colors.bgGradient[0] }) => {
  return (
    <View style={{ height: 1, marginVertical: gap, backgroundColor: color }} />
  )
}

export default Divider
