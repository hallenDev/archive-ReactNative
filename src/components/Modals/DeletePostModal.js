import React, { memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import useDeleteMediaMutation from '~/hooks/useDeleteMediaMutation'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import { Attention } from '~/ui/icons'

const DeletePostModal = ({ modalVisible, contentId, onCloseModal }) => {
  const navigation = useNavigation()

  const { isLoading, mutate: deleteMediaMutation } = useDeleteMediaMutation({
    onSuccess: () => {
      navigation.goBack()
    },
  })

  const handlerDeleteContent = () => {
    deleteMediaMutation({ contentId })
  }

  return (
    <ConfirmModal
      onApprove={handlerDeleteContent}
      onCancel={onCloseModal}
      modalVisible={modalVisible}
      approveText="OK"
      info={`Are you sure you want to delete the post?`}
      Icon={Attention}
      approveLoading={isLoading}
    />
  )
}

export default memo(DeletePostModal)
