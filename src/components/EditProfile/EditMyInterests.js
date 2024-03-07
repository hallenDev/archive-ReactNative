import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { changeInterests } from '~/shared/api'
import useProfile from '~/hooks/useProfile'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import InterestMap from '~/shared/types/InterestMap'
import { FormErrors, SelectBoxField } from '~/ui'
import ButtonGradient from '~/ui/ButtonGradient'
import Placeholder from '~/ui/Placeholder'

const EditMyInterests = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const { data: user, isLoading: isLoadingProfile } = useProfile()

  const form = useForm({
    defaultValues: {
      interested_in: user.interested_in,
    },
  })

  const { mutateAsync, isLoading } = useMutation(changeInterests, {
    onMutate: async data => {
      await queryClient.cancelQueries('profile')
      const previousData = queryClient.getQueryData('profile')

      queryClient.setQueryData('profile', old => ({
        ...old,
        interested_in: data.interested_in,
      }))

      return { previousData }
    },
    onError: (_error, _data, context) => {
      form.setError('interested_in', {
        type: 'manual',
        message: _error.data.errors['interested in'],
      })
      queryClient.getQueryData('profile', context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('profile')
    },
  })

  const onSubmit = input => {
    input.duid = user.duid
    mutateAsync(input)
      .then(() => {
        showNotificationSuccess({ message: 'Update successful.' })
        navigation.goBack()
      })
      .catch(() => {})
  }

  if (isLoadingProfile) return <Placeholder large />

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <SelectBoxField name="interested_in" values={InterestMap} multiple />
        <ButtonGradient
          title="Save"
          className={styles.btn}
          onAction={form.handleSubmit(onSubmit)}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
        <FormErrors />
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  btn: {
    marginTop: 50,
  },
})

export default EditMyInterests
