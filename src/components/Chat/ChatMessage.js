import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { typography, colors } from '~/ui/theme'
import { decode } from 'html-entities'

const ChatMessage = ({ message = '' }) => {
  return <Text style={styles.message}>{decode(message)}</Text>
}

const styles = StyleSheet.create({
  message: {
    ...typography.p2,
    color: colors.textMain,
  },
})

export default ChatMessage
