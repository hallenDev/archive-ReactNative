import messaging from '@react-native-firebase/messaging'

export const requestUserPermission = async callbackFn => {
  const authStatus = await messaging().requestPermission()

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    await callbackFn()
  }
}
