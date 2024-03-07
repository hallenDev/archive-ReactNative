import { StyleSheet } from 'react-native'

const globalStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaCropAbsolute: {
    flex: 1,
    overflow: 'hidden',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default globalStyle
