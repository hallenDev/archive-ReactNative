import * as React from 'react'

import { StyleSheet } from 'react-native'
import { useParticipant, VideoView } from '@livekit/react-native'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { colors } from '~/ui/theme'
import { useEffect } from 'react'

export const ParticipantView = ({
  style = {},
  participant,
  onCameraEnabled,
  onMicEnabled,
  zOrder = 0,
}) => {
  const { cameraPublication, microphonePublication } =
    useParticipant(participant)
  let videoPublication = cameraPublication

  const { colors } = useTheme()
  let videoView

  if (
    videoPublication &&
    videoPublication.isSubscribed &&
    !videoPublication.isMuted
  ) {
    videoView = (
      <VideoView
        style={styles.videoView}
        videoTrack={videoPublication?.videoTrack}
        zOrder={zOrder}
      />
    )
  } else {
    videoView = <View style={styles.videoView}></View>
  }

  const isTrackEnabled = pub => {
    return !(pub?.isMuted ?? true)
  }

  useEffect(() => {
    onCameraEnabled(isTrackEnabled(videoPublication))
  }, [videoPublication, isTrackEnabled])

  useEffect(() => {
    onMicEnabled(isTrackEnabled(microphonePublication))
  }, [microphonePublication, isTrackEnabled])

  return <View style={[styles.container, style]}>{videoView}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00153C',
  },
  spacer: {
    flex: 1,
  },
  videoView: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
})
