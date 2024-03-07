import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, LinearGradient } from '~/ui'
import { colors } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'

const ChangeYourPasswordSuccessScreen = ({ navigation }) => {
  return (
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.title}>
            Your password was{'\n'}successfully changed!
          </Text>
        </View>
        <Button
          type="primary"
          style={styles.button}
          onPress={() => navigation.pop(2)}
        >
          Continue
        </Button>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginHorizontal: 20,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    color: colors.textSub,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: -1,
  },
  center: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  button: {
    marginBottom: 100,
  },
})

export const options = () => ({
  headerShown: false,
})

export default ChangeYourPasswordSuccessScreen
