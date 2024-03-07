import React from 'react'
import { StyleSheet, Animated } from 'react-native'

const styles = StyleSheet.create({
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
})

const ProgressiveImage = ({
  thumbnailSource,
  source,
  style,
  containerStyle,
  ...props
}) => {
  let thumbnailAnimated = new Animated.Value(0),
    imageAnimated = new Animated.Value(0)

  const handleThumbnailLoad = () => {
      Animated.timing(thumbnailAnimated, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    },
    onImageLoad = () => {
      Animated.timing(imageAnimated, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    }

  return (
    <>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[style, { opacity: thumbnailAnimated }]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
        onLoad={onImageLoad}
      />
    </>
  )
}

export default ProgressiveImage
