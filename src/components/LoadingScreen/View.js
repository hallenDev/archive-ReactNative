import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

import logo from '~/assets/images/local/loading-spinner.png'

const LoadingScreen = () => (
  <View style={styles.loading}>
    <Image
      source={logo}
      style={styles.loadingBird}
      resizeMethod="scale"
      resizeMode="stretch"
    />
  </View>
)

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#5e336a',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBird: {
    width: 100,
    height: 100,
  },
})

export default LoadingScreen
