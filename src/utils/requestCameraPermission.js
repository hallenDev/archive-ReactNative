import { Platform } from 'react-native'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import debug from '~/utils/debug'

const PERMISSIONS_TYPE =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA

const requestCameraPermission = async () => {
  try {
    const statusPermission = await check(PERMISSIONS_TYPE)

    if (statusPermission === RESULTS.GRANTED) {
      return true
    } else if (statusPermission === RESULTS.DENIED) {
      const newStatusPermission = await request(PERMISSIONS_TYPE)

      if (newStatusPermission === RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (err) {
    debug('PermissionsCamera', err)
  }
}

export default requestCameraPermission
