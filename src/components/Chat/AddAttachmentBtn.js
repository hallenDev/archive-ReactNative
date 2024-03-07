import React, { useState, memo, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, Keyboard } from 'react-native'
import { useQueryClient } from 'react-query'
import useMsgAttach from '~/hooks/useMsgAttach'
import useCanPurchaseCredits from '~/hooks/useCanPurchaseCredits'
import useSpendCredits from '~/hooks/useSpendCredits'
import { showNotificationError } from '~/services/in-app-notifications'
import fileValidation from '~/utils/fileValidation'
import { MediaAttachmentType } from '~/shared/types/MediaAttachmentType'
import GetApproveSendAttachmentModal from '~/components/Modals/GetApproveSendAttachmentModal'
import RecordVoiceModal from '~/components/Modals/RecordVoiceModal'
import ActionSheetUpload from '~/components/ActionSheets/ActionSheetUpload'
import ActionSheetRaw from '~/ui/actionsSheet/ActionSheetRaw'
import PressableHighlight from '~/ui/PressableHighlight'
import Clabel from './ui/c-label'
import { PaperClip } from '~/ui/icons'
import { colors } from '~/ui/theme'

const SEND_PRIVATE_ATTACHMENT = 'send_private_attachment'
const TIME_CLOSE_KEYBOARD = 500

const AddAttachmentBtn = ({ otherUserId }) => {
  const [isModalOpen, setIsOpenModal] = useState(false)
  const [attachmentType, setAttachmentType] = useState()
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)
  const [recordModalVisible, setRecordModalVisible] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState(false)

  const uploadFilePopupRef = React.useRef(null)

  const queryClient = useQueryClient()

  const canPurchaseCredits = useCanPurchaseCredits()
  const onSpendCredits = useSpendCredits()

  const upload = useMsgAttach({
    options: {
      otherUserId,
      type: 'image',
    },
    onUploadStart: () => setIsLoadingUpload(true),
    onUploadEnd: () => setIsLoadingUpload(false),
    onSuccess: () => queryClient.invalidateQueries(['msgThread', otherUserId]),
    onError: description => {
      showUploadMediaError(description)
    },
  })

  const onToggleModal = () => {
    if (keyboardStatus) {
      Keyboard.dismiss()
      setTimeout(() => {
        setIsOpenModal(s => !s)
      }, TIME_CLOSE_KEYBOARD)
    } else {
      setIsOpenModal(s => !s)
    }
  }

  const onToggleAttachmentType = type => {
    setAttachmentType(type)
  }

  const handlerAttachment = () => {
    onToggleModal()

    attachmentType === MediaAttachmentType.MEDIA
      ? uploadFilePopupRef.current.show()
      : setRecordModalVisible(true)
  }

  const showUploadMediaError = errorMsg => {
    showNotificationError({ message: errorMsg })
  }

  const onAddMedia = inputFile => {
    onSpendCredits(otherUserId, SEND_PRIVATE_ATTACHMENT, () =>
      upload(inputFile),
    )
  }

  const submitHandler = input => {
    uploadFilePopupRef.current?.hide()

    if (canPurchaseCredits) {
      const mediaFile = input[0] || input

      fileValidation(mediaFile, onAddMedia, showUploadMediaError)
    }
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <>
      <PressableHighlight
        style={styles.container}
        onPress={onToggleModal}
        backgroundColor={colors.semiTransparentWhite15}
        disabled={isLoadingUpload}
      >
        {isLoadingUpload ? <ActivityIndicator /> : <Clabel Icon={PaperClip} />}
      </PressableHighlight>

      {isModalOpen && (
        <GetApproveSendAttachmentModal
          modalVisible={isModalOpen}
          requestCloseHandler={onToggleModal}
          onToggleAttachmentType={onToggleAttachmentType}
          handlerAttachment={handlerAttachment}
        />
      )}

      {recordModalVisible && (
        <RecordVoiceModal
          modalVisible={recordModalVisible}
          otherUserId={otherUserId}
          setModalVisible={setRecordModalVisible}
          setIsLoadingUpload={setIsLoadingUpload}
        />
      )}

      <ActionSheetRaw ref={uploadFilePopupRef}>
        <ActionSheetUpload
          onClose={() => uploadFilePopupRef.current?.hide()}
          onChange={submitHandler}
        />
      </ActionSheetRaw>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    height: 32,
    width: 32,
    borderRadius: 32,
  },
})

export default memo(AddAttachmentBtn)
