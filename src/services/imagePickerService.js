import { Platform } from 'react-native'
// react-native-image-crop-picker
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import requestCameraPermission from '~/utils/requestCameraPermission'
import noop from '~/utils/noop'

const libraryOptions = {
  mediaType: 'mixed',
  maxWidth: 1200,
  quality: 0.8,
  videoQuality: 'high',
  selectionLimit: 1, // 0 | 1
}

const photoOptions = {
  mediaType: 'photo',
  maxWidth: 1200,
  quality: 0.8,
  selectionLimit: 1, // 0 | 1
}

const videoOptions = {
  mediaType: 'video',
  videoQuality: 'high',
  durationLimit: 60,
  selectionLimit: 1, // 0 | 1
}

export const onOpenCamera = async ({
  onChange = noop,
  onChangeUpload = noop,
  options = photoOptions,
}) => {
  const res = await requestCameraPermission()

  if (res) {
    launchCamera(options, response => {
      onChangeUpload()

      if (response.didCancel || response.error) return null

      onChange(response?.assets)
    })
  }
}

export const onOpenPhotoCamera = async props =>
  await onOpenCamera({ ...props, options: photoOptions })

export const onOpenVideoCamera = async props =>
  onOpenCamera({ ...props, options: videoOptions })

export const onOpenLibrary = ({
  onChange = noop,
  onChangeUpload = noop,
  options = libraryOptions,
  mediaType,
}) => {
  const libraryMediaOptions = options

  if (mediaType) {
    libraryMediaOptions.mediaType = mediaType
  }

  launchImageLibrary(libraryMediaOptions, response => {
    onChangeUpload()

    if (response.didCancel || response.error) return null

    onChange(response?.assets || response)
  })
}

export default { launchCamera, launchImageLibrary }
