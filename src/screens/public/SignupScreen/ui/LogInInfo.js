import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'

import { colors, typography } from '~/ui/theme'

const LogInInfo = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.logInContiner}>
      <Text style={styles.logInText}>
        Already have an account?{' '}
        <Text
          onPress={() => {
            Keyboard.dismiss()
            setTimeout(() => navigation.navigate('LoginScreen'), 500)
          }}
          style={styles.logInAction}
        >
          Log in
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logInContiner: {
    marginTop: 32,
    alignItems: 'center',
  },
  logInText: {
    ...typography.p2,
    color: colors.textSub,
  },
  logInAction: {
    ...typography.p2,
    color: colors.textMain,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
})

export default LogInInfo
