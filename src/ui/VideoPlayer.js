import { useIsFocused } from '@react-navigation/native'
import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Video from '~/ui/Video'
import VideoPlayerBtn from '~/ui/VideoPlayerBtn'
import globalStyle from '~/ui/globalStyle'
import { Pause } from '~/ui/icons'
import { Video as VideoPlay, VolumeDown, VolumeUp } from './icons/Solid'

const VideoPlayer = ({
  videoThumbUrl = '',
  uri = '',
  stylesList,
  isFullScreen,
  isStopVideo,
  isSmall,
}) => {
  const isFocused = useIsFocused()
  const [isPause, setPause] = useState(false)
  const [isMute, setMute] = useState(true)

  const onTogglePause = useCallback(() => {
    setPause(s => !s)
  }, [])

  const onToggleMute = useCallback(() => {
    setMute(s => !s)
  }, [])

  useEffect(() => {
    setMute(true)
  }, [isFocused])

  useEffect(() => {
    if (isStopVideo !== undefined) {
      setPause(isStopVideo)
    }
  }, [isStopVideo])

  return (
    <View style={styles.container}>
      <VideoPlayerBtn
        action={onTogglePause}
        className={[
          isFullScreen ? styles.playBtnFullScreen : styles.playBtn,
          isSmall && styles.smallBtn,
        ]}
        Icon={isPause ? VideoPlay : Pause}
      />
      <VideoPlayerBtn
        action={onToggleMute}
        className={[
          isFullScreen ? styles.muteBtnFullScreen : styles.muteBtn,
          isSmall && styles.smallBtn,
        ]}
        Icon={isMute ? VolumeDown : VolumeUp}
      />
      <Video
        style={[stylesList ? stylesList : globalStyle.absolute]}
        poster={videoThumbUrl}
        source={{ uri }}
        repeat
        muted={isMute}
        resizeMode="contain"
        paused={isPause}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  playBtn: {
    bottom: 5,
    left: 10,
  },
  muteBtn: {
    top: 5,
    left: 10,
  },
  playBtnFullScreen: {
    bottom: 50,
    left: 20,
  },
  muteBtnFullScreen: {
    bottom: 50,
    right: 20,
  },
  smallBtn: {
    width: 28,
    height: 28,
  },
})

export default VideoPlayer
