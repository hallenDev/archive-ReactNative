import React from 'react'
import { StyleSheet, Text, Pressable, Modal, View } from 'react-native'
import useUserBalance from '~/hooks/useUserBalance'
import { LinearGradient } from '~/ui'
import CoinLabel from '~/ui/buttons/CoinLabel'
import { Coin } from '~/ui/icons'
import SvgAttention from '~/ui/icons/Attention'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'

const GetApproveVideoCallModal = ({
  modalVisible = false,
  setModalVisible,
  onApprove,
}) => {
  const { data: creditBalance } = useUserBalance()
  const handlerRequestClose = () => setModalVisible(!modalVisible)

  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={handlerRequestClose}
    >
      <Pressable style={styles.centeredView} onPress={handlerRequestClose}>
        <Pressable>
          <LinearGradient
            style={styles.modalView}
            start={{ x: 0.55, y: 0.5 }}
            end={{ x: 0.0, y: 0.65 }}
            locations={[0, 0.6]}
            colors={colors.bgGradient}
          >
            <SvgAttention width="24" heigth="24" color={colors.primary} />
            <Text style={styles.title}>Start video chat for 29 credits?</Text>

            <View style={styles.creditContainer}>
              <Text style={styles.creditTxt}>Credit Balance: </Text>
              <Coin
                width={12}
                height={12}
                color={colors.semiGray}
                style={styles.coin}
              />
              <Text style={styles.creditTxt}>
                {creditBalance?.credits?.toLocaleString()}
              </Text>
            </View>

            <PressableHighlight
              style={styles.approve}
              onPress={() => {
                handlerRequestClose()
                onApprove()
              }}
            >
              <Text style={styles.approveText}>OK</Text>
            </PressableHighlight>
            <PressableHighlight
              style={styles.decline}
              onPress={handlerRequestClose}
            >
              <Text style={styles.declineText}>Cancel</Text>
            </PressableHighlight>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiBlack50,
    zIndex: 10,
  },
  modalView: {
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
    marginTop: 10,
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,

    marginRight: 12,
  },
  decline: {
    borderRadius: 10,
    width: 280,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    marginTop: 10,
  },
  declineText: {
    ...typography.p2,
    color: colors.semiGray,

    marginRight: 12,
  },
  creditContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditTxt: {
    ...typography.p3,
    color: colors.semiGray,
  },
  coin: {
    marginRight: 5,
  },
})

export default GetApproveVideoCallModal
