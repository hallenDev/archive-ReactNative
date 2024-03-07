import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  LinearGradient,
  OZContainer,
  Button,
} from '~/ui'

import { colors, typography } from '~/ui/theme'

const ResetPasswordSuccessScreen = ({ navigation, route }) => (
  <LinearGradient style={styles.background} colors={colors.bgGradient}>
    <KeyboardAvoidingView style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <OZContainer hideHeader>
          <View style={styles.wrapper}>
            <Image
              source={require('~/assets/images/local/loading-spinner.png')}
              style={styles.logo}
              resizeMode="contain"
              resizeMethod="scale"
            />
            <Text style={styles.title}>Password changed successfully</Text>
            <Text style={styles.info}>
              Please login now with your new password.
            </Text>
          </View>
          <Button
            onPress={() => navigation.navigate('LoginScreen')}
            type="primary"
          >
            Login
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

export default ResetPasswordSuccessScreen
