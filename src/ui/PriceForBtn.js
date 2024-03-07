import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Coin } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const PriceForBtn = ({ price }) => (
  <View style={styles.container}>
    <Coin width={12} height={12} color={colors.primary} />
    <Text style={styles.price}>{price}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: colors.textMain,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  price: {
    ...typography.p2,
    color: colors.primary,
    marginLeft: 4,
  },
})

export default PriceForBtn
