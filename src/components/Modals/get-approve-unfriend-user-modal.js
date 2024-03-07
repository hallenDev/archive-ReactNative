import React from 'react'
import useFriend from '~/hooks/useFriend'
import { useSelectedDuidContext } from '~/context/selected-duid-context'
import ConfirmModal from '~/components/Modals/ConfirmModal'

const GetApproveUnfriendUserModal = ({
  modalVisible = false,
  setModalVisible,
  onSuccessAction = () => null,
}) => {
  const duid = useSelectedDuidContext()

  const handlerRequestClose = () => {
    setModalVisible()
  }

  const { mutate, isLoading } = useFriend(handlerRequestClose)

  const handlerApprove = () => {
    mutate(duid, false)
    onSuccessAction() // Optimistic success callback
  }

  return (
    <ConfirmModal
      modalVisible={modalVisible}
      onCancel={handlerRequestClose}
      onApprove={handlerApprove}
      description="Remove this user from your friends?"
      approveLoading={isLoading}
    />
  )
}

export default GetApproveUnfriendUserModal
