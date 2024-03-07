import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useQueryClient } from 'react-query'
import { useUser } from '~/context/UserContext'
import useMediaAdd from '~/hooks/useMediaAdd'
import fileValidation from '~/utils/fileValidation'
import ActionSheetUpload from '~/components/ActionSheets/ActionSheetUpload'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import ActionSheetRaw from '~/ui/actionsSheet/ActionSheetRaw'
import {
  showNotificationSuccess,
  showNotificationError,
} from '~/services/in-app-notifications'

const AddMediaModal = ({
  addMediaModalVisible = false,
  withApproveModal = false,
  onHideAttachMediaModal = () => null,
  handleUploadMedia = () => null,
}) => {
  const [file, setFile] = useState()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [isUploadFilePopupClose, setUploadFilePopup] = useState(true)

  const uploadFilePopupRef = useRef(null)

  const queryClient = useQueryClient()

  const {
    user: { duid },
  } = useUser()

  const upload = useMediaAdd({
    onUploadStart: () => onUploadMedia(true),
    onUploadEnd: () => {
      onUploadMedia(false)
      onCloseApproveModal()
      setFile(null)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', duid])
      queryClient.invalidateQueries(['profileTrending', parseInt(duid)])

      showNotificationSuccess({ message: 'Upload successful.' })
    },
    onError: description => {
      showUploadMediaError(description)
    },
  })

  const onUploadMedia = params => {
    setIsUploadLoading(params)
    handleUploadMedia(params)
  }

  const onShowAttachMediaHandler = useCallback(() => {
    uploadFilePopupRef.current.show()
    setUploadFilePopup(true)
  }, [])

  const onHideAttachMediaHandler = () => {
    uploadFilePopupRef.current?.hide()
  }

  const onCloseApproveModal = useCallback(() => {
    setIsOpenModal(false)
    setFile(null)
  }, [])

  const onOpenApproveModal = () => {
    onHideAttachMediaModal()

    if (withApproveModal) {
      setUploadFilePopup(false)
    }
  }

  const onAddMedia = inputFile => {
    if (withApproveModal) {
      setFile(inputFile)
    } else {
      upload(inputFile)
    }
  }

  const showUploadMediaError = errorMsg => {
    showNotificationError({ message: errorMsg })
  }

  const onApproveSubmit = useCallback(() => {
    upload(file)
  }, [file, upload])

  const onSubmit = input => {
    onHideAttachMediaHandler()

    const mediaFile = input[0] || input

    fileValidation(mediaFile, onAddMedia, showUploadMediaError)
  }

  useEffect(() => {
    addMediaModalVisible && onShowAttachMediaHandler()
  }, [addMediaModalVisible, onShowAttachMediaHandler])

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setFile(null)
      }
    }, []),
  )

  useEffect(() => {
    let timeoutId
    if (!isUploadFilePopupClose && file) {
      if (Platform.OS === 'android') {
        setIsOpenModal(true)
      } else {
        timeoutId = setTimeout(() => {
          setIsOpenModal(true)
        }, 500)
      }
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [file, isUploadFilePopupClose])

  return (
    <>
      <ActionSheetRaw ref={uploadFilePopupRef} onClose={onOpenApproveModal}>
        <ActionSheetUpload
          onClose={onHideAttachMediaHandler}
          onChange={onSubmit}
        />
      </ActionSheetRaw>

      {isOpenModal && (
        <ConfirmModal
          modalVisible={isOpenModal}
          onCancel={onCloseApproveModal}
          onApprove={onApproveSubmit}
          description="Add this media?"
          approveLoading={isUploadLoading}
        />
      )}
    </>
  )
}

export default AddMediaModal
