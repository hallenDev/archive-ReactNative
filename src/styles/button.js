import { StyleSheet } from 'react-native'
import { colors, text, typography } from '~/ui/theme'

export const buttonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 48,
    minWidth: 90,
    borderRadius: 24,
    overflow: 'hidden',
  },

  credits: {
    marginLeft: 8,
    backgroundColor: colors.textMain,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsTxt: {
    ...typography.p3,
    color: colors.primary,
    marginLeft: 2,
  },

  primaryContainer: {
    backgroundColor: colors.primary,
  },
  primaryText: { ...typography.p1, color: colors.textMain, fontWeight: 600 },
  primaryChevron: {
    color: colors.textMain,
  },
  acceptContainer: {
    backgroundColor: colors.greenApprove,
  },
  acceptText: { ...typography.p2, color: colors.textMain },
  acceptChevron: {
    color: colors.textMain,
  },
  whiteContainer: {
    borderWidth: 1,
    borderColor: colors.textMain,
  },
  whiteText: { ...typography.p2, color: colors.textMain },
  whiteChevron: {
    color: colors.textMain,
  },
  transparentContainer: {
    backgroundColor: colors.semiBlack25,
  },
  transparentText: { ...typography.p3, color: colors.textMain },
  transparentChevron: {
    color: colors.textMain,
  },
})

export const infoButtonStyles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 32,
    paddingHorizontal: 10,
    minHeight: 0,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
    marginLeft: 8,
  },
  containerSkeleton: {
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
    height: 40,
  },
})

export const userProfileButtonsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  buttonWrapper: { flexBasis: '48%' },
  firstBtn: {},
})

export const gradientButtonstyles = StyleSheet.create({
  btn: {
    flex: 1,
    position: 'relative',
    minHeight: 36,
    borderRadius: 18,
    overflow: 'hidden',
    flexGrow: 1,
  },
  btnContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  iconLeft: {
    color: colors.textMain,
    marginRight: 8,
  },
  iconRight: {
    color: colors.textMain,
    marginLeft: 8,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
  isDisabled: {
    opacity: 0.5,
  },
})

export const accountSettingBtnStyles = StyleSheet.create({
  button: {
    maxWidth: 120,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  text: {
    fontFamily: text.semiBold.fontFamily,
    fontWeight: 600,
  },
})

export const addMediaStyles = StyleSheet.create({
  btn: {
    width: '100%',
    marginBottom: 16,
  },
  container: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  icon: {
    color: colors.textMain,
    marginRight: 8,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
})

export const addMediaButtonStyle = StyleSheet.create({
  btn: {
    maxWidth: 125,
  },
  transparentBtn: {
    paddingHorizontal: 40,
    maxWidth: 'auto',
    minWidth: 170,
  },
  container: {
    width: 40,
    height: 40,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
})
