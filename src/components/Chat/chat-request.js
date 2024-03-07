import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import useMsgAcceptAttachType from '~/shared/hooks/use-msg-accept-attach-type'
import ButtonGradient from '~/ui/ButtonGradient'
import { Attention, Image, Video } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const ChatRequest = ({
  tag = [],
  direction = '',
  duid: fromDuid = '',
  otherUserId = '',
}) => {
  const { mutate } = useMsgAcceptAttachType({ fromDuid, otherUserId })

  if (direction !== 'recipient') return null

  const mediaType = tag?.includes('ATTACHMENT') ? 'photo' : 'video'

  const questionText = `Do you want to see ${mediaType}s sent by this user?`

  return (
    <View>
      <View style={styles.mediaWrap}>
        {mediaType === 'photo' ? (
          <Image style={styles.media} />
        ) : (
          <Video style={styles.media} />
        )}
      </View>
      <View style={styles.wrapper}>
        <Attention style={{ color: colors.redAlert }} />
        <Text style={styles.message}>{questionText}</Text>
      </View>
      <ButtonGradient title="Yes" className={styles.button} onAction={mutate} />
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    ...typography.p2,
    color: colors.redAlert,
    marginLeft: 6,
    flexShrink: 1,
  },
  button: {
    minHeight: 36,
  },
  mediaWrap: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.postBackground,
    marginBottom: 8,
  },
  media: {
    color: colors.textMain,
    width: 50,
    height: 'auto',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
})

export default ChatRequest
