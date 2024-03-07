import React, { useState, useCallback } from 'react'
import { Text, Pressable, Modal } from 'react-native'
import SelectedDuidContextProvider from '~/context/selected-duid-context'
import GetApproveBlockUserModal from '~/components/Modals/GetApproveBlockUserModal'
import ReportModal from '~/components/Modals/ReportModal'
import GetApproveDeleteChatModal from '~/components/Modals/GetApproveDeleteChatModal'
import GetApproveUnfriendUserModal from '~/components/Modals/get-approve-unfriend-user-modal'
import GetApproveUnfavoriteUserModal from '~/components/Modals/get-approve-unfavorite-user-modal'
import PressableHighlight from '~/ui/PressableHighlight'
import { Trash, Flag, CloseCircle, IconUserRemove } from '~/ui/icons/'
import { colors } from '~/ui/theme'
import { userActionModalStyles as styles } from '~/styles'

const MARGIN_TOP = 52
const MARGIN_RIGHT = 20

const UserActionsModal = ({
  duid,
  modalVisible,
  setModalVisible,
  marginTop = MARGIN_TOP,
  marginRight = MARGIN_RIGHT,
  onSuccessAction = () => null,
  withDeleteChat = false,
  withRemoveFriend = false,
  withRemoveFavorite = false,
}) => {
  const [blockUserModalVisible, setBlockUserModalVisible] = useState(false)
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [deleteChatVisible, setDeleteChatVisible] = useState(false)
  const [removeFriendVisible, setRemoveFriendVisible] = useState(false)
  const [removeFavoriteVisible, setRemoveFavoriteVisible] = useState(false)

  const handlerRequestClose = () => setModalVisible(!modalVisible)

  const toggleDeleteChatModal = useCallback(() => {
    setDeleteChatVisible(s => !s)
  }, [])

  const toggleBlockUserModal = useCallback(() => {
    setBlockUserModalVisible(s => !s)
  }, [])

  const toggleReportUserModal = useCallback(() => {
    setReportModalVisible(s => !s)
  }, [])

  const toggleRemoveFriendModal = useCallback(() => {
    setRemoveFriendVisible(s => !s)
  }, [])

  const toggleRemoveFavoriteModal = useCallback(() => {
    setRemoveFavoriteVisible(s => !s)
  }, [])

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={handlerRequestClose}
      >
        <Pressable style={styles.centeredView} onPressIn={handlerRequestClose}>
          <Pressable style={[styles.modalView, { marginTop, marginRight }]}>
            {withDeleteChat && (
              <PressableHighlight
                style={styles.item}
                onPress={() => {
                  toggleDeleteChatModal()
                  handlerRequestClose()
                }}
              >
                <Trash width="20" height="20" color={colors.textSub} />
                <Text style={styles.trashText}>Delete chat</Text>
              </PressableHighlight>
            )}
            {(withRemoveFriend || withRemoveFavorite) && (
              <PressableHighlight
                style={styles.item}
                onPress={() => {
                  withRemoveFriend
                    ? toggleRemoveFriendModal()
                    : toggleRemoveFavoriteModal()
                  handlerRequestClose()
                }}
              >
                <IconUserRemove width="20" height="20" color={colors.textSub} />
                <Text style={styles.trashText}>Remove user</Text>
              </PressableHighlight>
            )}
            <PressableHighlight
              style={styles.item}
              onPress={() => {
                toggleBlockUserModal()
                handlerRequestClose()
              }}
            >
              <CloseCircle width="20" height="20" color={colors.redAlert} />
              <Text style={styles.redText}>Block User</Text>
            </PressableHighlight>
            <PressableHighlight
              style={[styles.item, styles.lastItem]}
              onPress={() => {
                toggleReportUserModal()
                handlerRequestClose()
              }}
            >
              <Flag width="20" height="20" color={colors.redAlert} />
              <Text style={styles.redText}>Report User</Text>
            </PressableHighlight>
          </Pressable>
        </Pressable>
      </Modal>

      <SelectedDuidContextProvider value={duid}>
        {blockUserModalVisible && (
          <GetApproveBlockUserModal
            modalVisible={blockUserModalVisible}
            setModalVisible={setBlockUserModalVisible}
            onSuccessAction={onSuccessAction}
          />
        )}

        {deleteChatVisible && (
          <GetApproveDeleteChatModal
            modalVisible={deleteChatVisible}
            setModalVisible={toggleDeleteChatModal}
            onSuccessAction={onSuccessAction}
          />
        )}

        {reportModalVisible && (
          <ReportModal
            modalVisible={reportModalVisible}
            setModalVisible={toggleReportUserModal}
            onSuccessAction={onSuccessAction}
          />
        )}

        {removeFriendVisible && (
          <GetApproveUnfriendUserModal
            modalVisible={removeFriendVisible}
            setModalVisible={toggleRemoveFriendModal}
          />
        )}

        {removeFavoriteVisible && (
          <GetApproveUnfavoriteUserModal
            modalVisible={removeFavoriteVisible}
            setModalVisible={toggleRemoveFavoriteModal}
          />
        )}
      </SelectedDuidContextProvider>
    </>
  )
}

export default UserActionsModal
