import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Platform,
} from 'react-native'
import AudioRecord from 'react-native-audio-record'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import { Buffer } from 'buffer'
import { colors } from '~/ui/theme'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import Questions from '~/components/Questions/Questions'
import Equalizer from '~/components/Equalizer/Equalizer'
import CircleButton from '~/ui/CircleButton'
import { Trash, X, Microphone, Check } from '~/ui/icons'
import SvgStopRecord from '~/ui/icons/StopRecord'
import SvgPause from '~/ui/icons/Pause'
import { Play } from '~/ui/icons/Solid'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteVoiceAnswer,
  getVoiceAnswers,
  postVoiceAnswers,
} from '~/shared/api/members'
import {
  showNotificationSuccess,
  showNotificationError,
} from '~/services/in-app-notifications'
import QuestionsList from '~/ui/QuestionsList'
import CustomScrollbar from '~/ui/CustomScrollbar'
import requestMicrophonePermission from '~/utils/requestMicrophonePermission'
import ConfirmModal from '~/components/Modals/ConfirmModal'

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

const VoiceAnswerScreen = ({ navigation, route }) => {
  const { questionId: defaultQuestionId, displayType } = route?.params || {}
  const queryClient = useQueryClient()
  const [isStartRecord, setStartRecord] = useState(false)
  const [isListenRecord, setListenRecord] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [showTrashBtn, setShowTrashBtn] = useState(false)
  const [frequencyData, setFrequencyData] = useState([])
  const [time, setTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [playProgress, setPlayProgress] = useState(0)
  const [questionId, setQuestionId] = useState(defaultQuestionId)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const timerRef = useRef()
  const playerRef = useRef()
  const audiofileRef = useRef()
  const isAudioRecordedRef = useRef()

  const toggleConfirmModal = () => setIsOpenConfirmModal(s => !s)
  const onToggleSuccessModal = () => setIsOpenSuccessModal(s => !s)

  const onCloseSuccessModal = () => {
    onToggleSuccessModal()
    navigation.pop()
  }

  const startRecord = async () => {
    if (!questionId) {
      showNotificationError({ message: 'Please choose a question' })
      return
    }
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
      wavFile: 'test.wav', // default 'audio.wav'
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
    setRemainingTime(time)

    audiofileRef.current = `file://${audioFile}`
  }

  const cancelRecord = () => {
    setStartRecord(false)
    setListenRecord(false)
    setTime(0)
    setIsPlay(false)
    setRemainingTime(0)
    setPlayProgress(0)
    setFrequencyData([])
    audiofileRef.current = null
    if (playerRef.current) {
      try {
        playerRef.current.stopPlayer()
        playerRef.current.removePlayBackListener()
      } catch (err) {}
    }
    playerRef.current = null
  }

  const togglePlayRecord = async () => {
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
      await playerRef.current.startPlayer(`${audiofileRef.current}`)
      playerRef.current.addPlayBackListener(e => {
        setRemainingTime(Math.round((e.duration - e.currentPosition) / 1000))
        setPlayProgress(e.currentPosition / e.duration)

        if (e.duration === e.currentPosition) {
          setIsPlay(false)
          playerRef.current.removePlayBackListener()
          playerRef.current = null
        }
      })
    }
  }

  const onSuccessDelete = () => {
    showNotificationSuccess({ message: 'Deleted successful.' })
  }

  const { mutate: deleteAnswerMutation, isLoading } = useMutation(
    deleteVoiceAnswer,
    {
      onSuccess: () => {
        toggleConfirmModal()
        onSuccessDelete()

        queryClient.invalidateQueries(['getVoiceAnswers'])
      },
    },
  )

  const handleDeleteAnswer = () => {
    deleteAnswerMutation(voiceAnswersList?.answers[0].question_id)
  }

  const { mutate } = useMutation('postVoiceAnswers', postVoiceAnswers, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getVoiceAnswers'])
      onToggleSuccessModal()
    },
    onError: error => {},
  })

  const onSendRecord = () => {
    if (!audiofileRef.current || showTrashBtn) return

    const formData = new FormData()
    formData.append('audioFile', {
      uri: audiofileRef.current,
      type: 'audio/wav', //This is the file type .. you can define according to your requirement
      name: 'audioFile.wav', //File name you want to pass
    })
    formData.append('question_id', questionId)
    mutate(formData)
  }

  const startTimer = useCallback(() => {
    setTime(0)
    timerRef.current = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (isStartRecord) {
      startTimer()
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isStartRecord, startTimer])

  const { data: voiceAnswersList } = useQuery(['getVoiceAnswers'], () =>
    getVoiceAnswers(),
  )

  useEffect(() => {
    if (voiceAnswersList?.answers.length > 0) {
      audiofileRef.current = voiceAnswersList.answers[0].url
      setShowTrashBtn(true)
      setListenRecord(true)
    } else {
      setShowTrashBtn(false)
      setListenRecord(false)
      cancelRecord()
    }
  }, [voiceAnswersList])

  useEffect(() => {
    return () => {
      AudioRecord.stop()

      if (playerRef.current) {
        try {
          playerRef.current.stopPlayer()
        } catch (err) {}

        try {
          playerRef.current.removePlayBackListener()
        } catch (err) {}

        playerRef.current = null
      }
    }
  }, [])

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <CustomScrollbar contentContainerStyle={styles.container}>
          {displayType === 'single' ? (
            <Questions questionId={questionId} />
          ) : (
            <QuestionsList
              questionId={questionId}
              onChangeQuestion={setQuestionId}
              disable={isListenRecord}
            />
          )}
          <View style={styles.playerContainer}>
            <Text style={styles.timer}>
              {isListenRecord
                ? convertTimeString(remainingTime)
                : convertTimeString(time)}
            </Text>
            <Equalizer
              frequencyData={frequencyData}
              mode={isListenRecord ? 'play' : 'record'}
              playProgress={playProgress}
            />
            <View style={styles.controls}>
              {showTrashBtn ? (
                <CircleButton
                  Icon={Trash}
                  title="Delete"
                  iconStyle={styles.deleteSvg}
                  onPress={toggleConfirmModal}
                />
              ) : (
                <CircleButton
                  Icon={X}
                  title="Cancel"
                  iconStyle={styles.cancelSvg}
                  onPress={cancelRecord}
                />
              )}

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
                  width={isPlay ? 30 : 50}
                  height={isPlay ? 30 : 50}
                  buttonStyle={styles.recordBtn}
                  onPress={togglePlayRecord}
                />
              )}

              <CircleButton
                Icon={Check}
                title="Submit"
                iconStyle={styles.submitSvg}
                disabled={!audiofileRef.current || showTrashBtn}
                onPress={onSendRecord}
                disabl
              />
            </View>
            {!isListenRecord && (
              <Text style={styles.tapText}>Tap and hold to record</Text>
            )}
          </View>
        </CustomScrollbar>
      </LinearGradient>

      {isOpenConfirmModal && (
        <ConfirmModal
          modalVisible={isOpenConfirmModal}
          onCancel={toggleConfirmModal}
          onApprove={handleDeleteAnswer}
          description="Are you sure you want to delete the answer?"
          approveLoading={isLoading}
          approveText="Yes, delete"
        />
      )}

      {isOpenSuccessModal && (
        <ConfirmModal
          withoutCancel
          onApprove={onCloseSuccessModal}
          modalVisible={isOpenSuccessModal}
          description="Great!"
          approveText="OK"
          info="Audio recorded successfully"
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  playerContainer: {
    backgroundColor: colors.voiceRecordBg,
    marginTop: 16,
    borderRadius: 5,
    paddingTop: 16,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  timer: {
    color: colors.textSub,
    fontSize: 15,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deleteSvg: {
    color: colors.redAlert,
  },
  cancelSvg: {
    color: colors.redAlert,
  },
  submitSvg: {
    color: colors.greenApprove,
  },
  recordBtn: {
    width: 82,
    height: 82,
  },
  tapText: {
    textAlign: 'center',
    color: colors.textSub,
    marginTop: 10,
  },
  actionSheetTitle: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
  actionSheetButton: {
    color: colors.white,
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Record Voice Answer"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default VoiceAnswerScreen
