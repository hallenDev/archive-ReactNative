import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import {
  changeNickName,
  changeNickNameResolver as resolver,
} from '~/shared/api'
import useProfile from '~/hooks/useProfile'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import { FormErrors, KeyboardAvoidingView, InputField } from '~/ui'
import ButtonGradient from '~/ui/ButtonGradient'
import Placeholder from '~/ui/Placeholder'

const EditNickname = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const { data: user, isLoading: isLoadingProfile } = useProfile()

  const form = useForm({
    resolver,
  })

  const { mutateAsync, isLoading } = useMutation(changeNickName, {
    onMutate: async data => {
      await queryClient.cancelQueries(['profile', parseInt(user?.duid)])
      const previousData = queryClient.getQueryData([
        'profile',
        parseInt(user?.duid),
      ])

      queryClient.setQueryData(['profile', parseInt(user?.duid)], old => ({
        ...old,
        username: data.username,
      }))

      return { previousData }
    },
    onError: (_error, _data, context) => {
      queryClient.getQueryData(
        ['profile', parseInt(user?.duid)],
        context.previousData,
      )
    },
  })

  const onSubmit = input => {
    mutateAsync(input)
      .then(() => {
        showNotificationSuccess({ message: 'Update successful.' })
        navigation.goBack()
      })
      .catch(({ data }) => {
        form.setError('username', {
          type: 'manual',
          message: data.errors[0],
        })
      })
  }

  useEffect(() => {
    if (user?.username) {
      form.setValue('username', user?.username)
    }
  }, [user?.username, form])

  if (isLoadingProfile) return <Placeholder large />

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.wrapper}>
          <View style={styles.content}>
            <InputField
              name="username"
              description="Create your username"
              placeholder="Enter username"
            />
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
})

export default EditNickname
