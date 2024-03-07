import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { useMutation } from 'react-query'
import { useForm, Controller } from 'react-hook-form'

import {
  reset as resetPassword,
  resetResolver as resolver,
} from '~/shared/api/public'
import { showNotificationError } from '~/services/in-app-notifications'

import { Button, LinearGradient, TextInput, KeyboardAvoidingView } from '~/ui'
import globalStyle from '~/ui/globalStyle'
import { text, typography, colors } from '~/ui/theme'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'

const ForgotYourPasswordScreen = ({ navigation }) => {
  const { mutateAsync } = useMutation(resetPassword)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
  })

  const onSubmit = input => {
    mutateAsync(input)
      .then(data => {
        navigation.navigate('MyAccountResetYourPasswordSuccessScreen', input)
      })
      .catch(({ response }) => {
        showNotificationError({
          message: 'Please correct',
          description: response?.data?.errors?.[0] || '',
        })
      })
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <KeyboardAvoidingView style={styles.wrapper}>
        <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
          <View style={styles.container}>
            <Text style={styles.description}>
              We will email you a secure link to reset your password.
            </Text>
            <Text style={styles.title}>Enter Your Email</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInput}
                  inputContainterStyle={[errors?.email && styles.inputError]}
                  placeholder="example@mail.com"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              )}
              name="email"
              defaultValue=""
            />

            {errors?.email?.message && (
              <Text style={styles.error}>{errors?.email?.message}</Text>
            )}

            <Button
              type="primary"
              style={styles.changeEmailBtn}
              onPress={handleSubmit(onSubmit)}
              disabled={!!errors?.email}
            >
              Reset My Password
            </Button>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  title: {
    marginBottom: 12,
    color: colors.textSub,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  description: {
    marginBottom: 20,
    color: colors.textSub,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  changeEmailBtn: {
    marginTop: 20,
  },
  textInput: {
    ...typography.bodyRegular14,
    color: colors.textMain,
    height: 46,
    marginVertical: 0,
  },
  error: {
    ...text.base,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.redAlert,
    textAlign: 'right',
  },
  inputError: {
    borderColor: colors.redAlert,
    borderWidth: 1,
  },
  wrapper: {
    flex: 1,
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Forgot Your Password?"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default ForgotYourPasswordScreen
