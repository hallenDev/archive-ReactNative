import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { colors } from '~/ui/theme'

const AvatarSquare = ({
  uri = '',
  online = false,
  size = 100,
  borderRadius = 10,
  isLoading = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {isLoading ? (
          <View style={styles.image(size, borderRadius)}>
            <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
              <Rect rx="10" ry="10" width="100" height="100" />
            </ContentLoader>
          </View>
        ) : uri ? (
          <FastImage
            style={styles.image(size, borderRadius)}
            source={{ uri }}
            resizeMode="cover"
          />
        ) : null}
      </View>
      {online && <View style={styles.online} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: (size, borderRadius) => ({
    borderRadius: borderRadius,
    overflow: 'hidden',
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiBlack25,
  }),
  online: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: colors.greenApprove,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.darkViolet,
    top: -5,
    right: -5,
  },
})

export default AvatarSquare
