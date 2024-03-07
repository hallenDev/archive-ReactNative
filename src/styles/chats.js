import { NativeModules, Platform, StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'
import { HEADER_HEIGHT } from '~/configs/constants'

export const chatSendInputStyles = StyleSheet.create({
  container: {
    minHeight: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  input: {
    ...typography.p2,
    color: colors.textMain,
    marginHorizontal: 8,
    flex: 1,
    textAlignVertical: 'center',
    maxHeight: 120,
    marginBottom: Platform.OS === 'ios' ? 3 : 0,
  },
  attachButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    height: 32,
    width: 32,
    borderRadius: 32,
  },
  paidClick: {
    position: 'absolute',
    top: 2,
    right: 4,
    zIndex: 10,

    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },
  paidClickText: {
    fontSize: 6,
    color: colors.textMain,
  },
})

export const chatListItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  sender: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 5,
    marginLeft: 60,
  },
  recipient: {
    backgroundColor: colors.chatMessageBgLeft,
    borderBottomLeftRadius: 5,
    marginRight: 60,
  },
  content: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'relative',
  },
  time: {
    ...typography.c2,
    color: colors.textSub,
  },
  bottom: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderAlign: {
    justifyContent: 'flex-end',
  },
  recipientAlign: {
    justifyContent: 'flex-start',
  },
  sentIcon: {
    marginRight: 4,
  },
  bottomLeftCorner: {
    position: 'absolute',
    left: -10,
    bottom: 3,
    color: colors.chatMessageBgLeft,
  },
  bottomRightCorner: {
    position: 'absolute',
    right: -10,
    bottom: 3,
    color: colors.white,
  },
})

export const chatHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomColor: colors.bgGradient[0],
    borderBottomWidth: 1,
    height: NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 5,

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 100,
  },
  content: {
    paddingHorizontal: 20,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // left: {flex: 1},
  center: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    height: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },
  right: { flex: 1, alignItems: 'flex-end' },
  username: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  title: {
    ...typography.p2,
    color: colors.textMain,
    fontWeight: 600,
  },
  description: {
    ...typography.bodyRegular10,
    color: colors.grey,

    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCallButton: {
    marginRight: 8,
  },
  paidClick: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,

    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },
  paidClickText: {
    fontSize: 6,
    color: colors.textMain,
  },
  avatar: {
    width: 24,
  },
})
