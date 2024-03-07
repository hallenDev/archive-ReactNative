import React, { useEffect, useCallback, useReducer, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { View, StyleSheet, Text, AppState } from 'react-native'
import { Room } from 'livekit-client'
import { AudioSession, useRoom } from '@livekit/react-native'
import { changePrivateRoom, joinPrivateRoom } from '~/shared/api'
import { useUser } from '~/context/UserContext'
import useCheckEnoughCredits from '~/hooks/useCheckEnoughCredits'
import { useState } from 'react'
import { ParticipantView } from '~/components/VideoChat/ParticipantView'
import { colors } from '~/ui/theme'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import CircleButton from '~/ui/CircleButton'
import SvgSound from '~/ui/icons/Sound'
import SvgSoundMute from '~/ui/icons/SoundMute'
import SvgVideoMute from '~/ui/icons/VideoMute'
import SvgEndCall from '~/ui/icons/EndCall'
import VideoChatActionType from '~/shared/types/VideoChatActionType'
import SvgVideo from '~/ui/icons/Video'
import useSpendCredits from '~/hooks/useSpendCredits'
import OutgoingVideoCall from '~/components/VideoChat/OutgoingVideoCall'
import { START_PRIVATE_VIDEO_CHAT, VIDEOCHAT_URL } from '~/configs/constants'

const DEFAULT_WAIT_TIME_30_SEC = 30000
const WAIT_CLOSE_CHAT_15_SEC = 15000
const WAIT_GETTING_DETAILS_5_SEC = 5000

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CALL_TYPE':
      return { ...state, isOutgoingCall: action.isOutgoingCall }
    case 'SET_CHANNEL':
      return { ...state, channel: action.channel }
    case 'UPDATE_JOINED_USER':
      return { ...state, isJoinedUser: action.isJoinedUser }
    case 'START_GET_DETAILS':
      return { ...state, isStartGetDetails: !state.isStartGetDetails }
    case 'MUTE_STREAM':
      return { ...state, isMyStreamMuted: !state.isMyStreamMuted }
    case 'SET_UNAVAILABLE':
      return { ...state, isUnavailable: true }
    case 'SET_AVAILABLE':
      return { ...state, isUnavailable: false }
    case 'SET_MY_STREAM':
      return { ...state, myStreamUrl: action.streamUrl }
    case 'SET_OTHER_STREAM':
      return { ...state, otherStreamUrl: action.streamUrl }
    case 'SET_MY_TOKEN':
      return { ...state, myToken: action.token }
    case 'SET_SPEND_CREDITS':
      return { ...state, spendCreditsCalled: true }

    default:
      throw new Error()
  }
}

const VideoChatScreen = ({ navigation, route }) => {
  const { duid: duidFromUrl } = route.params
  const {
    user: { duid: myDuid },
  } = useUser()
  const onSpendCredits = useSpendCredits()
  const onCheckEnoughCredits = useCheckEnoughCredits()

  const appState = useRef(AppState.currentState)
  const [connected, setConnected] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    isOutgoingCall: null,
    channel: null,
    isJoinedUser: false,
    isStartGetDetails: false,
    isMyStreamMuted: false,
    isUnavailable: false,
    myStreamUrl: null,
    otherStreamUrl: null,
    myToken: null,
    spendCreditsCalled: false,
  })

  const { data: roomData = {}, isLoading } = useQuery(
    ['joinPrivateRoom', duidFromUrl],
    () => joinPrivateRoom({ otherDuid: duidFromUrl }),
    {
      enabled: !!duidFromUrl,
      cacheTime: 0,
    },
  )

  const user = roomData?.users?.find(
    u => parseInt(u.duid, 10) === parseInt(myDuid, 10),
  )

  const outgoingCallWithoutCredits =
    !!state.isOutgoingCall &&
    !onCheckEnoughCredits(START_PRIVATE_VIDEO_CHAT) &&
    !state.isJoinedUser

  useEffect(() => {
    if (outgoingCallWithoutCredits) {
      navigation.navigate('Payment')
    }
  }, [outgoingCallWithoutCredits, navigation])

  useEffect(() => {
    if (parseInt(roomData?.ownerDuid, 10) === parseInt(myDuid, 10)) {
      dispatch({
        type: 'SET_CALL_TYPE',
        isOutgoingCall: true,
      })
    } else {
      dispatch({
        type: 'SET_CALL_TYPE',
        isOutgoingCall: false,
      })
    }
  }, [myDuid, roomData?.ownerDuid])

  useEffect(() => {
    if (roomData?.details?.id) {
      const channel = `gpchat:${roomData.details.id}`
      dispatch({ type: 'SET_CHANNEL', channel })
    }
  }, [roomData?.details?.id])

  useEffect(() => {
    let timeoutId

    if (!state.isJoinedUser) {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'SET_UNAVAILABLE' })
      }, DEFAULT_WAIT_TIME_30_SEC)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [state.isJoinedUser])

  useEffect(() => {
    let timeoutId

    if (state.isUnavailable) {
      timeoutId = setTimeout(() => {
        onExitChat()
      }, WAIT_CLOSE_CHAT_15_SEC)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [state.isUnavailable, onExitChat])

  useEffect(() => {
    if (roomData?.token) {
      dispatch({
        type: 'SET_MY_TOKEN',
        token: roomData.token,
      })
    }
  }, [roomData?.token])

  useEffect(() => {
    let timeoutId

    if (state.isJoinedUser) {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'START_GET_DETAILS' })
      }, WAIT_GETTING_DETAILS_5_SEC)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [state.isJoinedUser])

  const spendCreditsForVideoChat = useCallback(() => {
    if (
      parseInt(roomData?.details?.ownerDuid, 10) === parseInt(myDuid, 10) &&
      state.isJoindUser &&
      !state.spendCreditsCalled
    ) {
      dispatch({ type: 'SET_SPEND_CREDITS' })
      onSpendCredits(duidFromUrl, START_PRIVATE_VIDEO_CHAT)
    }
  }, [
    duidFromUrl,
    myDuid,
    onSpendCredits,
    roomData?.details?.ownerDuid,
    state.isJoindUser,
    state.spendCreditsCalled,
  ])

  useEffect(() => {
    if (
      state.isJoinedUser &&
      parseInt(roomData?.details?.ownerDuid, 10) === parseInt(myDuid, 10)
    ) {
      spendCreditsForVideoChat()
    }
    // @ts-ignore
  }, [
    state.isJoinedUser,
    roomData?.details?.ownerDuid,
    spendCreditsForVideoChat,
    myDuid,
  ])

  const onExitChat = useCallback(async () => {
    try {
      await room.disconnect()
      await AudioSession.stopAudioSession()
    } catch (error) {}

    dispatch({
      type: 'SET_MY_STREAM',
      streamUrl: null,
    })
    dispatch({
      type: 'SET_OTHER_STREAM',
      streamUrl: null,
    })
    changePrivateRoom({
      otherDuid: duidFromUrl,
      action: VideoChatActionType.LEAVE,
    })
    navigation.pop()
  }, [duidFromUrl, navigation, room])

  const [room] = useState(
    () =>
      new Room({
        publishDefaults: { simulcast: false },
        adaptiveStream: true,
      }),
  )
  const { participants } = useRoom(room)

  useEffect(() => {
    let connect = async () => {
      await AudioSession.startAudioSession()
      await room.connect(VIDEOCHAT_URL, state.myToken, {})
      await room.localParticipant.enableCameraAndMicrophone()
      setConnected(true)
    }
    if (state.myToken) {
      connect()
    }

    return () => {
      onExitChat
    }
  }, [state.myToken, room, onExitChat])

  const me = participants.find(
    participant =>
      participant.identity &&
      parseInt(participant.identity, 10) === parseInt(myDuid, 10),
  )
  const other = participants.find(
    participant =>
      participant.identity &&
      parseInt(participant.identity, 10) !== parseInt(myDuid, 10),
  )
  const insets = useSafeAreaInsets()

  const toggleMuteVideo = () => {
    if (!me) return
    if (!connected) return
    room.localParticipant.setCameraEnabled(!cameraEnabled)
  }

  const toggleMuteSound = () => {
    if (!me) return
    if (!connected) return
    room.localParticipant.setMicrophoneEnabled(!micEnabled)
  }

  useEffect(() => {
    if (other) {
      dispatch({ type: 'UPDATE_JOINED_USER', isJoinedUser: true })
    } else {
      dispatch({ type: 'UPDATE_JOINED_USER', isJoinedUser: false })
    }
  }, [other])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (connected) {
          room.localParticipant.setMicrophoneEnabled(true)
          room.localParticipant.setCameraEnabled(true)
        }
      } else {
        if (connected) {
          room.localParticipant.setMicrophoneEnabled(false)
          room.localParticipant.setCameraEnabled(false)
        }
      }

      appState.current = nextAppState
    })

    return () => subscription.remove()
  }, [connected, room.localParticipant])

  const isUserJoined =
    (state.isOutgoingCall && !state.isJoinedUser) || state.isUnavailable

  console.log('me', me)
  return (
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      {isLoading && !user ? (
        <Text
          style={[
            styles.connecting,
            {
              marginTop: insets.top + 20,
            },
          ]}
        >
          Connecting...
        </Text>
      ) : isUserJoined ? (
        <OutgoingVideoCall
          userUrl={user?.pic}
          duid={duidFromUrl}
          isUnavailable={state.isUnavailable}
          onExitChat={onExitChat}
        />
      ) : (
        <>
          <View style={styles.container}>
            {other && (
              <ParticipantView
                participant={other}
                style={styles.otherVideo}
                onCameraEnabled={() => {}}
                onMicEnabled={() => {}}
                zOrder={1}
              />
            )}

            {me && (
              <ParticipantView
                participant={me}
                style={styles.myVideo}
                onCameraEnabled={setCameraEnabled}
                onMicEnabled={setMicEnabled}
                zOrder={2}
              />
            )}
          </View>
          <View style={[styles.controls, { marginBottom: insets.bottom }]}>
            <CircleButton
              Icon={micEnabled ? SvgSound : SvgSoundMute}
              buttonStyle={styles.controlBtn}
              width={20}
              height={20}
              title={micEnabled ? 'Mute' : 'Unmute'}
              textStyle={{ color: colors.textMain }}
              onPress={toggleMuteSound}
            />

            <CircleButton
              Icon={cameraEnabled ? SvgVideo : SvgVideoMute}
              buttonStyle={styles.controlBtn}
              width={20}
              height={20}
              textStyle={{ color: colors.textMain }}
              title={cameraEnabled ? 'Disable Video' : 'Enable Camera'}
              onPress={toggleMuteVideo}
            />

            <CircleButton
              Icon={SvgEndCall}
              buttonStyle={styles.endCall}
              width={23}
              height={23}
              textStyle={{ color: colors.textMain }}
              title={'End Call'}
              onPress={onExitChat}
            />
          </View>
        </>
      )}
    </LinearGradient>
  )
}

export default VideoChatScreen

export const options = () => ({
  header: () => <></>,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.semiGray,
  },
  myVideo: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 100,
    height: 140,
    borderRadius: 10,
    zIndex: 10,
  },
  otherVideo: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  controlBtn: {
    backgroundColor: colors.black,
  },
  endCall: {
    backgroundColor: 'red',
  },
  connecting: {
    color: colors.white,
    paddingHorizontal: 20,
  },
})
