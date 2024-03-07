import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import useStorage from './useStorage'
import { addImageMediaUrl, addVideoMediaUrl } from '~/shared/api/members'
import noop from '~/utils/noop'
import debug from '~/utils/debug'

const useMediaAdd = ({
  onUploadStart = noop,
  onUploadEnd = noop,
  onError = noop,
  onSuccess = noop,
} = {}) => {
  const { authToken } = useStorage()

  return input => {
    onUploadStart()

    const uri =
      Platform.OS === 'ios' ? input?.uri?.replace('file://', '') : input?.uri
    const ext = input?.type ? input?.type?.split('/').pop() : 'png'
    const fileName = input?.type.match('video*') ? 'files' : 'image'

    RNFetchBlob.fetch(
      'POST',
      input?.type.match('video*') ? addVideoMediaUrl : addImageMediaUrl,
      {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: fileName,
          filename: `${fileName}.${ext}`,
          data: RNFetchBlob.wrap(uri),
        },
      ],
    )
      .uploadProgress((written, total) => {})
      .then(resp => {
        const data = resp?.json()
        debug(`-> ${addImageMediaUrl}`, data)

        if (data?.errors) {
          onError(data?.errors?.[0] || data?.errors)
          return
        }

        onSuccess()
      })
      .catch(err => {
        onError(err?.message || 'The network connection was lost')
      })
      .finally(() => {
        onUploadEnd()
      })
  }
}

export default useMediaAdd
