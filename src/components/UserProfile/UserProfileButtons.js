import React, { useState, useCallback, memo } from 'react'
import { Modal, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '~/context/UserContext'
import useFriend from '~/hooks/useFriend'
import ButtonGradient from '~/ui/ButtonGradient'
import { Chat, Check, UserAdd } from '~/ui/icons'
import QuestionPopup from '../../ui/QuestionPopup'
import useSpendCredits from '../../hooks/useSpendCredits'
import useUserBalance from '../../hooks/useUserBalance'
import noop from '../../utils/noop'
import { useMutation, useQueryClient } from 'react-query'
import { sendMessage } from '../../shared/api'
import ErrorMessageType from '../../shared/types/ErrorMessageType'
import { showNotificationError } from '../../services/in-app-notifications'
import { userProfileButtonsStyles as styles } from '~/styles'
import { label } from '~/ui/theme'

const POPUP_TEXT_LOCKED = 'Start chat for 9 credits?'
const POPUP_TEXT_UNLOCKED = 'Start chat?'
const BUTTON_TEXT = 'OK'
const UNLOCK_THREAD_PRODUCT = 'unlock_thread'

export const REMINDER_MESSAGE =
  'Reminder: Matches are more responsive when messages are kind, fun and respectful'

const UserProfileButtons = ({
  duid,
  isFriend,
  friendStatus,
  threadUnlocked,
  onThreadUnlocked = noop,
}) => {
  const onSpendCredits = useSpendCredits()
  const queryClient = useQueryClient()
  const { data: creditBalance } = useUserBalance()
  const credits = creditBalance?.credits?.toLocaleString()
  const [modalVisible, setModalVisible] = useState(false)
  const { mutate: onFriendChange } = useFriend()
  const navigation = useNavigation()
  const {
    user: { canPurchaseCredits },
  } = useUser()

  const handleGoToChat = () => {
    navigation.navigate('Chat', {
      otherUserId: duid,
    })
  }

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: data => {
      queryClient.invalidateQueries('msgInbox')
      handleGoToChat()
    },
    onError: (_error, _data, context) => {
      let error = _error?.data?.errors[0] || ErrorMessageType.ERROR_MESSAGE_SEND

      showNotificationError({ message: error })

      queryClient.setQueryData(['msgThread', duid], context.previousData)
    },
  })

  const handleGoToChatWithMessage = () => {
    const msgId = `${duid}-${Date.now().toString()}`

    const params = {
      msgId,
      otherUserId: duid,
      message: REMINDER_MESSAGE,
    }

    sendMessageMutation.mutate(params)
  }

  const approvePay = () => {
    if (threadUnlocked) {
      handleGoToChat()
      return
    }

    onSpendCredits(duid, UNLOCK_THREAD_PRODUCT, () => {
      onThreadUnlocked()

      handleGoToChatWithMessage()
    })
  }

  const onToggleQuestionModal = useCallback(() => {
    setModalVisible(s => !s)
  }, [])

  const onStartChat = () => {
    !canPurchaseCredits || (canPurchaseCredits && threadUnlocked)
      ? handleGoToChat()
      : onToggleQuestionModal()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <ButtonGradient
            title={threadUnlocked ? 'Chat for FREE' : 'Chat'}
            animation={threadUnlocked}
            className={styles.firstBtn}
            IconLeft={Chat}
            wrapperStyle={styles.wrapper}
            onAction={onStartChat}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonGradient
            title={
              isFriend
                ? 'Friends'
                : friendStatus === 'REQUEST'
                ? 'Pending...'
                : label.REQUEST_TO_FRIEND
            }
            IconLeft={isFriend ? Check : UserAdd}
            onAction={() => onFriendChange(duid, !isFriend)}
            isDisabled={friendStatus === 'REQUEST'}
            isTransparent={isFriend || friendStatus === 'REQUEST'}
            className={styles.secondBtn}
            wrapperStyle={styles.wrapper}
          />
        </View>
      </View>

      {modalVisible && (
        <Modal animationType="none" transparent visible={modalVisible}>
          <QuestionPopup
            questionText={
              threadUnlocked ? POPUP_TEXT_UNLOCKED : POPUP_TEXT_LOCKED
            }
            buttonText={BUTTON_TEXT}
            credits={credits}
            isShowCredits
            onContinue={approvePay}
            onClose={() => setModalVisible(false)}
          />
        </Modal>
      )}
    </>
  )
}

export default memo(UserProfileButtons)
