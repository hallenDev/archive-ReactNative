import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Image from '~/ui/Image'
import Play from '~/ui/icons/Play'
import { useFullscreenMediaModalContext } from '~/context/fullscreen-media-modal-context'

const ChatVideo = ({
  attachmentVideoThumbUrl = '',
  attachmentVideoUrl = '',
}) => {
  const { setMedia: setFullscreenMedia } = useFullscreenMediaModalContext()

  const size = Dimensions.get('window').width / 2

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() =>
        setFullscreenMedia({
          type: 'VIDEO',
          poster: attachmentVideoThumbUrl,
          uri: attachmentVideoUrl,
        })
      }
    >
      <Image
        style={styles.image(size)}
        source={{ uri: attachmentVideoThumbUrl }}
        width={size}
        height={size}
        resizeMode="cover"
      />
      <View style={styles.play}>
        <Play width={size / 2} height={size / 2} fill="#fff" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  play: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: size => ({
    width: size,
    height: size,
    borderRadius: 4,
    overflow: 'hidden',
  }),
})

export default ChatVideo
