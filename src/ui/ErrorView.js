import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from '~/ui/LinearGradient'
import { Button } from '~/ui'
import globalStyle from '~/ui/globalStyle'
import { colors, typography } from '~/ui/theme'
import logo from '~/assets/images/local/loading-spinner.png'

const ErrorView = ({ title, description, btn, action }) => (
  <View style={globalStyle.flex}>
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Button style={styles.btn} onPress={action}>
          <LinearGradient
            style={styles.linearContainer}
            colors={colors.linerGradient}
          >
            <Text style={styles.btnText}>{btn}</Text>
          </LinearGradient>
        </Button>
      </View>
    </LinearGradient>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.p1b,
    color: colors.textMain,

    marginTop: 20,
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  description: {
    ...typography.p2,
    color: colors.semiGray,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    marginBottom: 16,
  },
  linearContainer: {
    width: '70%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
})
export default ErrorView
