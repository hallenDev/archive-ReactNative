import { Platform, StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const commentInputStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  replyingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  replying: {
    ...typography.p2,
    color: colors.semiGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  closeReply: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
    borderRadius: 32,
    marginLeft: 15,
  },
  textInputWrapper: {
    minHeight: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  input: {
    ...typography.p2,
    color: colors.textMain,
    marginHorizontal: 8,
    flex: 1,
    textAlignVertical: 'center',
    marginBottom: Platform.OS === 'ios' ? 3 : 0,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 32,
    width: 32,
    borderRadius: 32,
  },
})
