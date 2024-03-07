import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Check } from '~/ui/icons'

import { colors, typography } from '~/ui/theme'

const Benefit = ({ title }) => (
  <View style={styles.container}>
    <Check color={colors.greenApprove} width={16} height={16} />
    <Text style={styles.benefit}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  benefit: {
    ...typography.p3,
    color: colors.textSub,
    paddingLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
})

export default Benefit
