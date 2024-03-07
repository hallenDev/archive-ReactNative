import React, { useState } from 'react'
import { StyleSheet, Pressable, Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import VideoPlayerBtn from '~/ui/VideoPlayerBtn'
import { Video as VideoPlay } from '~/ui/icons/Solid'
import FastImage from 'react-native-fast-image'
import VideoPlayer from '~/ui/VideoPlayer'
import { colors } from '~/ui/theme'

const VideoElement = ({ uri, videoThumbUrl, isAutoplayVideoEnable }) => {
  const [poster, setPoster] = useState(!isAutoplayVideoEnable)

  if (poster) {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <VideoPlayerBtn
          action={() => setPoster(false)}
          className={{ top: '30%', left: '20%' }}
          Icon={VideoPlay}
        />
        <Image style={styles.image} source={{ uri: videoThumbUrl }} />
      </View>
    )
  }

  return <VideoPlayer uri={uri} videoThumbUrl={videoThumbUrl} isSmall />
}

const SmallPost = ({
  duid,
  contentId,
  url = '',
  isVideo = false,
  videoThumbUrl = '',
  isAutoplayVideoEnable = false,
}) => {
  const navigation = useNavigation()

  const handleGoToComments = () => {
    navigation.navigate('Comments', {
      contentId,
      duid,
    })
  }

  return (
    <Pressable style={styles.container} onPress={handleGoToComments}>
      {isVideo ? (
        <View style={{ width: '100%', height: '100%' }}>
          <VideoElement
            uri={url}
            videoThumbUrl={videoThumbUrl}
            isAutoplayVideoEnable={isAutoplayVideoEnable}
          />
        </View>
      ) : (
        <FastImage
          style={styles.image}
          source={{ uri: url }}
          resizeMode="cover"
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '33.33%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  menu: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiBlack50,
    borderRadius: 30,
  },
})

export default SmallPost
