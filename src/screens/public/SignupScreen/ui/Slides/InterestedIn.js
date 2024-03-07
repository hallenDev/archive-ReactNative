import React from 'react'
import { StyleSheet, View } from 'react-native'

import InterestMap from '~/shared/types/InterestMap'

import { SelectBoxField, Button, OZContainer, OZTitle } from '~/ui'

import { useFormContext } from 'react-hook-form'

const InterestedIn = ({ nextAction, backAction }) => {
  const form = useFormContext()

  return (
    <OZContainer backAction={backAction}>
      <View style={styles.row}>
        <OZTitle left="What are you looking for?" largeHeader />
        <SelectBoxField name="interested_in" values={InterestMap} multiple />
      </View>
      <View style={styles.action}>
        <Button
          type="primary"
          onPress={async () => {
            const isVal = await form.trigger(['interested_in'])

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
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default InterestedIn
