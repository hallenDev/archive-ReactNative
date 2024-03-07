import React from 'react'
import useFavorite from '~/hooks/useFavorite'
import { useSelectedDuidContext } from '~/context/selected-duid-context'
import ConfirmModal from '~/components/Modals/ConfirmModal'

const GetApproveUnfavoriteUserModal = ({
  modalVisible = false,
  setModalVisible,
  onSuccessAction = () => null,
}) => {
  const duid = useSelectedDuidContext()

  const handlerRequestClose = () => {
    setModalVisible()
  }

  const { mutate, isLoading } = useFavorite({ onSettled: handlerRequestClose })

  const handlerApprove = () => {
    mutate(duid, false)
    onSuccessAction() // Optimistic success callback
  }

  return (
    <ConfirmModal
      modalVisible={modalVisible}
      onCancel={handlerRequestClose}
      onApprove={handlerApprove}
      description="Remove this user from your favorites?"
      approveLoading={isLoading}
    />
  )
}

export default GetApproveUnfavoriteUserModal
