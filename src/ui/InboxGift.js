import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { colors } from '~/ui/theme'

const InboxGift = ({ uri }) => (
  <View style={styles.gift}>
    <Image source={{ uri }} style={styles.giftPic} />
  </View>
)

const styles = StyleSheet.create({
  gift: {
    width: 40,
    height: 40,
    backgroundColor: colors.semiBlack25,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  giftPic: {
    height: 30,
    width: 30,
  },
})

export default InboxGift
