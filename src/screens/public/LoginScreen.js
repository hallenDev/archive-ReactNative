import React from 'react'
import { StyleSheet, Text, View, Pressable, Keyboard } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutation } from 'react-query'
import { loginResolver as resolver, login } from '~/shared/api/public'

import { useUser } from '~/context/UserContext'

import {
  KeyboardAvoidingView,
  LinearGradient,
  InputField,
  OZContainer,
  Button,
  FormErrors,
} from '~/ui'

import { colors, typography } from '~/ui/theme'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = ({ navigation }) => {
  const { updateUserWithSid } = useUser()
  const { mutateAsync: loginMutation } = useMutation(login)

  const form = useForm({
    reValidateMode: 'onSubmit',
    resolver,
  })

  const onSubmit = input =>
    loginMutation(input)
      .then(data => {
        if (data?.user && data?.sid) {
          form.reset()

          updateUserWithSid(data)
        } else if (data?.verify_device) {
          navigation.navigate('VerifyDeviceScreen', { email: input.email })
        }
      })
      .catch(({ data }) => {
        const errors = data?.errors || {}
        Object.keys(errors).forEach(key => {
          form.setError('password', {
            type: 'manual',
            message: errors[key],
          })
        })
      })

  return (
    <FormProvider {...form}>
      <LinearGradient style={styles.background} colors={colors.bgGradient}>
        <KeyboardAvoidingView style={styles.wrapper}>
          <SafeAreaView
            edges={['top']}
            style={{ backgroundColor: colors.header }}
          />
          <SafeAreaView
            style={styles.wrapper}
            edges={['left', 'right', 'bottom']}
          >
            <OZContainer title="Log in" backAction={() => navigation.goBack()}>
              <View style={styles.field}>
                <InputField
                  name="email"
                  description="Your email"
                  placeholder="Email"
                  autoComplete="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.field}>
                <InputField
                  name="password"
                  description="Password"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoComplete="password"
                  secureTextEntry={true}
                />
              </View>
              <Pressable
                onPress={() =>
                  navigation.navigate('ForgotScreen', {
                    email: form.getValues('email'),
                  })
                }
              >
                <Text style={styles.forgot}>Forgot Your Password?</Text>
              </Pressable>

              <View style={styles.action}>
                <Button
                  type="primary"
                  loading={form.formState.isSubmitting}
                  onPress={form.handleSubmit(onSubmit)}
                >
                  Continue
                </Button>

                {/* 
                <View style={styles.delimiterContainer}>
                  <View style={styles.delimiterLine} opacity={0.3} />
                  <Text style={styles.delimiterText}>Or use</Text>
                  <View style={styles.delimiterLine} opacity={0.3} />
                </View>

                <Button style={styles.gBtn}>
                  <Google style={styles.icon} />
                  <Text style={styles.gBtnText}>Log in with Google</Text>
                </Button> 
                */}

                <View style={styles.signUpContiner}>
                  <Text style={styles.signUpText}>
                    New here?{' '}
                    <Text
                      onPress={() => {
                        Keyboard.dismiss()
                        setTimeout(
                          () => navigation.navigate('SignupScreen'),
                          500,
                        )
                      }}
                      style={styles.signUpAction}
                    >
                      Create Account
                    </Text>
                  </Text>
                </View>
              </View>
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
  field: {
    marginBottom: 12,
  },
  action: {
    marginTop: 32,
  },
  icon: {
    marginRight: 12,
  },
  gBtn: {
    backgroundColor: colors.textMain,
    borderRadius: 10,
  },
  gBtnText: {
    ...typography.p3,
    color: colors.black,
  },
  delimiterContainer: {
    marginTop: 32,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  delimiterLine: {
    backgroundColor: colors.textMain,
    height: 1,
    flex: 1,
    marginHorizontal: 8,
  },
  delimiterText: {
    ...typography.p2,
    color: colors.textMain,
  },
  signUpContiner: {
    marginTop: 32,
    alignItems: 'center',
  },
  signUpText: {
    ...typography.p2,
    color: colors.textSub,
  },
  signUpAction: {
    ...typography.p2,
    color: colors.textMain,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  forgot: {
    ...typography.p2,
    color: colors.primary,
  },
})

export default LoginScreen
