import MessageType from '~/shared/types/MessageType'

export const checkIsIncludeAllNotifType = msg_type =>
  [
    MessageType.NEW_MESSAGE,
    MessageType.REQUEST_FRIENDS,
    MessageType.ADDED_FAVORITES,
    MessageType.NEW_FRIEND,
    MessageType.VIDEO_CHAT,
    MessageType.USER_ACCOUNT_UPDATED,
  ].includes(msg_type)

export const checkIsIncludeNotChatNotifType = msg_type =>
  [
    MessageType.REQUEST_FRIENDS,
    MessageType.ADDED_FAVORITES,
    MessageType.NEW_FRIEND,
    MessageType.VIDEO_CHAT,
  ].includes(msg_type)
