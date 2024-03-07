import React from 'react'
import { StyleSheet, Pressable, Text, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WelcomeSlogan from './WelcomeSlogan'
import ButtonGradient from '~/ui/ButtonGradient'
import { colors, typography } from '~/ui/theme'

const WelcomeScreenContent = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/images/local/welcome_bg.png')}
      resizeMode="cover"
      style={styles.bg}
    >
      <SafeAreaView style={styles.content}>
        <WelcomeSlogan />
        <ButtonGradient
          title="Create account"
          className={styles.gradientBtn}
          textClassName={styles.gradientBtnText}
          onAction={() => navigation.navigate('SignupScreen')}
        />
        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.logIn}>Log in</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    height: '100%',
    width: '100%',
  },
  gradientBtn: {
    maxHeight: 56,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  gradientBtnText: {
    ...typography.h3,
    color: colors.textMain,
  },
  logIn: {
    ...typography.h3,
    color: colors.white,
    marginTop: 30,
  },
})

export default WelcomeScreenContent
