import AudioRecorderPlayer from 'react-native-audio-recorder-player'

let audioRecorderPlayer = undefined
let currentPath = undefined
let currentCallback = () => {}
let currentPosition = 0

const AUDIO_STATUS = {
  play: 'play',
  begin: 'begin',
  pause: 'pause',
  resume: 'resume',
  stop: 'stop',
}

async function startPlayer(path, callback) {
  if (!currentPath) {
    currentPath = path
    currentCallback = callback
  } else if (currentPath !== path) {
    if (audioRecorderPlayer !== undefined) {
      try {
        await stopPlayer()
      } catch (error) {}
    }
    currentPath = path
    currentCallback = callback
  }

  if (!audioRecorderPlayer) {
    audioRecorderPlayer = new AudioRecorderPlayer()
  }

  try {
    const activePath = await audioRecorderPlayer.startPlayer(currentPath)

    currentCallback({
      status:
        currentPath === path && currentPosition > 0
          ? AUDIO_STATUS.resume
          : AUDIO_STATUS.begin,
    })
    audioRecorderPlayer.addPlayBackListener(async e => {
      if (e.current_position === e.duration) {
        try {
          await stopPlayer()
        } catch (error) {}
      } else {
        currentPosition = e.current_position

        currentCallback({
          status: AUDIO_STATUS.play,
          data: e,
        })
      }
      return
    })
  } catch (error) {}
}

async function pausePlayer() {
  try {
    await audioRecorderPlayer.pausePlayer()
    currentCallback({ status: AUDIO_STATUS.pause })
  } catch (error) {}
}

async function stopPlayer() {
  try {
    await audioRecorderPlayer.stopPlayer()
    audioRecorderPlayer.removePlayBackListener()
  } catch (error) {}
  currentPosition = 0
  currentCallback({ status: AUDIO_STATUS.stop })
  audioRecorderPlayer = null
  currentPath = null
  currentCallback = () => {}
}

export { AUDIO_STATUS, startPlayer, stopPlayer, pausePlayer }
