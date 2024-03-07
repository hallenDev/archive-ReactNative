import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from '~/ui/WebView'

const WebContent = ({ uri = '' }) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginVertical: 40,
    marginHorizontal: 20,
  },
})

export default WebContent
