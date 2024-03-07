import { StyleSheet } from 'react-native'
import { colors } from '~/ui/theme'

export const checkboxStyles = StyleSheet.create({
  icon: size => ({
    width: size || 18,
    height: size || 18,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  active: {
    borderColor: colors.green,
  },
})
