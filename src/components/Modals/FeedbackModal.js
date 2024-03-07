import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import Rate, { AndroidMarket } from 'react-native-rate'
import { useMutation } from 'react-query'

import noop from '~/utils/noop'
import { feedback } from '~/shared/api/members'
import { Button } from '~/ui'
import TextInput from '~/ui/TextInput'

import { text, colors, typography } from '~/ui/theme'

const MAX_CHAR_COUNT = 2000

const options = {
  AppleAppID: Config.APPLE_STORE_ID,
  GooglePackageName: Config.APP_BUNDLE_ID,
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
  openAppStoreIfInAppFails: true,
}

const FeedbackModal = ({ isShown = false, onHide = noop }) => {
  const [screen, setScreen] = React.useState(0)
  const [feedbackText, setFeedbackText] = React.useState('')
  const { mutate } = useMutation(feedback)

  const handleSubmit = () => {
    mutate({ feedback: feedbackText })

    setScreen(2)
  }

  const handleOpenRate = () => {
    Rate.rate(options)

    onHide()
  }

  if (screen === 0) {
    return (
      <>
        <Text style={styles.title}>
          Are you enjoying {Config.DISPLAY_NAME}?
        </Text>
        <Text style={styles.description}>
          Feel free to give us some feedback!
        </Text>

        <View style={styles.buttons}>
          <Button
            type="primary"
            style={styles.submit}
            onPress={handleOpenRate}
            isLoading={false}
          >
            Yes, it’s great!
          </Button>
          <Button
            style={styles.cancel}
            textStyle={styles.cancelText}
            onPress={() => setScreen(1)}
            type="cancel"
          >
            No, not really
          </Button>
        </View>

        <TouchableOpacity onPress={onHide}>
          <Text style={styles.later}>Ask me later</Text>
        </TouchableOpacity>
      </>
    )
  }

  if (screen === 1) {
    return (
      <>
        <Text style={styles.title}>Help us to become better!</Text>
        <Text style={styles.description}>
          Please give us some feedback, so we could improve your experience
        </Text>

        <TextInput
          inputContainterStyle={styles.input}
          style={styles.textInput}
          multiline
          numberOfLines={5}
          placeholder="Type your complaint"
          textAlignVertical="top"
          onChangeText={e => {
            setFeedbackText(e)
          }}
          value={feedbackText}
          maxLength={MAX_CHAR_COUNT}
        />

        <View style={styles.buttons}>
          <Button type="primary" style={styles.submit} onPress={handleSubmit}>
            Send
          </Button>
          <Button
            style={styles.cancel}
            textStyle={styles.cancelText}
            onPress={onHide}
            type="cancel"
          >
            Cancel
          </Button>
        </View>
      </>
    )
  }

  return (
    <>
      <Text style={styles.title}>Thank you!</Text>
      <Text style={styles.description}>
        We listen to the opinions of our users. And we are constantly working to
        improve your in-app experience
      </Text>

      <View style={styles.buttons}>
        <Button type="primary" style={styles.submit} onPress={onHide}>
          OK
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    ...typography.subtitle2Semibold,
    color: colors.textMain,
    marginBottom: 20,
  },
  description: {
    ...typography.bodyRegular14,
    color: colors.grey,
  },
  input: {
    marginTop: 20,
  },
  textInput: {
    color: colors.textMain,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
  },
  submit: {
    flex: 1,
    height: 46,
    minHeight: 46,
    marginRight: 12,
  },
  cancel: {
    flex: 1,
    height: 46,
    minHeight: 46,
  },
  cancelText: {
    color: colors.textSub,
  },
  later: {
    fontFamily: text.semiBold.fontFamily,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: colors.grey,

    marginTop: 20,
    textAlign: 'center',
  },
})

export default FeedbackModal
