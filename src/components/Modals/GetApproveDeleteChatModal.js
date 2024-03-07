import React from 'react'
import { useSelectedThreadIdContext } from '~/context/selected-threadid-context'
import useDeleteMsgThread from '~/hooks/useDeleteMsgThread'
import ConfirmModal from '~/components/Modals/ConfirmModal'

const GetApproveDeleteChatModal = ({
  modalVisible = false,
  setModalVisible,
  onSuccessAction = () => null,
}) => {
  const threadId = useSelectedThreadIdContext()

  const handlerRequestClose = () => {
    setModalVisible()
  }

  const { mutate, isLoading } = useDeleteMsgThread({
    threadId,
    onSettled: handlerRequestClose,
    onSuccess: onSuccessAction,
  })

  const handlerApprove = () => {
    mutate()
  }

  return (
    <>
      {modalVisible && (
        <ConfirmModal
          modalVisible={modalVisible}
          onCancel={handlerRequestClose}
          onApprove={handlerApprove}
          description="Delete this chat?"
          approveLoading={isLoading}
        />
      )}
    </>
  )
}

export default GetApproveDeleteChatModal
