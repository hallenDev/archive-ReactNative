import React, { useCallback } from 'react'
import { StyleSheet, View, Platform, Keyboard } from 'react-native'
import { useFormContext } from 'react-hook-form'
import QuestionsList from '~/ui/QuestionsList'
import { InputField, Button, OZContainer, OZTitle } from '~/ui'

const Question = ({ nextAction, backAction }) => {
  const form = useFormContext()

  const onChangeQuestion = useCallback(
    value => {
      if (form.getValues('question_id') !== value) {
        form.setValue('question_id', value)
      }
    },
    [form],
  )

  return (
    <OZContainer backAction={backAction} withScroll>
      <View style={[styles.row, Platform.OS === 'ios' && { zIndex: 1 }]}>
        <OZTitle
          left="Please pick a question from below to answer"
          largeHeader
        />
        <QuestionsList
          onChangeQuestion={onChangeQuestion}
          isUseFirstQuestionId={!form.getValues('question_id')}
        />
      </View>
      <View style={styles.row}>
        <InputField
          name="answer"
          placeholder="Your answer"
          multiline
          maxLength={500}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.action}>
        <Button
          type="primary"
          onPress={async () => {
            Keyboard.dismiss()

            const isVal = await form.trigger(['question_id', 'answer'])

            if (isVal) {
              nextAction()
            }
          }}
        >
          Continue
        </Button>
      </View>
    </OZContainer>
  )
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 32,
  },
  input: {
    minHeight: 160,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default Question
