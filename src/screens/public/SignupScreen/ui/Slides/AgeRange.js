import React, { useState } from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { SliderField, Button, OZContainer, OZTitle } from '~/ui'
import { colors, typography } from '~/ui/theme'

const AgeRange = ({ nextAction, backAction }) => {
  const form = useFormContext()
  const [sliderValue, setSliderValue] = useState([])

  return (
    <OZContainer backAction={backAction}>
      <View style={styles.row}>
        <OZTitle left="What age range are you interested in?" largeHeader />
        <View style={styles.sliderWrap}>
          <Text style={styles.seekingAge}>{sliderValue.join(' to ')}</Text>
          <SliderField
            name="seekingAge"
            width={Dimensions.get('window').width - 20}
            gravity={'center'}
            min={18}
            max={99}
            step={1}
            style={styles.slider}
            withController={false}
            onChangeValue={setSliderValue}
            sliderValue={sliderValue}
          />
        </View>
      </View>

      <View style={styles.action}>
        <Button
          type="primary"
          onPress={async () => {
            form.setValue('seekingAge', sliderValue)

            const isVal = await form.trigger(['seekingAge'])

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
  seekingAge: {
    ...typography.h3,
    color: colors.textMain,
    textAlign: 'center',
    marginVertical: 15,
  },
})

export default AgeRange
