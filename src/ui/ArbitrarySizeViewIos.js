import React from 'react'
import { View, Platform } from 'react-native'

const ARBITRARY_SIZE = 1000

const ArbitrarySizeViewIos = ({ backgroundColor }) => {
  if (Platform.OS !== 'ios') return null

  return (
    <View
      style={{
        backgroundColor,
        height: ARBITRARY_SIZE,
        position: 'absolute',
        top: -ARBITRARY_SIZE,
        left: 0,
        right: 0,
      }}
    />
  )
}

export default ArbitrarySizeViewIos
