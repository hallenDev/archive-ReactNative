import React from 'react'
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'

const GetApproveDeleteAccountModal = ({
  modalVisible = false,
  setModalVisible,
  onSuccessAction = () => null,
}) => {
  const handlerRequestClose = () => setModalVisible(!modalVisible)
  const handlerApprove = () => {
    onSuccessAction()
    handlerRequestClose()
  }
  const handlerDecline = () => {
    handlerRequestClose()
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={handlerRequestClose}
    >
      <Pressable style={styles.centeredView} onPress={handlerRequestClose}>
        <Pressable style={styles.modalView}>
          <Text style={styles.title}>
            This account will be deleted if you click continue
          </Text>
          <View style={styles.buttons}>
            <PressableHighlight
              style={styles.approve}
              onPress={handlerApprove}
              backgroundColor={colors.primaryShade}
            >
              <Text style={styles.approveText}>Continue</Text>
            </PressableHighlight>
            <PressableHighlight style={styles.decline} onPress={handlerDecline}>
              <Text style={styles.declineText}>Cancel</Text>
            </PressableHighlight>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  modalView: {
    paddingVertical: 32,
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
    ...typography.h3,
    color: colors.textMain,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  approve: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,
  },
  decline: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },
  declineText: {
    ...typography.p2,
    color: colors.textSub,
  },
})

export default GetApproveDeleteAccountModal
