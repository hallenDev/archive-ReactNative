import { StyleSheet } from 'react-native'
import { colors, typography } from '../ui/theme'

export const voiceMessageStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  title: {
    ...typography.h5,
    color: colors.textMain,
  },
  description: {
    ...typography.p2,
    color: colors.textSub,
    fontSize: 15,
    flexGrow: 1,
    flexShrink: 1,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.15)',
    marginBottom: 8,
  },
  iconWrapper: {
    backgroundColor: colors.bgGradient[0],
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  icon: {
    color: colors.primary,
  },
  containerSkeleton: {
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    height: 180,
    marginBottom: 25,
  },
})
