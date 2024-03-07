import { Platform } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import debug from '~/utils/debug'

const PERMISSIONS_TYPE =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.RECORD_AUDIO
    : PERMISSIONS.IOS.MICROPHONE

const requestMicrophonePermission = async () => {
  try {
    const statusPermission = await check(PERMISSIONS_TYPE)

    if (statusPermission === RESULTS.GRANTED) {
      return true
    } else if (statusPermission === RESULTS.DENIED) {
      const newStatusPermission = await request(PERMISSIONS_TYPE)

      return newStatusPermission === RESULTS.GRANTED ? true : false
    } else {
      return false
    }
  } catch (err) {
    debug('PermissionsMicrophone', err)
  }
}

export default requestMicrophonePermission
