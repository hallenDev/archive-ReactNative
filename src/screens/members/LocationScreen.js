import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, Keyboard, View } from 'react-native'
import { useQueryClient, useMutation } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import {
  Button,
  LinkText,
  LocationField,
  Placeholder,
  KeyboardAvoidingView,
  MainHeader,
} from '~/ui'
import { showNotificationError } from '~/services/in-app-notifications'
import getCurrentLocation from '~/utils/getCurrentLocation'
import {
  changeLocation,
  changeLocationResolver as resolver,
  changeLocationSchema as schema,
} from '~/shared/api/members'
import useProfile from '~/hooks/useProfile'
import { typography, colors } from '~/ui/theme'
import getLocationText from '~/utils/getLocationText'
import globalStyle from '~/ui/globalStyle'
import LinearGradient from '~/ui/LinearGradient'
import useSetHeader from '~/hooks/useSetHeader'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import HeaderTitle from '~/components/HeaderTitle'

const LocationScreen = ({ navigation }) => {
  const { data: user } = useProfile()
  const queryClient = useQueryClient()
  const [isCurrentLocationLoading, setCurrentLocationLoading] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

  const { mutate, isLoading } = useMutation(changeLocation, {
    onSuccess: () => {
      const profileId = String(user?.duid)
      queryClient.cancelQueries(['profile', profileId])
      queryClient.cancelQueries(['profile'])
      queryClient.cancelQueries('quickSearch')
      queryClient.cancelQueries('queuePlay')

      queryClient.invalidateQueries(['profile', profileId])
      queryClient.invalidateQueries(['profile'])
      queryClient.invalidateQueries('quickSearch')
      queryClient.invalidateQueries('queuePlay')

      form.reset()

      onToggleSuccessModal()
    },
    onError: ({ data }) => {
      showNotificationError({
        description: data?.errors?.[0] || data?.errors?.country_code || '',
      })
    },
    onSettled: () => {
      setCurrentLocationLoading(false)
    },
  })

  const form = useForm({
    resolver,
    defaultValues: {
      ...schema.cast(),
      location: getLocationText(user),
      location_id: user.location_id,
      country_code: user.country_code,
    },
  })

  const watchCountry = form.watch(
    'country_code',
    user?.country_code || user?.countryCode,
  )

  const handleUseCurrentLocation = () => {
    setCurrentLocationLoading(true)

    getCurrentLocation()
      .then(response => {
        mutate({
          location_id: response.locationId,
          country_code: response?.countryCode,
        })
      })
      .catch(e => {
        setCurrentLocationLoading(false)

        if (typeof e === 'string') {
          showNotificationError({ description: e })
        } else {
          showNotificationError({ description: e?.message })
        }
      })
  }

  const onSubmit = input => {
    mutate(input)
  }

  const onToggleSuccessModal = () => setIsOpenSuccessModal(s => !s)

  const onCloseSuccessModal = () => {
    onToggleSuccessModal()
    navigation.goBack()
  }

  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Location settings" />}
    />,
    [],
  )

  return (
    <SafeAreaView edges={['bottom']} style={[globalStyle.flex]}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <FormProvider {...form}>
          <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
            <View style={styles.container}>
              <Text style={styles.title}>City</Text>

              <View style={styles.autocompleteContainer}>
                <LocationField
                  name="location"
                  locationFieldName="location_id"
                  countryCode={watchCountry}
                  onSelected={() => {
                    Keyboard.dismiss()
                  }}
                />
              </View>

              <Button
                type="primary"
                style={[styles.marginTop20, isLoading && styles.isDisabled]}
                onPress={form.handleSubmit(onSubmit)}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                {isLoading ? <Placeholder isWhite /> : 'Save'}
              </Button>

              {isCurrentLocationLoading ? (
                <Placeholder isWhite style={styles.preloader} />
              ) : (
                <LinkText
                  style={styles.hyperlink}
                  onPress={handleUseCurrentLocation}
                >
                  Use current location
                </LinkText>
              )}
            </View>
          </LinearGradient>
        </FormProvider>
      </KeyboardAvoidingView>
      {isOpenSuccessModal && (
        <ConfirmModal
          withoutCancel
          onApprove={onCloseSuccessModal}
          modalVisible={isOpenSuccessModal}
          description="Great!"
          approveText="OK"
          info="Location changed successfully"
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  title: {
    ...typography.bodyBold14,
    color: colors.textSub,
    marginVertical: 12,
  },
  marginTop20: {
    marginTop: 150,
  },
  hyperlink: {
    marginTop: 60,
    alignItems: 'center',
    color: colors.textSub,
  },
  input: {
    ...typography.bodyRegular14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BDC7DB',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  location: {
    backgroundColor: colors.transparent,
    color: colors.textSub,
  },
  isDisabled: {
    opacity: 0.5,
  },
  wrapper: {
    flex: 1,
  },
  preloader: {
    marginTop: 60,
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 50,
    zIndex: 1,
  },
})

export default LocationScreen
