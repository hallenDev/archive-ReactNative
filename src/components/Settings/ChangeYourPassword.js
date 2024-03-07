import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { useForm, Controller } from 'react-hook-form'
import {
  changePassword,
  changePasswordResolver as resolver,
} from '~/shared/api/members'
import {
  Button,
  LinkText,
  TextInput,
  WithSecureTextEntryIcon,
  Placeholder,
} from '~/ui'
import { showNotificationError } from '~/services/in-app-notifications'
import { text, typography, colors } from '~/ui/theme'

const ChangeYourPassword = () => {
  const [currentPasswordSecure, setCurrentPasswordSecure] = React.useState(true)
  const [newPasswordSecure, setNewPasswordSecure] = React.useState(true)
  const [confirmNewPasswordSecure, setConfirmNewPasswordSecure] =
    React.useState(true)

  const navigation = useNavigation()

  const { mutateAsync, isLoading } = useMutation(changePassword)
  const form = useForm({
    resolver,
  })

  const onSubmit = input => {
    mutateAsync(input)
      .then(data => {
        navigation.navigate('MyAccountChangeYourPasswordSuccessScreen')
      })
      .catch(({ data }) => {
        showNotificationError({
          description: data?.errors?.[0] || '',
        })
      })
  }

  const isError = Object.keys(form?.formState?.errors).length > 0

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Must be between 6 and 20 characters</Text>

      <Controller
        style={styles.mb10}
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <WithSecureTextEntryIcon
            value={currentPasswordSecure}
            onPress={() => setCurrentPasswordSecure(s => !s)}
          >
            <TextInput
              style={styles.textInput}
              inputContainterStyle={[
                styles.inputContainterStyle,
                form?.formState?.errors?.currentPassword && styles.inputError,
              ]}
              placeholder="Current Password"
              onChangeText={onChange}
              value={value}
              secureTextEntry={currentPasswordSecure}
              keyboardType="default"
              maxLength={20}
            />
          </WithSecureTextEntryIcon>
        )}
        name="currentPassword"
        defaultValue=""
      />

      {form?.formState?.errors?.currentPassword?.message && (
        <Text style={styles.error}>
          {form?.formState?.errors?.currentPassword?.message?.replace(
            'CurrentPassword',
            'Current password',
          )}
        </Text>
      )}

      <Controller
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <WithSecureTextEntryIcon
            value={confirmNewPasswordSecure}
            onPress={() => setConfirmNewPasswordSecure(s => !s)}
          >
            <TextInput
              style={styles.textInput}
              inputContainterStyle={[
                styles.inputContainterStyle,
                form?.formState?.errors?.newPassword && styles.inputError,
              ]}
              placeholder="New Password"
              onChangeText={onChange}
              value={value}
              secureTextEntry={confirmNewPasswordSecure}
              keyboardType="default"
              maxLength={20}
            />
          </WithSecureTextEntryIcon>
        )}
        name="newPassword"
        defaultValue=""
      />

      {form?.formState?.errors?.newPassword?.message && (
        <Text style={styles.error}>
          {form?.formState?.errors?.newPassword?.message?.replace(
            'NewPassword',
            'New password',
          )}
        </Text>
      )}

      <Controller
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <WithSecureTextEntryIcon
            value={newPasswordSecure}
            onPress={() => setNewPasswordSecure(s => !s)}
          >
            <TextInput
              style={styles.textInput}
              inputContainterStyle={[
                styles.inputContainterStyle,
                form?.formState?.errors?.newPasswordConfirm &&
                  styles.inputError,
              ]}
              placeholder="Confirm New Password"
              onChangeText={onChange}
              value={value}
              secureTextEntry={newPasswordSecure}
              keyboardType="default"
              maxLength={20}
            />
          </WithSecureTextEntryIcon>
        )}
        name="newPasswordConfirm"
        defaultValue=""
      />

      {form?.formState?.errors?.newPasswordConfirm?.message && (
        <Text style={styles.error}>
          {form?.formState?.errors?.newPasswordConfirm?.message?.replace(
            'newPasswordConfirm',
            'Confirm password',
          )}
        </Text>
      )}

      <Button
        type="primary"
        style={[styles.changeBtn, isLoading && styles.isDisabled]}
        onPress={form.handleSubmit(onSubmit)}
        isDisabled={isError || isLoading}
      >
        {isLoading ? <Placeholder isWhite /> : 'Change Password'}
      </Button>

      <LinkText
        style={styles.link}
        onPress={() =>
          navigation?.navigate('MyAccountForgotYourPasswordScreen')
        }
      >
        Forgot your Password?
      </LinkText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  title: {
    marginBottom: 20,
    color: colors.textSub,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  link: {
    marginTop: 40,
    alignItems: 'center',
    color: colors.textSub,
  },
  inputContainterStyle: {
    marginBottom: 20,
  },
  textInput: {
    ...typography.bodyRegular14,
    color: colors.textSub,

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
    marginTop: -20,
    marginBottom: 10,
  },
  inputError: {
    borderColor: colors.redAlert,
    borderWidth: 1,
  },
  changeBtn: {
    marginTop: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  isDisabled: {
    opacity: 0.5,
  },
})

export default ChangeYourPassword
