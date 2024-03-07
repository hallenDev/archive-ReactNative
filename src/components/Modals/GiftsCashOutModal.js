import React from 'react'
import { Image, Modal, View, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'

const GiftsCashoutModal = ({
  modalVisible = false,
  setModalVisible,
  gifts,
}) => {
  const requestCloseHandler = () => setModalVisible(false)

  const showCashOutPage = () => {}
  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={requestCloseHandler}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>My Gifts</Text>
          <ScrollView horizontal style={styles.giftList}>
            {gifts.map((item, i) => (
              <Image
                key={i}
                source={{ uri: item.urls[40] }}
                style={styles.gift}
              />
            ))}
          </ScrollView>

          <View style={styles.giftContainerLine} />

          <View style={styles.footer}>
            <PressableHighlight
              backgroundColor={colors.primaryShade}
              style={styles.approve}
              onPress={showCashOutPage}
            >
              <Text style={styles.approveText}>Cash out</Text>
            </PressableHighlight>
            <PressableHighlight
              style={styles.decline}
              onPress={requestCloseHandler}
            >
              <Text style={styles.declineText}>Cancel</Text>
            </PressableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
    paddingHorizontal: 20,
  },
  modalView: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.bgViolet,

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
    ...typography.h3,
    color: colors.textSub,
  },
  giftList: {
    backgroundColor: 'rgba(0,0,0,.25)',
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginVertical: 15,
  },
  gift: {
    width: 35,
    height: 35,
    paddingHorizontal: 2,
  },
  giftContainerLine: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  footer: {
    flexDirection: 'row',
  },
  approve: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexGrow: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    marginTop: 20,
    marginRight: 10,
  },
  approveText: {
    ...typography.p2,
    color: colors.white,
    marginRight: 12,
  },
  decline: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    flexGrow: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    marginTop: 20,
  },
  declineText: {
    ...typography.p2,
    color: colors.semiGray,

    marginRight: 12,
  },
})

export default GiftsCashoutModal
