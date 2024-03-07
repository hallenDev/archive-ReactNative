import React from 'react'
import { StyleSheet, View, Text, Image, Modal } from 'react-native'

import logo from '~/assets/images/local/loading-spinner.png'
import { Container, Button } from '~/ui'
import { colors, typography } from '~/ui/theme'

const ErrorModal = ({ closeAction, action, errorMessage = '' }) => (
  <Modal transparent>
    <Container>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Payment ERROR!</Text>
        <Text style={styles.info}>
          The system is currently experiencing technical difficulties.{`\n`}
          Please try again later or edit payment details.
        </Text>
        {errorMessage ? (
          <Text style={styles.details}>{errorMessage}</Text>
        ) : null}
      </View>
      <View>
        <Button type="primary" onPress={closeAction} style={styles.btn}>
          Try again
        </Button>
        <Button type="transparent" onPress={action}>
          Go back
        </Button>
      </View>
    </Container>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  title: {
    ...typography.h2,
    color: colors.redAlert,

    marginBottom: 12,
    textAlign: 'center',
  },
  info: {
    ...typography.p1,
    color: colors.textMain,

    textAlign: 'center',
  },
  details: {
    ...typography.c2,
    color: colors.grey,

    marginTop: 12,
    textAlign: 'center',
  },
  btn: {
    marginBottom: 20,
  },
})

export default ErrorModal
