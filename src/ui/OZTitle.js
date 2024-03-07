import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, typography } from '~/ui/theme'

const Title = ({ left, right, largeHeader }) => (
  <View style={styles.container}>
    <Text style={[styles.left, largeHeader && styles.largeHeader]}>{left}</Text>
    <Text style={[styles.right, largeHeader && styles.largeHeader]}>
      {right}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomColor: colors.semiTransparentWhite15,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  left: {
    ...typography.h3,
    color: colors.textMain,
  },
  right: {
    ...typography.p1,
    color: colors.textMain,
  },
  largeHeader: {
    ...typography.registrationHeader,
  },
})

export default Title
