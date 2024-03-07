import React from 'react'
import { StyleSheet, Text, Pressable, Modal } from 'react-native'
import PressableHighlight from '~/ui/PressableHighlight'
import { LinearGradient } from '~/ui'
import { colors, typography } from '~/ui/theme'

const VideoChatNotFriendModal = ({ modalVisible = false, setModalVisible }) => {
  const requestCloseHandler = () => setModalVisible(!modalVisible)
  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={requestCloseHandler}
    >
      <Pressable style={styles.centeredView} onPress={requestCloseHandler}>
        <Pressable>
          <LinearGradient
            style={styles.modalView}
            start={{ x: 0.55, y: 0.5 }}
            end={{ x: 0.0, y: 0.65 }}
            locations={[0, 0.6]}
            colors={colors.bgGradient}
          >
            <Text style={styles.title}>Private Videochat</Text>
            <Text style={styles.description}>
              Video chat requests can only be sent to online users on your
              friends list or members that replied to your messages
            </Text>
            <PressableHighlight
              style={styles.approve}
              onPress={requestCloseHandler}
              backgroundColor={colors.primaryShade}
            >
              <Text style={styles.approveText}>OK</Text>
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
    ...typography.h3,
    color: colors.textMain,
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    ...typography.p2,
    color: colors.textSub,
    maxWidth: '80%',
    marginTop: 16,
    textAlign: 'center',
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
    marginBottom: 30,
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,

    marginRight: 12,
  },
})

export default VideoChatNotFriendModal
