import React from 'react'
import { StyleSheet, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { colors } from '~/ui/theme'

const PhotoCarousel = ({ photoList = [], autoplayInterval = 2000 }) => (
  <Carousel
    layout="default"
    data={photoList}
    sliderWidth={500}
    itemWidth={75}
    loop
    lockScrollWhileSnapping
    autoplay
    scrollEnabled={false}
    inactiveSlideOpacity={1}
    autoplayInterval={autoplayInterval}
    renderItem={item => <Image style={styles.image} source={item.item} />}
  />
)

const styles = StyleSheet.create({
  image: {
    height: 109,
    width: 73,
    borderRadius: 5,
    marginHorizontal: 6,
    borderWidth: 0.5,
    borderColor: colors.primary2,
  },
})

export default PhotoCarousel
