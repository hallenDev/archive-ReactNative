import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useMutation } from 'react-query'
import { useForm, Controller } from 'react-hook-form'
import {
  changeEmail,
  changeEmailResolver as resolver,
} from '~/shared/api/members'
import { showNotificationError } from '~/services/in-app-notifications'
import { SUPPORT_EMAIL } from '~/configs/constants'
import { Button, TextInput, Placeholder } from '~/ui'
import { text, typography, colors } from '~/ui/theme'

const ChangeYourEmail = () => {
  const [newEmail, setNewEmail] = useState()

  const { mutateAsync, isLoading } = useMutation(changeEmail)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver,
  })

  const onSubmit = input => {
    mutateAsync(input)
      .then(data => {
        setNewEmail(input.email)
        reset()
      })
      .catch(({ data }) => {
        const description = Array.isArray(data?.errors)
          ? data?.errors[0]
          : data?.errors?.email

        showNotificationError({
          description,
        })
      })
  }

  return (
    <View style={styles.container}>
      {newEmail ? (
        <>
          <Text style={[styles.description, styles.marginBottom]}>
            A confirmation email was sent to {newEmail}.
          </Text>
          <Text style={styles.description}>
            Please confirm this change by clicking the link from {SUPPORT_EMAIL}
            . Don't forget to check your spam folder.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Changing your email will also change the email address you use to
            log into your account
          </Text>
          <Text style={styles.title}>Enter new Email</Text>
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
                keyboardType="default"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors?.email?.message && (
            <Text style={styles.error}>{errors?.email?.message}</Text>
          )}
          <Button
            style={[styles.changeEmailBtn, isLoading && styles.isDisabled]}
            type="primary"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!!errors?.email || isLoading}
          >
            {isLoading ? <Placeholder isWhite /> : 'Change Email'}
          </Button>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  description: {
    color: colors.textSub,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  title: {
    marginTop: 40,
    marginBottom: 12,
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
    color: colors.white,
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
  marginBottom: {
    marginBottom: 20,
  },
  isDisabled: {
    opacity: 0.5,
  },
})

export default ChangeYourEmail
