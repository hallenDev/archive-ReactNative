import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { decode } from 'html-entities'
import { typography, colors } from '~/ui/theme'

export const ClaimableMsgType = {
  IS_NOT_CLAIMED_GIFT: 'Reply within 7 days to claim credits!',
  IS_CLAIMED_GIFT: 'You have claimed your credits!',
  SENT_GIFT: 'You sent first message',
  SKIP_FOR_MACH: 'Skip having to match!',
  DEFAULT_ERROR_MESSAGE: 'Message should be 10 characters',
  INSUFFICIENT_CREDITS: 'insufficient credits',
}

const ClaimCreditsMessage = ({ direction, claimed, message }) => {
  const titleMessage =
    direction === 'sender'
      ? ClaimableMsgType.SENT_GIFT
      : claimed === false
      ? ClaimableMsgType.IS_NOT_CLAIMED_GIFT
      : ClaimableMsgType.IS_CLAIMED_GIFT

  return (
    <View>
      {direction && direction !== 'sender' && (
        <View style={styles.claimMessage}>
          <Text style={styles.text}>
            {titleMessage}
            {direction === 'recipient' && claimed === false && (
              <>
                {` `}
                <Text>
                  Did you know you can{' '}
                  <Text style={styles.underline}>
                    reply and claim credits for cash?
                  </Text>
                </Text>
              </>
            )}
          </Text>
        </View>
      )}
      <Text style={styles.text}>{decode(message)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  claimMessage: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textMain,
    marginBottom: 10,
    paddingBottom: 10,
  },
  text: {
    ...typography.p2,
    color: colors.textMain,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})

export default ClaimCreditsMessage
