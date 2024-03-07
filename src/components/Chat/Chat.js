import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '~/ui/theme'
import { chatListItemStyles as styles } from '~/styles'
import dayjs from 'dayjs'
import SvgTicks from '~/ui/icons/Ticks'
import SvgChatChecksRead from '~/ui/icons/ChatChecksRead'
import SvgChatBottomLeftCorner from '~/ui/icons/ChatBottomLeftCorner'
import SvgChatBottomRightCorner from '~/ui/icons/ChatBottomRightCorner'
import ChatMessage from './ChatMessage'
import ChatRequest from './chat-request'
import ChatImage from './ChatImage'
import ChatVideo from './ChatVideo'
import ChatGift from './ChatGift'
import ChatAudio from './ChatAudio'
import ChatPrivateVideo from './ChatPrivateVideo'
import { isVideoType } from '~/utils/checkTypeMedia'
import UploadMedia from './UploadMedia'
import ClaimCreditsMessage from './ClaimCreditsMessage'

const COMPONENT_MAP = {
  MESSAGE: ChatMessage,
  CLAIM_CREDITS_MESSAGE: ClaimCreditsMessage,
  REQUEST: ChatRequest,
  ATTACHMENT: ChatImage,
  VIDEO_ATTACHMENT: ChatVideo,
  VIRTUAL_GIFT: ChatGift,
  AUDIO_ATTACHMENT: ChatAudio,
  PRIVATE_VIDEO_CHAT: ChatPrivateVideo,
}

const getComponent = (tag = [], attachmentStatus = '', claimable) => {
  if (tag?.includes('ATTACHMENT')) {
    return attachmentStatus === 'UNREQUESTED'
      ? COMPONENT_MAP.REQUEST
      : COMPONENT_MAP.ATTACHMENT
  } else if (tag?.includes('VIDEO_ATTACHMENT_RDY')) {
    return attachmentStatus === 'UNREQUESTED'
      ? COMPONENT_MAP.REQUEST
      : COMPONENT_MAP.VIDEO_ATTACHMENT
  } else if (tag?.includes('VIDEO_ATTACHMENT')) {
    return attachmentStatus === 'UNREQUESTED'
      ? COMPONENT_MAP.REQUEST
      : COMPONENT_MAP.VIDEO_ATTACHMENT
  } else if (tag?.includes('VIRTUAL_GIFT')) {
    return COMPONENT_MAP.VIRTUAL_GIFT
  } else if (tag?.includes('AUDIO_ATTACHMENT')) {
    return COMPONENT_MAP.AUDIO_ATTACHMENT
  } else if (tag?.includes('PRIVATE_VIDEO_CHAT')) {
    return COMPONENT_MAP.PRIVATE_VIDEO_CHAT
  } else if (claimable) {
    return COMPONENT_MAP.CLAIM_CREDITS_MESSAGE
  } else {
    return COMPONENT_MAP.MESSAGE
  }
}

const Chat = props => {
  const {
    mtime = '',
    direction = '', // sender | recipient
    tag = [],
    attachmentStatus = '',
    my_unread,
    claimable,
    claimed,
  } = props

  const time = dayjs(mtime).format('h:mm A')
  const ChatComponent = getComponent(
    tag,
    attachmentStatus,
    claimable || claimed,
  )

  return (
    <View style={[styles.container, styles[`${direction}Align`]]}>
      <View style={{}}>
        <View style={[styles.content, styles[direction]]}>
          {isVideoType(tag) && !props.attachmentVideoThumbUrl ? (
            <UploadMedia />
          ) : (
            <ChatComponent {...props} />
          )}

          {direction === 'sender' ? (
            <SvgChatBottomRightCorner
              height="16"
              width="10"
              style={styles.bottomRightCorner}
              color={styles.bottomRightCorner.color}
            />
          ) : (
            <SvgChatBottomLeftCorner
              height="16"
              width="10"
              style={styles.bottomLeftCorner}
              color={styles.bottomLeftCorner.color}
            />
          )}
        </View>
        <View style={[styles.bottom, styles[`${direction}Align`]]}>
          {direction === 'sender' && (
            <>
              {my_unread === '1' ? (
                <SvgTicks
                  style={styles.sentIcon}
                  width="16"
                  height="16"
                  color={colors.primary}
                />
              ) : (
                <SvgChatChecksRead
                  style={styles.sentIcon}
                  width="16"
                  height="16"
                  color={colors.greenApprove}
                />
              )}
            </>
          )}
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  )
}

export default Chat
