import React from 'react'
import { StyleSheet, View, Text, Modal } from 'react-native'

import PressableHighlight from '~/ui/PressableHighlight'
import CoinLabel from '~/ui/buttons/CoinLabel'
import { colors, typography } from '~/ui/theme'
import QuestionPopup from '~/ui/QuestionPopup'

export default function LikedMeLocked({ onPress = () => {} }) {
  const [visible, setVisible] = React.useState(false)

  const showModal = b => {
    setVisible(b)
  }

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.content}>
          <Text style={styles.title}>Unlock to view all</Text>
          <PressableHighlight
            style={styles.approve}
            onPress={() => showModal(true)}
            backgroundColor={colors.primaryShade}
          >
            <Text style={styles.approveText}>OK</Text>
            <CoinLabel credits={14} />
          </PressableHighlight>
        </View>
      </View>

      <Modal animationType="none" transparent visible={visible}>
        <QuestionPopup
          questionText="Unlock to view all for 14 credits?"
          buttonText="OK"
          onContinue={onPress}
          onClose={() => showModal(false)}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 70, // Clicked tabs
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: colors.bgBlack,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...typography.p2,
    color: colors.primary,

    marginTop: 8,
  },
  approve: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 280,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    marginTop: 20,
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,

    marginRight: 12,
  },
})
