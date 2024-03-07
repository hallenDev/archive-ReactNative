import {
  ERROR_TEXT_TYPE,
  FILE_EXTANTION,
  VIDEO_MAX_SIZE_MB,
  PHOTO_MAX_SIZE_MB,
  FILE_MIN_PROPORTIONS_W,
  FILE_MIN_PROPORTIONS_H,
  ERROR_TEXT_MAX_SIZE_VIDEO,
  ERROR_TEXT_MAX_SIZE_IMAGE,
  ERROR_TEXT_PROPORTIONS_PHOTO,
  ERROR_TEXT_FORMAT_FILE_NOT_SUPPORTED,
} from '~/shared/types/AddMediaTypes'

const fileValidation = (file, mediaAddHandler = () => {}, setErrors) => {
  if (!file) return

  if (file?.errorCode === 'others') {
    setErrors(ERROR_TEXT_FORMAT_FILE_NOT_SUPPORTED)

    return
  }

  if (file?.type?.match('audio*')) {
    mediaAddHandler(file)

    return
  }

  const ext = file?.type?.split('/').pop()

  if (FILE_EXTANTION && !FILE_EXTANTION.includes(ext.toLowerCase())) {
    setErrors(ERROR_TEXT_TYPE)

    return
  }

  if (file?.type?.match('video*')) {
    if (file.fileSize > VIDEO_MAX_SIZE_MB) setErrors(ERROR_TEXT_MAX_SIZE_VIDEO)
    else {
      mediaAddHandler(file)
    }
  } else if (file?.type?.match('image*')) {
    if (
      file.width < FILE_MIN_PROPORTIONS_W ||
      file.height < FILE_MIN_PROPORTIONS_H
    ) {
      setErrors(ERROR_TEXT_PROPORTIONS_PHOTO)
    } else if (file.fileSize > PHOTO_MAX_SIZE_MB) {
      setErrors(ERROR_TEXT_MAX_SIZE_IMAGE)
    } else {
      mediaAddHandler(file)
    }
  }
}

export default fileValidation
