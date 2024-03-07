import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native'

import { LinearGradient } from '~/ui'
import { colors, typography, text } from '~/ui/theme'
import off39 from '~/assets/images/39-off.png'
import off49 from '~/assets/images/49-off.png'
import { useState } from 'react'
import QuestionPopup from '~/ui/QuestionPopup'

const size = Dimensions.get('window').width / 3

export default function Package({
  pkg,
  products,
  onPayPackage = () => {},
  isOfferBest = false,
  isOffer39 = false,
  isOffer49 = false,
}) {
  const [visible, setVisible] = useState(false)

  const packageId = pkg?.storeIds?.[Platform.OS]
  const product = products.find(p => p.productId === packageId)

  if (!product) return null

  const localizedPrice =
    product?.localizedPrice ||
    product?.oneTimePurchaseOfferDetails?.formattedPrice ||
    '$-'

  const credits = pkg?.name?.split(' ')?.[0] || 0

  const amount =
    Number(
      (
        product?.oneTimePurchaseOfferDetails?.priceAmountMicros / 1000000
      ).toFixed(2),
    ) ||
    product?.price ||
    0

  const pricePerCredit = credits
    ? Math.round(Number.parseFloat((Math.round(amount) * 100) / credits))
    : '-'

  const percentDiscount = isOffer39 ? off39 : isOffer49 ? off49 : undefined

  const localizedPriceStyle =
    localizedPrice.length > 8
      ? styles.localizedPriceLong
      : styles.localizedPriceShort

  const TEXT = `You are about to purchase ${credits}\n Credits for ${product?.localizedPrice}`

  const showModal = b => {
    setVisible(b)
  }

  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => showModal(true)}>
          {!!percentDiscount && (
            <Image source={percentDiscount} style={styles.img} />
          )}
          <LinearGradient
            end={{ x: 0.1, y: 0.0 }}
            start={{ x: 0.9, y: 1.0 }}
            style={[styles.container]}
            colors={isOfferBest ? colors.primaryGradient : colors.goldGradient}
          >
            <View style={styles.info}>
              <Text
                style={[
                  styles.credits,
                  isOfferBest && { color: colors.textMain },
                ]}
                allowFontScaling={false}
              >
                {credits}
              </Text>
              <Text
                style={[
                  styles.creditsTitle,
                  isOfferBest && { color: colors.textMain },
                ]}
                allowFontScaling={false}
              >
                Credits
              </Text>
              <Text
                style={[
                  styles.price,
                  localizedPriceStyle,
                  isOfferBest && { color: colors.textMain },
                ]}
                allowFontScaling={false}
              >
                {localizedPrice}
              </Text>

              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                style={[
                  styles.pricePerCredit,
                  isOfferBest && { color: colors.textMain },
                ]}
                allowFontScaling={false}
              >
                {pricePerCredit}&#162; per credit
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal animationType="none" transparent visible={visible}>
        <QuestionPopup
          questionText={TEXT}
          onContinue={onPayPackage}
          onClose={() => showModal(false)}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginRight: 10,
    marginTop: 25,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    height: 160,
    width: size - 20,
  },
  info: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  credits: {
    ...typography.h2,
    color: colors.black,
  },
  creditsTitle: {
    ...typography.p3,
    marginBottom: 25,
  },
  price: {
    ...text.regular,
    color: colors.black,
  },
  localizedPriceLong: { fontSize: 10 },
  localizedPriceShort: { fontSize: 16 },
  pricePerCredit: {
    ...typography.c2,

    marginTop: 3,
  },
  img: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: -25,
    left: 25,
    zIndex: 99,
  },
})
