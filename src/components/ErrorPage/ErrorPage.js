import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native'

import { Button, LinearGradient } from '~/ui'
import { colors, typography } from '~/ui/theme'
import logo from '~/assets/images/local/loading-spinner.png'

const DEFAULT_TITLE = 'Something went wrong'

export default function ErrorPage({
  navigation,
  statusCode,
  title = DEFAULT_TITLE,
  description,
  isDisabled,
}) {
  const handleToHomePage = () => {
    navigation.navigate('Match')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        {statusCode ? (
          <Text style={styles.errorCode}>{statusCode}</Text>
        ) : (
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        )}
        <Text style={styles.text}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Button
        style={styles.btn}
        onPress={handleToHomePage}
        isDisabled={isDisabled}
      >
        <LinearGradient
          style={styles.linearContainer}
          colors={colors.linerGradient}
        >
          <Text style={styles.btnText}>Go to Homepage</Text>
        </LinearGradient>
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: 150,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typography.p1b,
    color: colors.textMain,
    marginTop: 12,
    marginBottom: 8,
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
  errorCode: {
    ...typography.errorParams,
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
})
