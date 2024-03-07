import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import TypeWriter from 'react-native-typewriter'

import Button from '~/ui/Button'
import { OZContainer } from '~/ui'

import { colors, typography } from '~/ui/theme'

const Welcome = ({ nextAction }) => {
  const navigation = useNavigation()

  return (
    <OZContainer backAction={() => navigation.goBack()}>
      <View style={styles.title}>
        <TypeWriter typing={1}>
          <Text style={{ ...typography.h1, color: colors.textMain }}>
            Hey there 😉
          </Text>
        </TypeWriter>
      </View>
      <Text style={styles.text}>
        <Text style={styles.firstSentence}>
          Our goal is to create the best place to meet new people.
        </Text>{' '}
        We are going to need your help. It starts with you taking the
        registration process seriously.
      </Text>
      <Text style={styles.text}>
        All profiles are reviewed and higher quality profiles will be rewarded
        with more views.
      </Text>
      <View style={styles.action}>
        <Button type="primary" onPress={nextAction}>
          Get Started
        </Button>
      </View>
    </OZContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    borderBottomColor: colors.semiTransparentWhite15,
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  text: {
    ...typography.h4,
    marginBottom: 32,
    color: colors.textSub,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  firstSentence: {
    ...typography.h3,
    color: colors.textMain,
  },
})

export default Welcome
