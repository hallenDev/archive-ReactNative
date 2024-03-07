import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'

import GenderMap from '~/shared/types/GenderMap'

import { SelectBoxField, Button, OZContainer, OZTitle } from '~/ui'

import { useFormContext } from 'react-hook-form'

const InterestedInAge = ({ nextAction, backAction }) => {
  const form = useFormContext()

  return (
    <OZContainer backAction={backAction}>
      <View style={styles.row}>
        <OZTitle left="What are you looking for?" largeHeader />
        <SelectBoxField name="seeking" values={GenderMap} multiple />
      </View>

      <View style={styles.action}>
        <Button
          type="primary"
          onPress={async () => {
            const isVal = await form.trigger(['seeking'])

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
  sliderWrap: {
    paddingHorizontal: 20,
  },
  slider: {
    maxWidth: Dimensions.get('window').width - 80,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})

export default InterestedInAge
