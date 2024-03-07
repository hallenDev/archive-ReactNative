import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutation } from 'react-query'
import { resetResolver as resolver, reset } from '~/shared/api/public'

import {
  KeyboardAvoidingView,
  LinearGradient,
  InputField,
  OZContainer,
  Button,
  FormErrors,
} from '~/ui'

import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, typography } from '~/ui/theme'
import { useState } from 'react'

const ForgotScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)

  const { mutate } = useMutation(reset, {
    onSuccess: (_resp, { email }) => {
      navigation.navigate('ForgotSuccessScreen', { email })
    },
    onError: ({ data }) => {
      const errors = data?.errors || {}
      Object.keys(errors).forEach(key => {
        form.setError('email', {
          type: 'manual',
          message:
            errors[key] === 'INVALID' ? 'Enter a valid email' : errors[key],
        })
      })
    },
    onSettled: _ => setLoading(false),
  })
  const form = useForm({
    resolver,
  })

  useEffect(() => {
    form.register('email')
    form.setValue('email', route.params?.email)
  }, [form, route.params?.email])

  const onSubmit = input => {
    setLoading(true)
    mutate(input)
  }

  return (
    <FormProvider {...form}>
      <LinearGradient style={styles.background} colors={colors.bgGradient}>
        <SafeAreaView
          edges={['top']}
          style={{ backgroundColor: colors.header }}
        />
        <SafeAreaView
          style={styles.wrapper}
          edges={['left', 'right', 'bottom']}
        >
          <KeyboardAvoidingView style={styles.wrapper}>
            <OZContainer
              title="Reset Password"
              backAction={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.infoText}>
                We will email you a secure link to reset your password
              </Text>
              <InputField
                name="email"
                description="Enter Your email"
                placeholder="Email"
                autoComplete="email"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={styles.action}>
                <Button
                  type="primary"
                  loading={loading}
                  onPress={form.handleSubmit(onSubmit)}
                >
                  Continue
                </Button>
              </View>
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
  infoText: {
    ...typography.p1,
    color: colors.textMain,
    marginBottom: 22,
  },
})

export default ForgotScreen
