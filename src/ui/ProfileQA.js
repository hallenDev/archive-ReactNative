import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { decode } from 'html-entities'
import { colors, typography } from '~/ui/theme'

const ProfileQA = ({ question = '', answer = '' }) => (
  <View style={styles.container}>
    <Text style={styles.textQuestion}>{question}</Text>
    <Text style={styles.textAnswer}>{decode(answer)}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: colors.railBackground,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  textQuestion: {
    ...typography.p2,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.textMain,
  },
  textAnswer: {
    ...typography.p2,
    color: colors.textSub,
  },
})

export default memo(ProfileQA)
