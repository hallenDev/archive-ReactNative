import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'

import GenderMap from '~/shared/types/GenderMap'

import { OZContainer, OZTitle, SelectBoxField, Button } from '~/ui'

import { useFormContext } from 'react-hook-form'

const AgeGender = ({ nextAction, backAction }) => {
  const form = useFormContext()

  return (
    <OZContainer backAction={backAction}>
      <View style={styles.row}>
        <OZTitle left="What is your gender?" largeHeader />
        <SelectBoxField name="gender" values={GenderMap} />
      </View>
      <View style={styles.action}>
        <Button
          type="primary"
          onPress={async () => {
            const isVal = await form.trigger(['gender'])

            if (isVal) {
              const [gender, seeking] = form.getValues(['gender', 'seeking'])
              if (!seeking || !!seeking.length) {
                switch (gender) {
                  case 'MAN':
                    form.setValue('seeking', ['WOMAN'])
                    break
                  case 'WOMAN':
                    form.setValue('seeking', ['MAN'])
                    break
                }
              }
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
  slider: {
    maxWidth: Dimensions.get('window').width - 40,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default AgeGender
