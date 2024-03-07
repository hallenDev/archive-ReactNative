import React, { useState } from 'react'
import { StyleSheet, Text, Pressable, Modal, View } from 'react-native'
import useUserBalance from '~/hooks/useUserBalance'
import { MediaAttachmentType } from '~/shared/types/MediaAttachmentType'
import { RECORD_AUDIO_AVAILABLE } from '~/configs/constants'
import { LinearGradient } from '~/ui'
import CoinLabel from '~/ui/buttons/CoinLabel'
import PressableHighlight from '~/ui/PressableHighlight'
import { Attention, Coin } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const GetApproveSendAttachmentModal = ({
  modalVisible = false,
  requestCloseHandler,
  onToggleAttachmentType,
  handlerAttachment,
}) => {
  const [isConfirmModal, setConfirmModal] = useState(false)

  const { data: creditBalance } = useUserBalance()

  const onShowConfirmModal = () => {
    setConfirmModal(true)
  }

  const onSetAttachmentType = type => {
    onToggleAttachmentType(type)
    onShowConfirmModal()
  }

  return (
    <>
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
              {isConfirmModal ? (
                <>
                  <Attention
                    style={styles.warningIcon}
                    width={30}
                    height={30}
                  />
                  <Text style={styles.question}>
                    Send an attachment for 12 credits?
                  </Text>

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

                  <View style={styles.buttons}>
                    <PressableHighlight
                      style={[styles.approve && styles.confirmApprove]}
                      onPress={handlerAttachment}
                      backgroundColor={colors.primaryShade}
                    >
                      <Text
                        style={[styles.approveText && styles.confirmBtnText]}
                      >
                        Ok
                      </Text>
                    </PressableHighlight>
                    <PressableHighlight
                      style={[styles.decline && styles.confirmDecline]}
                      onPress={requestCloseHandler}
                    >
                      <Text
                        style={[styles.declineText && styles.confirmBtnText]}
                      >
                        Cancel
                      </Text>
                    </PressableHighlight>
                  </View>
                </>
              ) : (
                <>
                  <Attention width="24" heigth="24" color={colors.primary} />
                  <Text style={styles.title}>
                    Do you want to send media to this user?
                  </Text>
                  <PressableHighlight
                    style={styles.approve}
                    onPress={() =>
                      onSetAttachmentType(MediaAttachmentType.MEDIA)
                    }
                    backgroundColor={colors.primaryShade}
                  >
                    <Text style={styles.approveText}>Attach media</Text>
                    <CoinLabel credits="12" />
                  </PressableHighlight>
                  {RECORD_AUDIO_AVAILABLE && (
                    <PressableHighlight
                      style={styles.approve}
                      onPress={() =>
                        onSetAttachmentType(MediaAttachmentType.AUDIO)
                      }
                      backgroundColor={colors.primaryShade}
                    >
                      <Text style={styles.approveText}>Record audio</Text>
                      <CoinLabel credits="12" />
                    </PressableHighlight>
                  )}
                  <PressableHighlight
                    style={styles.decline}
                    onPress={requestCloseHandler}
                  >
                    <Text style={styles.declineText}>Cancel</Text>
                  </PressableHighlight>
                </>
              )}
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
    ...typography.p2,
    color: colors.primary,

    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
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
  decline: {
    borderRadius: 10,
    width: 280,
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

  confirmApprove: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmDecline: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },

  confirmBtnText: {
    ...typography.p2,
    color: colors.textMain,
  },

  warningIcon: {
    color: colors.primary,
    alignSelf: 'center',
  },
  question: {
    ...typography.p1,
    color: colors.primary,
    textAlign: 'center',
  },
  actionsWrap: {
    marginTop: 8,
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

export default GetApproveSendAttachmentModal
