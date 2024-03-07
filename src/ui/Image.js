import React from 'react'
import { Animated } from 'react-native'
import FastImage from 'react-native-fast-image'

const Image = props => {
  const imageScaleValue = new Animated.Value(0)

  const handleLoadEnd = () => {
    Animated.timing(imageScaleValue, {
      toValue: 1,
      duration: 150,
      delay: 5,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View style={{ opacity: imageScaleValue }}>
      <FastImage
        onLoadEnd={handleLoadEnd}
        source={{
          uri: props?.uri,
          priority: FastImage.priority.high,
        }}
        {...props}
      />
    </Animated.View>
  )
}

export default Image
