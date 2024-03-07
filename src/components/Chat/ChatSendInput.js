import React, { useCallback, useState } from 'react'
import { View, TextInput } from 'react-native'
import { useQueryClient, useMutation } from 'react-query'
import { sendMessage, sendRequestPrivateRoom } from '~/shared/api/members'
import { SITEMASTER_DUID, START_PRIVATE_VIDEO_CHAT } from '~/configs/constants'
import noop from '~/utils/noop'
import VideoChatNotFriendModal from '../Modals/VideoChatNotFriendModal'
import GetApproveVideoCallModal from '../Modals/GetApproveVideoCallModal'
import { colors } from '~/ui/theme'
import { chatSendInputStyles as styles } from '~/styles'
import useCheckEnoughCredits from '~/hooks/useCheckEnoughCredits'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AddAttachmentBtn from './AddAttachmentBtn'
import { showNotificationError } from '~/services/in-app-notifications'
import VideoChatBtn from './VideoChatBtn'
import { encode } from 'html-entities'
import { ChatSendBtn } from '~/components'
import ChatbotDuids from '../../shared/types/ChatbotDuids'

const ChatSendInput = ({
  navigation,
  otherUserId = '',
  onContentSizeChange = noop,
}) => {
  const isFocused = useIsFocused()
  const onCheckEnoughCredits = useCheckEnoughCredits()
  const [isNotFriendModal, setIsNotFriendModal] = useState(false)
  const [isQuestionModal, setIsQuestionModal] = useState(false)
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()
  const { mutate } = useMutation(sendMessage, {
    onSuccess: data => {
      queryClient.invalidateQueries('msgInbox')

      queryClient.setQueryData(['msgThread', otherUserId], old => {
        if (data?.credits_claimed) {
          old.claimed = true
        }

        return {
          ...old,
          thread: old.thread.map(msg =>
            msg.msgId === data.msg_id_tmp
              ? { ...data.message, my_unread: '1' }
              : msg,
          ),
        }
      })
    },
    onMutate: async message => {
      await queryClient.cancelQueries(['msgThread', otherUserId])

      const previousData = queryClient.getQueryData(['msgThread', otherUserId])

      queryClient.setQueryData(['msgThread', otherUserId], old => {
        return {
          ...old,
          thread: [
            ...old.thread,
            {
              ...{ ...message, message: encode(message.message) },
              mtime: new Date().toISOString(),
              tag: [],
              msg_id: message.msgId,
              direction: 'sender',
              my_unread: '1',
            },
          ],
        }
      })

      return { previousData }
    },
    onError: error => {
      if (error?.data?.errors?.[0] === 'message too long') {
        showNotificationError({
          message: 'The message needs to be less than 1000 in length',
        })
      }
    },
  })

  const isAllowPrivateVCRef = useRef(false)

  const handleSendMessage = input => {
    if (!message.trim()) return

    const msgId = `${otherUserId}-` + Date.now().toString()

    const params = {
      msgId,
      otherUserId,
      message: message.trim(),
    }

    mutate(params)

    setMessage('')
  }

  const handleShowIsNotFriendModal = useCallback(() => {
    setIsNotFriendModal(!isNotFriendModal)
  }, [isNotFriendModal])

  const onShowQuestionModal = () => {
    setIsQuestionModal(true)
  }

  const goPrivateVideoChat = () => {
    const data = queryClient.getQueryData(['msgThread', otherUserId])

    if (data) {
      isAllowPrivateVCRef.current = data?.allow_private_vc
    }

    if (isAllowPrivateVCRef.current) {
      onShowQuestionModal()
    } else {
      handleShowIsNotFriendModal()
    }
  }

  const routeToVideoChat = async () => {
    if (onCheckEnoughCredits(START_PRIVATE_VIDEO_CHAT)) {
      const response = await sendRequestPrivateRoom({ otherDuid: otherUserId })
      if (response?.online) {
        navigation.navigate('VideoChatScreen', { duid: otherUserId })
      } else {
        setIsNotFriendModal(true)
      }
    } else {
      navigation.navigate('Payment')
    }
  }

  useEffect(() => {
    if (!isFocused) {
      setMessage('')
    }
  }, [isFocused])

  if (otherUserId === SITEMASTER_DUID) return null

  const isChatbot = ChatbotDuids.find(
    duid => duid === parseInt(otherUserId, 10),
  )

  return (
    <>
      <View style={styles.container}>
        {!isChatbot && (
          <>
            <AddAttachmentBtn otherUserId={otherUserId} />
            <VideoChatBtn action={goPrivateVideoChat} />
          </>
        )}
        <TextInput
          autoGrow
          multiline
          maxHeight={100}
          style={styles.input}
          placeholder="Type your message here..."
          placeholderTextColor={colors.textSub}
          onContentSizeChange={onContentSizeChange}
          value={message}
          onChangeText={text => setMessage(text)}
          enableScrollToCaret
          autoFocus={false}
          selectionColor={colors.cursorColor}
        />
        <ChatSendBtn onPress={handleSendMessage} />
      </View>

      <VideoChatNotFriendModal
        modalVisible={isNotFriendModal}
        setModalVisible={setIsNotFriendModal}
      />

      <GetApproveVideoCallModal
        modalVisible={isQuestionModal}
        setModalVisible={setIsQuestionModal}
        onApprove={routeToVideoChat}
      />
    </>
  )
}

export default ChatSendInput
