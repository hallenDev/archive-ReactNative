import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { changeAccountPreferences } from '~/shared/api'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import { FormErrors, SliderField } from '~/ui'
import ButtonGradient from '~/ui/ButtonGradient'
import Placeholder from '~/ui/Placeholder'
import { FILTER_DEFAULT_PARAMS } from '~/configs/constants'
import { colors, typography } from '~/ui/theme'
import { useUser } from '~/context/UserContext'

const MIN_AGE = 18
const MAX_AGE = 100

const EditAgeFilters = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  const { user, isLoading: isLoadingUser, setUser } = useUser()

  const form = useForm({
    defaultValues: {
      seekingAge: [user.preferences.ageStart, user.preferences.ageEnd],
    },
  })

  const { mutateAsync, isLoading } = useMutation(changeAccountPreferences, {
    onMutate: async data => {
      setUser(state => ({
        ...state,
        preferences: { ageStart: data.start_age, ageEnd: data.end_age },
      }))
    },
    onError: (_error, _data, context) => {
      form.setError('preferences_age', {
        type: 'manual',
        message: _error.data.errors,
      })
      queryClient.getQueryData('profile', context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('profile')
    },
  })

  const onSubmit = input => {
    const params = {
      start_age: input.seekingAge[0],
      end_age: input.seekingAge[1],
    }
    mutateAsync(params)
      .then(() => {
        showNotificationSuccess({ message: 'Update successful.' })
        navigation.goBack()
      })
      .catch(() => {})
  }

  const [[ageFrom, ageTo]] = form.watch(['seekingAge'])

  if (isLoadingUser) return <Placeholder large />

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <Text
          style={styles.titleTxt}
        >{`Age Range: ${ageFrom} - ${ageTo}`}</Text>
        <SliderField
          name="seekingAge"
          width={Dimensions.get('window').width - 40}
          gravity={'center'}
          min={FILTER_DEFAULT_PARAMS.startAge}
          max={FILTER_DEFAULT_PARAMS.endAge}
          step={1}
          sliderValue={[user.preferences.ageStart, user.preferences.ageEnd]}
          style={styles.slider}
        />

        {!(ageFrom === MIN_AGE && ageTo === MAX_AGE) && (
          <View style={styles.helpView}>
            <Text style={styles.helpTxt}>
              Your inbox will exclude messages from users outside these ages. We
              will also use them as default for your searches, trending page,
              and the match game (but you are free to temporarily change them
              there without affecting this setting).
            </Text>
          </View>
        )}

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
  titleTxt: {
    ...typography.p1b,
    paddingVertical: 8,
    color: colors.textMain,
    marginRight: 10,
  },
  helpView: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ffffff33',
    borderRadius: 10,
  },
  helpTxt: {
    ...typography.p1,
    color: colors.textMain,
    fontSize: 12,
  },
})

export default EditAgeFilters
