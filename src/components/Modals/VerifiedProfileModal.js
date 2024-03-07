import React from 'react'
import { Modal, Pressable, StyleSheet, Text } from 'react-native'
import PressableHighlight from '~/ui/PressableHighlight'
import LinearGradient from '~/ui/LinearGradient'
import { colors, typography } from '~/ui/theme'
import { VeriIcon } from '~/ui/icons'
import { Button } from '~/ui'
import useProfile from '~/hooks/useProfile'

const VerifiedProfileModal = ({
  modalVisible = false,
  setModalVisible,
  onApprove,
}) => {
  const { data } = useProfile()
  const handlerRequestClose = () => setModalVisible(!modalVisible)

  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={handlerRequestClose}
    >
      <Pressable style={styles.centeredView} onPress={handlerRequestClose}>
        <LinearGradient style={styles.modalView} colors={colors.bgGradient}>
          <VeriIcon width={100} height={100} fill={colors.primary} />
          <Text style={styles.title}>Verified Profile</Text>

          <Text style={styles.description}>
            They have proven to us that they are the person in their photos. We
            reward users who get verified with more views & action
          </Text>

          {data?.isVerified ? (
            <Button
              style={styles.approve}
              type="primary"
              onPress={() => {
                handlerRequestClose()
              }}
            >
              <Text style={styles.approveText}>Close</Text>
            </Button>
          ) : (
            <>
              <Text style={styles.description}>
                Continue to easily verify{'\n'}yourself in minutes.
              </Text>
              <Button
                style={styles.approve}
                type="primary"
                onPress={() => {
                  handlerRequestClose()
                  onApprove()
                }}
              >
                <Text style={styles.approveText}>Continue</Text>
              </Button>
              <PressableHighlight
                style={styles.decline}
                onPress={handlerRequestClose}
              >
                <Text style={styles.declineText}>skip for now</Text>
              </PressableHighlight>
            </>
          )}
        </LinearGradient>
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
    ...typography.h1,
    color: colors.textMain,
    marginTop: 8,
    marginBottom: 20,
  },
  description: {
    ...typography.p1,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 280,
  },
  approve: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 280,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15,
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
    marginTop: 15,
  },
  declineText: {
    ...typography.p2,
    color: colors.semiGray,

    marginRight: 12,
  },
})

export default VerifiedProfileModal
