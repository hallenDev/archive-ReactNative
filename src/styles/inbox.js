import { StyleSheet } from 'react-native'
import { colors } from '~/ui/theme'

export const inboxListStyles = StyleSheet.create({
  separator: {
    height: 1,
    marginHorizontal: 20,
    marginLeft: 20 + 12 + 40, // padding left + space avatar text + avatar size
    backgroundColor: colors.white,
  },
  headerSeparator: { height: 16 },
  separatorFooter: {
    height: 40,
  },
})
