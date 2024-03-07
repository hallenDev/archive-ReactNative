import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutation } from 'react-query'

import {
  resetconfirmResolver as resolver,
  resetconfirm,
} from '~/shared/api/public'

import {
  KeyboardAvoidingView,
  SafeAreaView,
  LinearGradient,
  InputField,
  OZContainer,
  Button,
  FormErrors,
} from '~/ui'

import { colors, typography } from '~/ui/theme'

const ResetPasswordScreen = ({ route, navigation }) => {
  const { mutateAsync } = useMutation(resetconfirm)
  const form = useForm({
    resolver,
  })

  useState(() => {
    if (!route.params?.token) {
      navigation.navigate('WelcomeScreen')
    }
    form.register('duid')
    form.register('token')

    form.setValue('duid', parseInt(route.params?.userId))
    form.setValue('token', route.params?.token)
  }, [route.params?.token])

  const onSubmit = input =>
    mutateAsync(input)
      .then(() => navigation.navigate('ResetPasswordSuccessScreen'))
      .catch(({ data }) => {
        const errors = data?.errors || {}
        Object.keys(errors).forEach(key => {
          form.setError('newPassword', {
            type: 'manual',
            message: errors[key],
          })
        })
      })

  return (
    <FormProvider {...form}>
      <LinearGradient style={styles.background} colors={colors.bgGradient}>
        <SafeAreaView style={styles.wrapper}>
          <KeyboardAvoidingView style={styles.wrapper}>
            <OZContainer
              title="Reset Password"
              backAction={() => navigation.navigate('LoginScreen')}
            >
              <View style={styles.wrapper}>
                <Text style={styles.info}>
                  Please enter your new password.{`\n`}Must be between 6 and 20
                  characters.
                </Text>
                <View style={styles.field}>
                  <InputField
                    name="newPassword"
                    description="New password"
                    placeholder="New password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    keyboardType="default"
                    maxLength={20}
                    hideCounter
                    defaultValue=""
                  />
                </View>
                <View style={styles.field}>
                  <InputField
                    name="newPasswordConfirm"
                    description="Confirm new password"
                    placeholder="Confirm new password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    keyboardType="default"
                    maxLength={20}
                    hideCounter
                    defaultValue=""
                  />
                </View>
              </View>
              <Button
                onPress={form.handleSubmit(onSubmit)}
                type="primary"
                loading={form.formState.isSubmitting}
              >
                Change password
              </Button>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ForgotScreen', {
                    email: form.getValues('email'),
                  })
                }
              >
                <Text style={styles.resend}>Resend reset password email</Text>
              </TouchableOpacity>
            </OZContainer>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
      <FormErrors />
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  field: {
    marginBottom: 12,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  info: {
    ...typography.p1,
    color: colors.textMain,
    marginBottom: 22,
  },
  resend: {
    ...typography.p3,
    color: colors.textMain,
    textAlign: 'center',
    marginTop: 12,
  },
})

export default ResetPasswordScreen
