import React from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'

import { InputField, OZContainer, Button, OZTitle } from '~/ui'

import { useFormContext } from 'react-hook-form'

const AboutMe = ({ nextAction, backAction }) => {
  const form = useFormContext()

  return (
    <OZContainer backAction={backAction} withScroll>
      <View style={styles.row}>
        <OZTitle left="What are some of your hobbies?" largeHeader />
        <InputField
          name="aboutMe"
          placeholder="Share something about yourself..."
          multiline
          maxLength={500}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.action}>
        <Button
          type="primary"
          onPress={async () => {
            Keyboard.dismiss()

            const isVal = await form.trigger(['aboutMe'])

            if (isVal) {
              nextAction()
            }
          }}
        >
          Continue
        </Button>
      </View>
    </OZContainer>
  )
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 32,
  },
  input: {
    minHeight: 160,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default AboutMe
