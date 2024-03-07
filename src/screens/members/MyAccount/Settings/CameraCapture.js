import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Image, Platform, StyleSheet } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { Button } from '~/ui'

const getPermissions = async () => {
  try {
    await Camera.requestCameraPermission()
  } catch (err) {}
}

const CameraCapture = ({ isUploading, uploadImage }) => {
  const camera = useRef(null)
  const devices = useCameraDevices()
  const device = devices.front
  const [photo, setPhoto] = useState()

  const capturePhoto = async () => {
    try {
      const { path } = await camera.current.takePhoto({})
      setPhoto(Platform.OS === 'ios' ? path : `file://${path}`)
    } catch (e) {}
  }

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <>
      {!!device &&
        (photo ? (
          <>
            <Image style={styles.image} source={{ uri: photo }} />
            <Button type="primary" onPress={() => setPhoto(null)}>
              Retake Picture
            </Button>

            <Button
              type="primary"
              style={styles.mt15}
              loading={isUploading}
              onPress={() => uploadImage(photo)}
            >
              Upload
            </Button>
          </>
        ) : (
          <>
            <Camera
              ref={camera}
              style={styles.cameraView}
              device={device}
              isActive={true}
              photo={true}
            />
            <Button
              type="primary"
              style={styles.mt15}
              onPress={() => capturePhoto()}
            >
              Capture
            </Button>
          </>
        ))}
    </>
  )
}

const styles = StyleSheet.create({
  cameraView: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
})

export default CameraCapture
