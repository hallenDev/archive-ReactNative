import React from 'react'
import { Text, View } from 'react-native'
import SvgMicrophone from '~/ui/icons/Microphone'
import { voiceMessageStyles as styles } from '../styles/voice-message'
import Divider from './Divider'

const VoiceMessageListHeader = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.iconWrapper}>
          <SvgMicrophone style={styles.icon} />
        </View>
        <Text style={styles.title}>Record a voice message!</Text>
      </View>
      <Text style={styles.description}>
        Record a voice message for your profile to get more activity!
      </Text>
      <Divider />
    </>
  )
}

export default VoiceMessageListHeader
