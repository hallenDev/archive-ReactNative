import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  LinearGradient,
  OZContainer,
  Button,
} from '~/ui'

import { colors, typography } from '~/ui/theme'

const ForgotSuccessScreen = ({ navigation, route }) => (
  <LinearGradient style={styles.background} colors={colors.bgGradient}>
    <KeyboardAvoidingView style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <OZContainer hideHeader>
          <View style={styles.wrapper}>
            <Text style={styles.title}>
              A password reset link was sent to{`\n`}
              {route.params?.email}.
            </Text>
            <Text style={styles.info}>
              Click the link in the email to reset your password.
              {`\n`}
              Don't forget to check your spam folder
            </Text>
          </View>
          <Button
            onPress={() => navigation.navigate('WelcomeScreen')}
            type="primary"
          >
            Back
          </Button>
        </OZContainer>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </LinearGradient>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  title: {
    ...typography.p1b,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 22,
  },
  info: {
    ...typography.p2,
    color: colors.textMain,
    textAlign: 'center',
  },
  logo: {
    width: 52,
    height: 52,
    marginBottom: 32,
  },
})

export default ForgotSuccessScreen
