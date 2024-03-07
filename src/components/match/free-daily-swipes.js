import React, { useState } from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'

import useSpendCredits from '~/hooks/useSpendCredits'
import useProfile from '~/hooks/useProfile'
import { Button } from '~/ui'
import { colors, typography } from '~/ui/theme'
import { Coin } from '~/ui/icons'
import noop from '~/utils/noop'
import QuestionPopup from '~/ui/QuestionPopup'

export default function FreeDailySwipes({ onSuccess = noop }) {
  const { data } = useProfile()

  const { duid, gender } = data || {}
  const [visible, setVisible] = useState(false)

  const count = gender === 'WOMAN' ? 500 : 200

  const onSpendCredits = useSpendCredits()

  const handlePay = () => {
    onSpendCredits(duid, 'extra_100_swipes', onSuccess)
  }

  const showModal = b => {
    setVisible(b)
  }

  return (
    <>
      <View style={styles.freeDailyContainer}>
        <Text style={styles.freeDailyHeader}>
          You ran out of your {count}
          {'\n'}free daily swipes
        </Text>
        <Text style={styles.freeDailyDesc}>Keep going, get more!</Text>
        <Button
          type="primary"
          onPress={() => showModal(true)}
          style={styles.btn}
        >
          <Text style={styles.freeDailyBtnText}>Purchase 100 swipes</Text>
          <View style={styles.priceContainer}>
            <Coin width="16" height="16" style={styles.icon} />
            <Text style={styles.price}>20</Text>
          </View>
        </Button>
      </View>

      <Modal animationType="none" transparent visible={visible}>
        <QuestionPopup
          questionText="Purchase 100 more swipes for 20 credits?"
          buttonText="OK"
          onContinue={handlePay}
          onClose={() => showModal(false)}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  freeDailyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeDailyHeader: {
    ...typography.h3,
    color: colors.textMain,

    textAlign: 'center',
  },
  freeDailyDesc: {
    ...typography.p2,
    color: colors.textMain,

    textAlign: 'center',
    marginVertical: 10,
  },
  freeDailyBtnText: {
    color: colors.textMain,
  },
  priceContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    justifyContent: 'space-between',
    marginLeft: 10,
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 20,
  },
  icon: {
    color: colors.primary,
    marginRight: 5,
  },
  price: {
    ...typography.p3,
    color: colors.primary,
  },
})
