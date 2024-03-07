import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Coin } from '~/ui/icons'
import { typography, colors } from '~/ui/theme'

const CoinLabel = ({ credits = 0 }) => {
  if (!credits) return null

  return (
    <View style={styles.credits}>
      <Coin width="12" height="12" color={colors.primary} />
      <Text style={styles.creditsTxt}>{credits}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  credits: {
    height: 20,
    minWidth: 38,
    backgroundColor: colors.textMain,
    borderRadius: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  creditsTxt: {
    ...typography.p3,
    color: colors.primary,

    marginLeft: 2,
  },
})

export default CoinLabel
