import { StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const locationInputStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.semiBlack25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  error: {
    borderColor: colors.alert,
  },
  input: {
    ...typography.p2,
    flex: 1,
    color: colors.textMain,
    minHeight: 30,
  },
  placeholder: {
    color: colors.textSub,
  },
  description: { marginBottom: 8 },
  descriptionText: { ...typography.p2, color: colors.textMain },
  secure: {
    position: 'absolute',
    right: 18,
  },
  secureIcon: {
    color: colors.semiTransparentWhite30,
  },
  lengthCounter: {
    ...typography.c3,
    position: 'absolute',
    right: 12,
    bottom: 12,
    color: colors.semiTransparentWhite15,
  },
  listContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  item: {
    padding: 12,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },

  text: {
    ...typography.p2,
    color: colors.textMain,
  },
  errorMsg: {
    color: colors.alert,
  },
})
