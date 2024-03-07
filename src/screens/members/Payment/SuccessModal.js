import React from 'react'
import { StyleSheet, View, Text, Image, Modal } from 'react-native'

import useUserBalance from '~/hooks/useUserBalance'

import logo from '~/assets/images/local/loading-spinner.png'
import { Container, Button } from '~/ui'

import { colors, typography } from '~/ui/theme'

const SuccessModal = ({ action }) => {
  const { data } = useUserBalance()
  const credits = data?.credits?.toLocaleString()

  return (
    <Modal transparent>
      <Container>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Payment successful!</Text>
          <Text style={styles.info}>
            Your balance has been updated to {credits} credits.
          </Text>
        </View>
        <View>
          <Button type="primary" onPress={action}>
            Go back
          </Button>
        </View>
      </Container>
    </Modal>
  )
}

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
    color: colors.greenApprove,
    marginBottom: 12,
    textAlign: 'center',
  },
  info: {
    ...typography.p1,
    color: colors.textMain,
    textAlign: 'center',
  },
  btn: {
    marginBottom: 20,
  },
})

export default SuccessModal
