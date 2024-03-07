import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { decode } from 'html-entities'
import InboxGift from '~/ui/InboxGift'
import { typography, colors } from '~/ui/theme'

export const GiftsMsgType = {
  IS_NOT_CLAIMED_GIFT: 'Reply within 7 days to keep this virtual gift!',
  IS_CLAIMED_GIFT: 'You have claimed your virtual gift!',
  SENT_GIFT: 'You sent virtual gift',
}

const KEY_SIZE_GIFT = 150

const ChatGift = ({ message, direction, gift }) => {
  const titleMessage =
    direction === 'sender'
      ? GiftsMsgType.SENT_GIFT
      : gift?.claimed === 'N'
      ? GiftsMsgType.IS_NOT_CLAIMED_GIFT
      : GiftsMsgType.IS_CLAIMED_GIFT

  return (
    <View style={styles.container}>
      {gift?.urls && (
        <>
          <View style={styles.giftContainer}>
            <InboxGift uri={gift?.urls[KEY_SIZE_GIFT]} />
            <Text style={styles.message}>{titleMessage}</Text>
          </View>
          <View style={styles.line} />
        </>
      )}
      <Text style={styles.message}>{decode(message)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  giftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    ...typography.p2,
    color: colors.textMain,
    flexGrow: 1,
    flexShrink: 1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.semiGray,
    marginVertical: 10,
  },
})

export default ChatGift
