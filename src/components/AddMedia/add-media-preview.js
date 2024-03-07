import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

import VideoPlayer from '~/ui/VideoPlayer'

const height = (Dimensions.get('window').width - 40 - 12) * 1.2
const width = Dimensions.get('window').width - 40 - 12

export default function AddMediaPreview({
  uri = '',
  isVideo = false,
  isStopVideo,
}) {
  return (
    <View style={styles.container}>
      {isVideo ? (
        <View style={{ width, height, flex: 1 }}>
          <VideoPlayer uri={uri} isStopVideo={isStopVideo} />
        </View>
      ) : (
        <Image style={styles.image} resizeMode="cover" source={{ uri }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    flex: 1,
  },
})
