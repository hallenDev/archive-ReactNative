import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { validate } from '~/shared/api/public'

import LogInInfo from '../LogInInfo'
import { InputField, CheckBoxField, OZContainer, Button } from '~/ui'
import { useFormContext } from 'react-hook-form'
import { colors, typography } from '~/ui/theme'

const EmailPassword = ({ nextAction, backAction }) => {
  const [loading, setLoading] = useState(false)
  const { trigger, setError, getValues } = useFormContext()
  const navigation = useNavigation()

  const validateInput = name =>
    validate({
      fields: [name],
      [name]: getValues(name).trim(),
    }).catch(({ data }) => {
      setError(name, {
        type: 'manual',
        message: data.errors[0],
      })

      throw new Error()
    })

  return (
    <OZContainer
      title="Create your login"
      backAction={backAction}
      largeHeader
      withScroll
    >
      <View style={styles.field}>
        <InputField
          name="email"
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.field}>
        <InputField
          name="password"
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={true}
        />
      </View>
      <View style={[styles.field, styles.agrement]}>
        <CheckBoxField name="agree" />
        <Text style={styles.agrementText}>
          By submitting this form you certify you are at least 18 years old, and
          you agree to our{' '}
          <Text
            onPress={() => navigation.navigate('TermsOfUseScreen')}
            style={[styles.agrementText, styles.underline]}
          >
            terms{' '}
          </Text>
          &{' '}
          <Text
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            style={[styles.agrementText, styles.underline]}
          >
            privacy policy
          </Text>
          .
        </Text>
      </View>

      <View style={styles.action}>
        <Button
          type="primary"
          loading={loading}
          onPress={async () => {
            setLoading(true)
            Keyboard.dismiss()

            return trigger(['email', 'password', 'agree'])
              .then(result => {
                if (!result) return

                return Promise.all([
                  validateInput('email'),
                  validateInput('password'),
                ])
                  .then(nextAction)
                  .catch(() => null)
              })
              .finally(() => setLoading(false))
          }}
        >
          Continue
        </Button>
      </View>

      <LogInInfo />
    </OZContainer>
  )
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  action: {
    marginTop: 20,
  },
  agrement: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width - 40,
  },
  agrementText: {
    marginLeft: 20,
    ...typography.p2,
    color: colors.semiGray,
    flex: 1,
  },
  underline: {
    textDecorationLine: 'underline',
  },
})

export default EmailPassword
