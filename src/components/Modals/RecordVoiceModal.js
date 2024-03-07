import React, { useRef, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  Pressable,
  Modal,
  View,
  Platform,
} from 'react-native'
import { useQueryClient } from 'react-query'
import { Buffer } from 'buffer'
import useMsgAttach from '~/hooks/useMsgAttach'
import { showNotificationError } from '~/services/in-app-notifications'
import PressableHighlight from '~/ui/PressableHighlight'
import noop from '~/utils/noop'
import { colors, typography } from '~/ui/theme'
import { Microphone, RightChevronLarge, X } from '~/ui/icons'
import { useState } from 'react'
import { LinearGradient } from '~/ui'
import CircleButton from '~/ui/CircleButton'
import SvgStopRecord from '~/ui/icons/StopRecord'
import SvgPause from '~/ui/icons/Pause'
import { Play } from '~/ui/icons/Solid'
import Equalizer from '../Equalizer/Equalizer'
import AudioRecord from 'react-native-audio-record'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import useCanPurchaseCredits from '~/hooks/useCanPurchaseCredits'
import useSpendCredits from '~/hooks/useSpendCredits'
import requestMicrophonePermission from '~/utils/requestMicrophonePermission'

const SEND_PRIVATE_ATTACHMENT = 'send_private_attachment'
const AUDIO_MAXIMUM_LENGTH = 60

const RecordVoiceModal = ({
  modalVisible = false,
  setModalVisible,
  setIsLoadingUpload = noop,
  otherUserId,
}) => {
  const queryClient = useQueryClient()
  const canPurchaseCredits = useCanPurchaseCredits()
  const onSpendCredits = useSpendCredits()
  const [audioFile, setAudioFile] = useState()
  const [isListenRecord, setListenRecord] = useState(false)
  const [isStartRecord, setStartRecord] = useState(false)
  const [frequencyData, setFrequencyData] = useState([])
  const [isPlay, setIsPlay] = useState(false)
  const [time, setTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)
  const playerRef = useRef()
  const timerRef = useRef()
  const isAudioRecordedRef = useRef()

  const upload = useMsgAttach({
    options: {
      otherUserId,
      type: 'audio',
    },
    onUploadStart: () => setIsLoadingUpload(true),
    onUploadEnd: () => setIsLoadingUpload(false),
    onSuccess: () => queryClient.invalidateQueries(['msgThread', otherUserId]),
    onError: description => {
      showNotificationError({
        message: description,
      })
    },
  })

  const requestCloseHandler = () => {
    cancelRecord()
    setModalVisible(!modalVisible)
  }
  const attachMediaHandler = () => {
    if (!audioFile) return

    if (canPurchaseCredits) {
      onSpendCredits(otherUserId, SEND_PRIVATE_ATTACHMENT, () =>
        upload({
          type: 'audio/wav',
          uri: audioFile,
        }),
      )
    }

    requestCloseHandler()
  }

  const startRecord = async () => {
    const prevTime = Date.now()

    if (Platform.OS === 'android') {
      const res = await requestMicrophonePermission()
      if (!res) return
    }

    isAudioRecordedRef.current = false

    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'audio.wav', // default 'audio.wav'
    }

    AudioRecord.init(options)
    AudioRecord.start()

    if (Date.now() - prevTime > 500) {
      stopRecord()
      return
    }

    AudioRecord.on('data', data => {
      isAudioRecordedRef.current = true
      const chunk = Buffer.from(data, 'base64')
      const int8Arr = new Uint8Array(chunk)
      const int16Arr = new Uint16Array(int8Arr.buffer)
      const sint16Arr = []
      for (let i = 0; i < int16Arr.length; i++) {
        const f = Math.sqrt((1.5 * Math.abs((int16Arr[i] << 16) >> 16)) / 32767)
        sint16Arr[i] = Math.min(150, f * 450)
        sint16Arr[i] = sint16Arr[i] / 2
      }

      setFrequencyData(sint16Arr)
    })

    setStartRecord(true)
  }

  const stopRecord = async () => {
    if (!isStartRecord) return
    if (!isAudioRecordedRef.current) {
      setStartRecord(false)
      await AudioRecord.stop()
      return
    }

    const audioFile = await AudioRecord.stop()
    setStartRecord(false)
    setListenRecord(true)
    setTimeout(() => setFrequencyData([]), 100)

    setAudioFile(`file://${audioFile}`)
  }

  const togglePlayRecord = async () => {
    setIsPlay(play => !play)

    if (isPlay) {
      if (playerRef.current) {
        await playerRef.current.pausePlayer()
      }
    } else {
      playerRef.current = new AudioRecorderPlayer()
      await playerRef.current.startPlayer(`${audioFile}`)
      playerRef.current.addPlayBackListener(e => {
        setRemainingTime(Math.round((e.duration - e.currentPosition) / 1000))
        setPlayProgress(e.currentPosition / e.duration)

        if (e.duration === e.currentPosition) {
          setIsPlay(false)
          playerRef.current = null
        }
      })
    }
  }

  const cancelRecord = () => {
    setStartRecord(false)
    setListenRecord(false)
    setTime(0)
    setRemainingTime(0)
    setPlayProgress(0)
    setIsPlay(false)
    setFrequencyData([])
    setAudioFile(null)
    if (playerRef.current) {
      try {
        playerRef.current.stopPlayer()
        playerRef.current.removePlayBackListener()
      } catch (err) {}
    }
    playerRef.current = null
  }

  const convertTimeString = time => {
    const h = Math.floor(time / 3600)
    time = time % 3600
    const m = Math.floor(time / 60)
    const s = time % 60

    let timeStr = ''
    if (h > 0) {
      timeStr += String(h).padStart(2, '0') + ':'
    }

    timeStr += String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')

    return timeStr
  }

  const startTimer = useCallback(() => {
    setTime(0)
    timerRef.current = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (time >= AUDIO_MAXIMUM_LENGTH) {
      stopRecord()
    }
  }, [time])

  useEffect(() => {
    if (isStartRecord) {
      startTimer()
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isStartRecord, startTimer])

  useEffect(() => {
    return () => {
      AudioRecord.stop()

      if (playerRef.current) {
        try {
          playerRef.current.stopPlayer()
          playerRef.current.removePlayBackListener()
        } catch (err) {}
      }

      cancelRecord()
    }
  }, [])

  return (
    <>
      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={requestCloseHandler}
      >
        <Pressable style={styles.centeredView} onPress={requestCloseHandler}>
          <Pressable>
            <LinearGradient
              style={styles.modalView}
              start={{ x: 0.55, y: 0.5 }}
              end={{ x: 0.0, y: 0.65 }}
              locations={[0, 0.6]}
              colors={colors.bgGradient}
            >
              <Microphone width="24" heigth="24" color={colors.primary} />
              <Text style={styles.title}>Record a voice message?</Text>

              <View style={styles.recordView}>
                {!isListenRecord ? (
                  <CircleButton
                    Icon={isStartRecord ? SvgStopRecord : Microphone}
                    isPrimary
                    width={30}
                    height={30}
                    buttonStyle={styles.recordBtn}
                    onPressIn={startRecord}
                    onPressOut={stopRecord}
                  />
                ) : (
                  <CircleButton
                    Icon={isPlay ? SvgPause : Play}
                    isPrimary
                    width={isPlay ? 20 : 30}
                    height={isPlay ? 20 : 30}
                    buttonStyle={styles.recordBtn}
                    onPress={togglePlayRecord}
                  />
                )}

                <Equalizer
                  frequencyData={frequencyData}
                  height={70}
                  containerStyle={styles.equalizer}
                  mode={isListenRecord ? 'play' : 'record'}
                  playProgress={playProgress}
                />

                <Text style={styles.timer}>
                  {isListenRecord
                    ? convertTimeString(remainingTime)
                    : convertTimeString(time)}
                </Text>

                {isListenRecord && (
                  <View style={styles.closeBtnWrapper}>
                    <CircleButton
                      Icon={X}
                      isPrimary
                      buttonStyle={styles.closeBtn}
                      width={20}
                      height={20}
                      onPress={cancelRecord}
                    />
                  </View>
                )}
              </View>
              {time >= AUDIO_MAXIMUM_LENGTH && (
                <Text style={styles.title}>
                  You have reached the maximum length.
                </Text>
              )}
              <PressableHighlight
                style={audioFile ? styles.submitBtn : styles.disabledBtn}
                onPress={attachMediaHandler}
                backgroundColor={
                  audioFile ? colors.primaryShade : colors.semiGray
                }
              >
                <Text style={styles.approveText}>Attach</Text>
                <RightChevronLarge style={styles.rightArrow} />
              </PressableHighlight>

              <PressableHighlight
                style={styles.decline}
                onPress={requestCloseHandler}
              >
                <Text style={styles.declineText}>Cancel</Text>
              </PressableHighlight>
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiBlack50,
    zIndex: 10,
  },
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: colors.bgBlack,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...typography.p2,
    color: colors.primary,

    marginTop: 8,
  },
  recordView: {
    width: 280,
    flexDirection: 'row',
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.voiceRecordBg,
    paddingHorizontal: 10,
    borderStyle: 'dashed',
    marginTop: 20,
    alignItems: 'center',
  },
  equalizer: {
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10,
    marginVertical: 15,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 280,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  disabledBtn: {
    backgroundColor: colors.semiGray,
    borderRadius: 10,
    width: 280,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  closeBtnWrapper: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  closeBtn: {
    width: 30,
    height: 30,
  },
  rightArrow: {
    color: colors.textSub,
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,

    marginRight: 12,
  },
  decline: {
    borderRadius: 10,
    width: 280,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    marginTop: 20,
  },
  declineText: {
    ...typography.p2,
    color: colors.semiGray,

    marginRight: 12,
  },
  recordBtn: {
    width: 48,
    height: 48,
  },
  timer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 11,
    color: 'white',
  },
})

export default RecordVoiceModal
