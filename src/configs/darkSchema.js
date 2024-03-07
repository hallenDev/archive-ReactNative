import { StyleSheet } from 'react-native'
import lightColors from './lightSchema'

const styles = StyleSheet.create({
  dark: true,
  colors: {
    ...lightColors.colors,
  },
})

export default styles
