import React from 'react'
import { Text } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import LinearGradient from 'react-native-linear-gradient'

const GradientText = props => {
  const { colorsList, ...lastProps } = props

  return (
    <MaskedView maskElement={<Text {...lastProps} />}>
      <LinearGradient
        colors={colorsList}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...lastProps} style={[lastProps.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}

export default GradientText
