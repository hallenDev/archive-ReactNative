import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useQueryClient, useMutation } from 'react-query'
import { removeBlock } from '~/shared/api/members'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import ButtonGradient from '~/ui/ButtonGradient'
import { colors, typography } from '~/ui/theme'

const UserBlocked = ({ duid }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation('blockRemove', removeBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries('block')
      queryClient.invalidateQueries(['profile', duid])
    },
  })

  const togglePopup = useCallback(() => {
    setIsOpenModal(s => !s)
  }, [])

  const onUnblockUser = useCallback(() => {
    mutate({ blockDuid: duid })
  }, [duid, mutate])

  return (
    <View style={styles.container}>
      <Text style={styles.question}>You have blocked this user</Text>
      <ButtonGradient
        title="Unblock"
        onAction={togglePopup}
        className={styles.btn}
      />
      {isOpenModal && (
        <ConfirmModal
          modalVisible={isOpenModal}
          onCancel={togglePopup}
          onApprove={onUnblockUser}
          description="Confirm?"
          approveLoading={isLoading}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  question: {
    ...typography.p2,
    color: colors.white,
    marginBottom: 10,
  },
  btn: {
    width: 100,
  },
})

export default UserBlocked
