import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import GiftButton from './GiftButton'
import { colors, typography } from '~/ui/theme'
import gift from '~/assets/images/gift.png'
import SvgInfo from '~/ui/icons/Info'
import { Coin } from '~/ui/icons'

const ChoseGiftModal = ({ username, gifts = [], onChooseGift, credits }) => (
  <>
    <View style={styles.headerWrap}>
      <Image source={gift} style={styles.giftImg} />
      <View style={styles.ml10}>
        <Text style={styles.title}>Skip having to match!</Text>
        <Text style={styles.text}>
          Include a virtual gift to go {'\n'}straight to inbox!
        </Text>
      </View>
    </View>

    <View style={styles.hint}>
      <SvgInfo style={styles.hintIcon} />
      <Text style={styles.hintText}>
        We've got you!{' '}
        <Text style={styles.bold}>
          Credits are returned to you after 7 days
        </Text>{' '}
        if you don't get a reply!
      </Text>
    </View>
    <View style={styles.line} />
    <Text style={styles.nameContainer} numberOfLines={2}>
      <Text style={styles.textWithName}>Pick a virtual gift to send </Text>
      <Text style={styles.name} numberOfLines={1}>
        {username}
      </Text>
    </Text>
    <View style={styles.giftsList}>
      {gifts.map(item => (
        <GiftButton
          key={item.id}
          idGift={item.id}
          nameGift={item.name}
          price={item.credits}
          onChooseGift={onChooseGift}
          uri={item.urls[150]}
        />
      ))}
    </View>

    <View style={styles.creditContainer}>
      <Text style={styles.creditTxt}>Credit Balance: </Text>
      <Coin
        width={12}
        height={12}
        color={colors.semiGray}
        style={styles.coin}
      />
      <Text style={styles.creditTxt}>{credits}</Text>
    </View>
  </>
)

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ml10: {
    marginLeft: 10,
  },
  giftImg: {
    width: 60,
    height: 60,
  },
  title: {
    ...typography.h3,
    color: colors.textMain,
    marginBottom: 6,
  },
  text: {
    ...typography.p3,
    color: colors.semiGray,
  },
  hint: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 12,
  },
  hintIcon: {
    color: colors.white,
    marginRight: 10,
  },
  hintText: {
    ...typography.p2,
    color: colors.white,
    fontSize: 13,
  },
  bold: {
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.semiGray,
    marginVertical: 15,
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  textWithName: {
    ...typography.p3,
    color: colors.semiGray,
  },
  name: {
    ...typography.p3b,
    color: colors.textMain,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  giftsList: {
    width: '100%',
    marginTop: 20,
  },
  creditContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditTxt: {
    ...typography.p3,
    color: colors.semiGray,
  },
  coin: {
    marginRight: 5,
  },
})

export default ChoseGiftModal
