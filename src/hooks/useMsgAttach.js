import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import useStorage from './useStorage'
import { sendMsgAttach } from '~/shared/api/members'
import noop from '~/utils/noop'
import debug from '~/utils/debug'

const useMsgAttach = ({
  options = {},
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
    const ext = input?.fileName ? input?.fileName?.split('.').pop() : 'png'
    const fileName = input?.type.match('video*')
      ? 'video'
      : input?.type.match('audio*')
      ? 'audio'
      : 'image'

    RNFetchBlob.fetch(
      'POST',
      sendMsgAttach,
      {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        { name: 'otherUserId', data: options?.otherUserId },
        { name: 'type', data: fileName },
        {
          name: 'files[]',
          filename: `${fileName}.${ext}`,
          data: RNFetchBlob.wrap(uri),
        },
      ],
    )
      .uploadProgress((written, total) => {})
      .then(resp => {
        const data = resp?.json()
        debug(`-> ${sendMsgAttach}`, data)

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

export default useMsgAttach
