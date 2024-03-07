import React from 'react'
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Image from '~/ui/Image'
import { useFullscreenMediaModalContext } from '~/context/fullscreen-media-modal-context'

const ChatImage = ({ attachmentUrl: uri = '' }) => {
  const { setMedia: setFullscreenMedia } = useFullscreenMediaModalContext()

  const size = Dimensions.get('window').width / 2

  return (
    <TouchableOpacity
      onPress={() => setFullscreenMedia({ type: 'PHOTO', uri })}
    >
      <Image
        style={styles.image(size)}
        source={{ uri }}
        width={size}
        height={size}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: size => ({
    width: size,
    height: size,
    borderRadius: 4,
    overflow: 'hidden',
  }),
})

export default ChatImage
