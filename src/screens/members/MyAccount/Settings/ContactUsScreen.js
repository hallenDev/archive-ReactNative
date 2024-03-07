import React from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import ZendeskChat from 'react-native-zendesk-chat'
import Config from 'react-native-config'
import { useUser } from '~/context/UserContext'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import { Button, LinearGradient } from '~/ui'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { colors, text } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'
import { SUPPORT_EMAIL } from '~/configs/constants'

const ContactUsScreen = ({ navigation }) => {
  const { user } = useUser()

  const startChat = () => {
    ZendeskChat.startChat({
      name: user?.username,
      email: user?.email,
      tags: [Config.ZENDESK_TAG],
      behaviorFlags: {
        showAgentAvailability: true,
        showChatTranscriptPrompt: true,
        showPreChatForm: false,
        showOfflineForm: true,
      },
      preChatFormOptions: {
        name: 'required',
        email: 'required',
        department: 'required',
      },
    })
  }

  return (
    <SafeAreaView edges={['bottom']} style={globalStyle.flex}>
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <CustomScrollbar contentContainerStyle={styles.container}>
          <Text style={[styles.termsTitle, styles.mb30]}>
            Our Customer Service operates 24 hours a day, 7 days a week.
          </Text>

          <Text style={styles.termsTitle}>Call Us</Text>
          <Text style={[styles.termsText, styles.mb30]}>1-888-617-2001</Text>

          <Text style={styles.termsTitle}>Email</Text>
          <Text style={[styles.termsText, styles.mb30]}>{SUPPORT_EMAIL}</Text>

          <Text style={styles.termsTitle}>Live Chat</Text>
          <Button
            style={[styles.btn, styles.mb30]}
            textStyle={styles.white}
            onPress={startChat}
          >
            Start Chat
          </Button>

          <Text style={styles.termsTitle}>Share Feedback</Text>
          <Button
            style={[styles.btn, styles.mb30]}
            textStyle={styles.white}
            onPress={() => navigation.navigate('MyAccountSendFeedbackScreen')}
          >
            Send Feedback
          </Button>
        </CustomScrollbar>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  termsTitle: {
    color: colors.textMain,
    fontSize: 17,
    fontFamily: text.semiBold.fontFamily,
    marginBottom: 6,
  },
  termsText: {
    color: colors.textMain,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: text.regular.fontFamily,
  },
  mb30: {
    marginBottom: 30,
  },
  btn: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 9,
    marginTop: 6,
  },
  white: {
    color: colors.textMain,
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Help / Contact Us"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default ContactUsScreen
