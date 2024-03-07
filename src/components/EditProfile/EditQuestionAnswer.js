import React, { useEffect } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { updateTextAnswer } from '~/shared/api'
import useProfile from '~/hooks/useProfile'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import { FormErrors, KeyboardAvoidingView, InputField } from '~/ui'
import ButtonGradient from '~/ui/ButtonGradient'
import Placeholder from '~/ui/Placeholder'
import QuestionsList from '~/ui/QuestionsList'
import { decode } from 'html-entities'

const EditQuestionAnswer = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const { data: user, isLoading: isLoadingProfile } = useProfile()

  const form = useForm({})

  const { mutateAsync, isLoading } = useMutation(updateTextAnswer, {
    onMutate: async data => {
      await queryClient.cancelQueries('profile')
      const previousData = queryClient.getQueryData('profile')

      queryClient.setQueryData('profile', old => ({
        ...old,
        question_id: data.question_id,
        answer: data.answer,
      }))

      return { previousData }
    },
    onError: (_error, _data, context) => {
      form.setError('answer', {
        type: 'manual',
        message: _error.data.errors.answer || _error.data.errors['question id'],
      })
      queryClient.getQueryData('profile', context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('profile')
    },
  })

  const onChangeQuestion = value => {
    form.setValue('question_id', value)
  }

  const onSubmit = input => {
    input.duid = user.duid
    mutateAsync(input)
      .then(() => {
        showNotificationSuccess({ message: 'Update successful.' })
        navigation.goBack()
      })
      .catch(() => {})
  }

  useEffect(() => {
    form.setValue('question_id', user?.qaQuestion ? user?.qaID : '')
    form.setValue('answer', decode(user?.qaAnswer))
  }, [user?.qaQuestion, user?.qaID, user?.qaAnswer, form])

  if (isLoadingProfile) return <Placeholder large />

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.wrapper}>
          <View style={styles.content}>
            <View style={[styles.row, Platform.OS === 'ios' && { zIndex: 1 }]}>
              <QuestionsList
                onChangeQuestion={onChangeQuestion}
                questionId={user?.qaQuestion ? user?.qaID : ''}
              />
            </View>
            <View style={styles.row}>
              <InputField
                name="answer"
                placeholder="Your answer"
                multiline
                maxLength={500}
                inputStyle={styles.input}
                numberOfLines={6}
              />
            </View>
            <ButtonGradient
              title="Save"
              className={styles.btn}
              onAction={form.handleSubmit(onSubmit)}
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
        <FormErrors />
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  wrapper: {
    flex: 1,
  },
  content: {
    padding: 20,
    width: '100%',
  },
  btn: {
    marginTop: 50,
  },
  row: {
    marginBottom: 32,
    position: 'relative',
  },
  input: {
    height: 160,
  },
})

export default EditQuestionAnswer
