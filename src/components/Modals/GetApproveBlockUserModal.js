import React from 'react'
import useBlockUser from '~/hooks/useBlockUser'
import { useSelectedDuidContext } from '~/context/selected-duid-context'
import ConfirmModal from '~/components/Modals/ConfirmModal'

const GetApproveBlockUserModal = ({
  modalVisible = false,
  setModalVisible,
  onSuccessAction = () => null,
}) => {
  const blockDuid = useSelectedDuidContext()

  const handlerRequestClose = () => {
    setModalVisible(false)
  }

  const { mutate, isLoading } = useBlockUser({
    blockDuid,
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
          description="Block this user?"
          approveLoading={isLoading}
        />
      )}
    </>
  )
}

export default GetApproveBlockUserModal
