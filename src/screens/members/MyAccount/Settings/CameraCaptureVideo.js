import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import Video from 'react-native-video'
import { Button } from '~/ui'
import { colors } from '~/ui/theme'

const CameraCapture = ({ isUploading, uploadVideo }) => {
  const camera = useRef(null)
  const devices = useCameraDevices()
  const device = devices.front
  const [recordingStarted, setRecordingStarted] = useState(false)
  const [videoFile, setVideoFile] = useState()
  const [timeLeft, setTimeLeft] = useState(10)

  const timeLeftRef = useRef(timeLeft)
  const timerRef = useRef(0)

  const counter = useCallback(() => {
    if (timeLeftRef.current === 0) {
      stopRecording()
      return
    }

    const newTimeLeft = timeLeftRef.current - 1
    setTimeLeft(newTimeLeft)
    timeLeftRef.current = newTimeLeft
  }, [stopRecording, setTimeLeft])

  const startRecording = () => {
    setVideoFile(null)
    camera.current.startRecording({
      flash: 'on',
      onRecordingFinished: video => setVideoFile(video.path),
      onRecordingError: error => {},
      fileType: 'mp4',
    })

    setRecordingStarted(true)

    setTimeLeft(10)
    timeLeftRef.current = 10
    timerRef.current = setInterval(counter, 1000)
  }

  const stopRecording = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = 0
    }

    await camera.current.stopRecording()
    setRecordingStarted(false)
  }

  const retryRecording = () => {
    setVideoFile(null)
    setRecordingStarted(false)
  }

  const getPermissions = async () => {
    try {
      await Camera.requestCameraPermission()
      await Camera.requestMicrophonePermission()
    } catch (err) {}
  }

  useEffect(() => {
    getPermissions()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = 0
      }
    }
  }, [])

  return (
    <>
      {!!device && (
        <>
          {!!videoFile && !recordingStarted && (
            <>
              <Video
                source={{ uri: videoFile }}
                style={styles.video}
                resizeMode="cover"
                controls
              />
              <Button type="primary" onPress={() => retryRecording()}>
                Retry Recording
              </Button>

              <Button
                type="primary"
                loading={isUploading}
                style={styles.mt15}
                onPress={() => uploadVideo(videoFile)}
              >
                Upload Video
              </Button>
            </>
          )}

          {(recordingStarted || (!videoFile && !recordingStarted)) && (
            <>
              <Camera
                ref={camera}
                style={styles.cameraView}
                device={device}
                isActive={true}
                video={true}
                audio={false}
              />

              {recordingStarted && (
                <Text style={styles.counter}>
                  Recording will stop in {timeLeft} seconds
                </Text>
              )}

              {recordingStarted ? (
                <Button
                  type="primary"
                  style={styles.mt15}
                  onPress={() => stopRecording()}
                >
                  Stop Recording
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={styles.mt20}
                  onPress={() => startRecording()}
                >
                  Record Video
                </Button>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  cameraView: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  video: {
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
  },
  counter: {
    color: colors.textSub,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
})

export default CameraCapture
