import { StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const headerTitleStyles = StyleSheet.create({
  title: {
    ...typography.h3,
    color: colors.titleHeader,
  },
  isMainTitle: {
    ...typography.titleHeader,
    color: colors.titleHeader,
  },
})
