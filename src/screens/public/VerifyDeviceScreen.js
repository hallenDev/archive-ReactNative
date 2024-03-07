import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Text, StyleSheet, Keyboard } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'

import { useUser } from '~/context/UserContext'
import { verifyResolver as resolver, verify } from '~/shared/api/public'

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

const VerifyDeviceScreen = ({ navigation, route }) => {
  const { updateUserWithSid } = useUser()
  const { mutateAsync } = useMutation(verify)

  const form = useForm({
    resolver,
  })

  const onSubmit = input => {
    Keyboard.dismiss()
    mutateAsync(input)
      .then(data => {
        form.reset()

        updateUserWithSid(data)
      })
      .catch(({ data }) => {
        const errors = data?.errors || {}
        Object.keys(errors).forEach(key => {
          form.setError('token', {
            type: 'manual',
            message: errors[key],
          })
        })
      })
  }

  useEffect(() => {
    form.register('email')
    form.setValue('email', route.params?.email)
  }, [])

  return (
    <FormProvider {...form}>
      <LinearGradient style={styles.background} colors={colors.bgGradient}>
        <KeyboardAvoidingView style={styles.wrapper}>
          <SafeAreaView style={styles.wrapper}>
            <OZContainer
              title="Verify Device"
              backAction={() => navigation.navigate('WelcomeScreen')}
              withScroll
            >
              <Text style={styles.infoText}>
                New device detected. To protect your account and privacy, we’d
                like you to verify your device. A verification code has been
                sent to {route.params?.email}
              </Text>

              <InputField
                name="token"
                description="Code"
                placeholder="XXXXXX"
                autoCapitalize="none"
                maxLength={6}
                defaultValue=""
                code
              />
              <Button
                onPress={form.handleSubmit(onSubmit)}
                type="primary"
                loading={form.formState.isSubmitting}
                style={styles.btn}
              >
                Verify
              </Button>
              <Text style={styles.spam}>
                Don’t forget to check your “SPAM” folder
              </Text>
            </OZContainer>
          </SafeAreaView>
        </KeyboardAvoidingView>
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
  infoText: {
    ...typography.p1,
    color: colors.textMain,
    marginBottom: 22,
  },
  spam: {
    ...typography.p3,
    color: colors.textMain,
    textAlign: 'center',
    marginTop: 12,
  },
  btn: {
    marginTop: 40,
  },
})

export default VerifyDeviceScreen
