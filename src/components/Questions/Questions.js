import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import { getQuestions } from '~/shared/api/public'
import { colors } from '~/ui/theme'

const Questions = ({ questionId }) => {
  const { data } = useQuery('getQuestions', getQuestions)
  const questionData = data?.questions?.find(item => item.id === questionId)

  return <Text style={styles.text}>{questionData?.question}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: colors.textSub,
    fontSize: 16,
  },
})

export default Questions
