import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import {
  changeAboutMeText,
  changeAboutMeTextResolver as resolver,
} from '~/shared/api'
import useProfile from '~/hooks/useProfile'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import { FormErrors, KeyboardAvoidingView, InputField } from '~/ui'
import ButtonGradient from '~/ui/ButtonGradient'
import Placeholder from '~/ui/Placeholder'
import { decode } from 'html-entities'

const EditBio = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const { data: user, isLoading: isLoadingProfile } = useProfile()

  const form = useForm({
    resolver,
  })

  const { mutateAsync, isLoading: isLoading } = useMutation(changeAboutMeText, {
    onMutate: async data => {
      await queryClient.cancelQueries('profile')
      const previousData = queryClient.getQueryData('profile')

      queryClient.setQueryData('profile', old => ({
        ...old,
        about_me: data.aboutMeText,
      }))

      return { previousData }
    },
    onError: (_error, _data, context) => {
      queryClient.getQueryData('profile', context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('profile')
    },
  })

  const onSubmit = input => {
    mutateAsync(input)
      .then(() => {
        showNotificationSuccess({ message: 'Update successful.' })
        navigation.goBack()
      })
      .catch(({ data }) => {
        form.setError('aboutMeText', {
          type: 'manual',
          message: data.errors[0],
        })
      })
  }

  useEffect(() => {
    if (user?.about_me) {
      form.setValue('aboutMeText', decode(user?.about_me))
    }
  }, [user?.about_me, form])

  if (isLoadingProfile) return <Placeholder large />

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.wrapper}>
          <View style={styles.content}>
            <InputField
              name="aboutMeText"
              description="Describe yourself"
              multiline
              maxLength={500}
              inputStyle={styles.input}
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
  input: {
    height: 160,
  },
})

export default EditBio
