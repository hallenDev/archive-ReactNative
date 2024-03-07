import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { denyFriend } from '~/shared/api'
import { useSelectedDuidContext } from '~/context/selected-duid-context'
import { useSelectedRidContext } from '~/context/selected-rid-context'
import ConfirmModal from '~/components/Modals/ConfirmModal'

const GetApproveCancelRequestModal = ({
  modalVisible = false,
  toggleDeclineModal,
  onSuccessAction = () => null,
  isIncoming = false,
}) => {
  const queryClient = useQueryClient()
  const rid = useSelectedRidContext()
  const duid = useSelectedDuidContext()

  const { mutate, isLoading } = useMutation('denyFriend', denyFriend, {
    onSuccess: () => {
      queryClient.invalidateQueries('friends')
      queryClient.invalidateQueries('counts')
    },
    onSettled: () => {
      toggleDeclineModal()
    },
  })

  const handlerApprove = () => {
    mutate({ rid, fuid: duid })

    onSuccessAction() // Optimistic success callback
  }

  return (
    <ConfirmModal
      modalVisible={modalVisible}
      onCancel={toggleDeclineModal}
      onApprove={handlerApprove}
      description={
        isIncoming
          ? 'Are you sure you want to reject this friend request?'
          : 'Are you sure you want to cancel request?'
      }
      approveLoading={isLoading}
    />
  )
}

export default GetApproveCancelRequestModal
