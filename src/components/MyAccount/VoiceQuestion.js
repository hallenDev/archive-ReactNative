import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import CircleButton from '~/ui/CircleButton'
import { Microphone, Pause } from '~/ui/icons'
import SvgVolumeUp from '~/ui/icons/VolumeUp'
import { colors, typography } from '~/ui/theme'

const VoiceQuestion = ({ answer, isRecord = false, onEdit }) => {
  const [isPlay, setIsPlay] = useState(false)
  const playerRef = useRef()

  const togglePlay = async () => {
    setIsPlay(play => !play)

    if (isPlay) {
      if (playerRef.current) {
        await playerRef.current.pausePlayer()
      }
    } else {
      if (playerRef.current) {
        playerRef.current.resumePlayer()
        return
      }

      playerRef.current = new AudioRecorderPlayer()

      await playerRef.current.startPlayer(`${answer.url}`)
      playerRef.current.addPlayBackListener(e => {
        if (e.duration === e.currentPosition) {
          setIsPlay(false)
          playerRef.current.removePlayBackListener()
          playerRef.current = null
        }
      })
    }
  }

  const stopPlayer = () => {
    setIsPlay(false)
    if (playerRef.current) {
      try {
        playerRef.current.stopPlayer()
        playerRef.current.removePlayBackListener()
      } catch (err) {}

      playerRef.current = null
    }
  }

  useEffect(() => () => stopPlayer(), [])

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{answer.question}</Text>
      <CircleButton
        isPrimary
        Icon={isPlay ? Pause : SvgVolumeUp}
        width={isPlay ? 15 : 20}
        height={isPlay ? 15 : 20}
        buttonStyle={styles.playBtn}
        onPress={togglePlay}
      />
      {isRecord && (
        <CircleButton
          isPrimary
          Icon={Microphone}
          width={20}
          height={20}
          buttonStyle={styles.playBtn}
          onPress={() => {
            stopPlayer()
            onEdit()
          }}
        />
      )}
    </View>
  )
}

export default VoiceQuestion

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: colors.voiceRecordBg,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.semiGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    ...typography.p2,
    color: colors.textMain,
    flexGrow: 1,
    flexShrink: 1,
  },
  playBtn: {
    width: 33,
    height: 33,
    marginLeft: 10,
  },
})
