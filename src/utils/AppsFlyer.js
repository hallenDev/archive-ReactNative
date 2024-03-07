import appsFlyer from 'react-native-appsflyer'
import { Platform } from 'react-native'

// events
export const AF_CompleteRegistration = 'af_complete_registration'
export const AF_purchase = 'af_purchase'

const initOptions = {
  isDebug: true,
  devKey: 'X9AiZLajSjpMrDZz84buxm',
  onInstallConversionDataListener: false,
  appId: '1658145694',
}

// AppsFlyer initialization flow. ends with initSdk.
export function AFInit() {
  if (Platform.OS === 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN')
  }

  appsFlyer.initSdk(initOptions)
}

export function AFLogEvent(name, values) {
  appsFlyer.logEvent(name, values, null, null)
}
