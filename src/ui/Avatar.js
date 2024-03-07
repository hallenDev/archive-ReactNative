import React from 'react'
import { StyleSheet, View } from 'react-native'
import Image from '~/ui/ProgressiveImage'
import { colors } from '~/ui/theme'

const Avatar = ({
  uri = '',
  online = false,
  size = 40,
  resizeMode = 'contain',
}) => (
  <View style={styles.container}>
    <View style={styles.avatar}>
      {uri ? (
        <Image
          style={styles.image(size)}
          source={{ uri }}
          resizeMode={resizeMode}
        />
      ) : null}
    </View>
    {online && <View style={styles.online} />}
  </View>
)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: size => ({
    borderRadius: size,
    overflow: 'hidden',
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  online: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: colors.greenApprove,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.darkViolet,
    top: -2,
    right: -2,
  },
})

export default Avatar
