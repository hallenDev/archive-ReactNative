import React, { useState } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import { useFormContext } from 'react-hook-form'

import { validate } from '~/shared/api/public'

import LogInInfo from '../LogInInfo'
import { InputField, Button, OZContainer } from '~/ui'

const UserName = ({ nextAction, backAction }) => {
  const [loading, setLoading] = useState(false)
  const form = useFormContext()

  return (
    <OZContainer
      title="Create your username"
      backAction={backAction}
      largeHeader
      withScroll
    >
      <InputField name="username" placeholder="Enter username" />

      <View style={styles.action}>
        <Button
          type="primary"
          loading={loading}
          onPress={async () => {
            setLoading(true)
            Keyboard.dismiss()

            return form
              .trigger(['username'])
              .then(result => {
                if (!result) return

                return validate({
                  fields: ['username'],
                  username: form.getValues('username'),
                })
                  .then(nextAction)
                  .catch(({ data }) =>
                    form.setError('username', {
                      type: 'manual',
                      message: data.errors[0],
                    }),
                  )
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
  action: {
    marginTop: 32,
  },
})

export default UserName
