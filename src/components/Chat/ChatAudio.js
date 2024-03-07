import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import CircleButton from '~/ui/CircleButton'
import { Pause } from '~/ui/icons'
import { Play } from '~/ui/icons/Solid'
import { colors } from '~/ui/theme'
import Equalizer from '../Equalizer/Equalizer'
import {
  stopPlayer,
  startPlayer,
  AUDIO_STATUS,
  pausePlayer,
} from './AudioManager'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

const ChatAudio = ({ attachmentAudioUrl = '', ...props }) => {
  const isFocused = useIsFocused()
  const [isPlay, setIsPlay] = useState(false)
  const [playProgress, setPlayProgress] = useState(0)
  console.log('isPlay', isPlay)

  const toggleRecord = async () => {
    if (isPlay) {
      await pausePlayer()
    } else {
      console.log('aaa')
      await startPlayer(attachmentAudioUrl, res => {
        const { status } = res
        console.log(status)
        switch (status) {
          case AUDIO_STATUS.begin: {
            setIsPlay(true)
            break
          }
          case AUDIO_STATUS.play: {
            const { currentPosition, duration } = res.data
            setPlayProgress(currentPosition / duration)

            if (currentPosition === duration) {
              setIsPlay(false)
            }
            break
          }
          case AUDIO_STATUS.pause: {
            setIsPlay(false)
            break
          }
          case AUDIO_STATUS.resume: {
            setIsPlay(false)
            break
          }
          case AUDIO_STATUS.stop: {
            setIsPlay(false)
            setPlayProgress(0)
            break
          }
        }
      })
    }
  }

  useEffect(() => {
    if (!isFocused) {
      try {
        stopPlayer()
      } catch (e) {}
    }
  }, [isFocused])

  return (
    <TouchableOpacity style={styles.wrapper}>
      <CircleButton
        isPrimary
        buttonStyle={styles.play}
        Icon={isPlay ? Pause : Play}
        width={isPlay ? 24 : 30}
        height={isPlay ? 24 : 30}
        onPress={toggleRecord}
      />

      <Equalizer
        frequencyData={[]}
        containerStyle={styles.waveform}
        mode={'play'}
        height={50}
        playProgress={playProgress}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingHorizontal: 12,
    backgroundColor: colors.voiceRecordBg,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
  },
  play: {
    backgroundColor: colors.bgBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    width: 150,
    marginLeft: 10,
    marginVertical: 10,
  },
})

export default ChatAudio
