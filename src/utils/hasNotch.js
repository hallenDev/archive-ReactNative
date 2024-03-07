import { StatusBar, Platform } from 'react-native'

const hasNotch = Platform.OS === 'android' && StatusBar.currentHeight > 24

export default hasNotch
