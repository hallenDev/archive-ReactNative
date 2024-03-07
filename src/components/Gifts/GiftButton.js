import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import PriceForBtn from '~/ui/PriceForBtn'
import { colors, typography } from '~/ui/theme'

const GiftButton = ({ idGift, price, nameGift, onChooseGift, uri }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onChooseGift(idGift)}
  >
    <View style={styles.gift}>
      <Image source={{ uri }} style={styles.giftPic} />
    </View>
    <View style={styles.btn}>
      <Text style={styles.btnText}>{nameGift}</Text>
      <PriceForBtn price={price} />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    minHeight: 60,
    marginBottom: 15,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gift: {
    padding: 7,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  giftPic: {
    width: 50,
    height: 50,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
    marginLeft: 20,
    marginRight: 10,
  },
})

export default GiftButton
