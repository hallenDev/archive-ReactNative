import React from 'react'
import { StyleSheet, View, Text, Linking, SafeAreaView } from 'react-native'
import BackgroundGradient from '~/ui/background-gradient'
import ButtonGradient from '~/ui/ButtonGradient'
import { colors } from '~/ui/theme'

const ResetYourPasswordSuccessScreen = ({ route, navigation }) => {
  const email = route?.params?.email

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>
            A password reset link was sent to{`\n`}
            {email}
          </Text>
          <Text style={styles.description}>
            Click the link in the email to reset your password.
            {`\n`}
            Don't forget to check your spam folder
          </Text>

          <ButtonGradient
            title="Done"
            className={styles.btn}
            onAction={() => navigation.pop(3)}
          />
        </View>
      </SafeAreaView>
    </BackgroundGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: colors.textSub,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: -1,
  },
  description: {
    textAlign: 'center',
    marginVertical: 20,
    color: colors.textSub,
    fontSize: 14,
    lineHeight: 22,
  },
  center: {
    width: '100%',
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: 150,
  },
})

export const options = () => ({
  headerShown: false,
})

export default ResetYourPasswordSuccessScreen
