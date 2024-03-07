import React, { forwardRef } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'
import { useFocusEffect } from '@react-navigation/native'
import useFirebaseMessage from '~/hooks/useFirebaseMessage'
import Chat from '~/components/Chat/Chat'
import EmptyChats from '~/components/Chat/EmptyChats'
import SeparatorChat from '~/components/Chat/SeparatorChat'
import useMarkAsRead from '~/hooks/useMarkAsRead'
import { fetchMsgThread } from '~/shared/api/members'
import Placeholder from '~/ui/Placeholder'
import ChatHeader from '~/ui/header/ChatHeader'
import RateConversation from './RateConversation'
import SelectedThreadIdContextProvider from '~/context/selected-threadid-context'
import { useLoading } from '~/context/LoadingContext'
import { useSubscribeToChannel } from '~/hooks/useSubscribeToChannel'
import MessageType from '~/shared/types/MessageType'
import { REMINDER_MESSAGE } from '../UserProfile/UserProfileButtons'
import isSiteMasterDuid from '~/utils/isSiteMasterDuid'
import { isMessageType } from '../../utils/checkTypeMedia'

const Chats = ({ otherUserId = '', onContentSizeChange, navigation }, ref) => {
  const queryClient = useQueryClient()
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery(['msgThread', otherUserId], () =>
    fetchMsgThread({ otherUserId }),
  )

  useLoading(isLoading)

  const myUnread = data?.thread?.reduce((acc, msg) => {
    return acc + parseInt(msg?.my_unread, 10)
  }, 0)

  const refetchCallback = React.useCallback(() => {
    refetch({ otherUserId })
  }, [otherUserId, refetch])

  const handleIncomingMessage = React.useCallback(
    message => {
      const { msg_type, payload } = message || {}
      if (
        msg_type === MessageType.NEW_MESSAGE &&
        String(message?.notification?.duid) === otherUserId
      ) {
        refetch({ otherUserId })
      } else if (msg_type === MessageType.MESSAGE_VIEWED) {
        const { duid, msg_id } = payload || {}

        if (parseInt(otherUserId, 10) === parseInt(duid, 10) && msg_id) {
          queryClient.setQueryData(['msgThread', String(otherUserId)], old => {
            return {
              ...old,
              thread: old.thread.map(msg =>
                msg.msg_id === msg_id ? { ...msg, my_unread: '0' } : msg,
              ),
            }
          })
        }
      }
    },
    [otherUserId, queryClient, refetch],
  )

  useMarkAsRead({ otherUserId, myUnread })
  useFocusEffect(refetchCallback)
  useFirebaseMessage(() => refetch({ otherUserId }))
  useSubscribeToChannel(handleIncomingMessage)

  React.useLayoutEffect(() => {
    const initialState = {
      duid: data?.user_data?.duid,
      threadId: data?.thread_id,
    }

    if (initialState.duid && initialState.threadId) {
      navigation.setOptions({
        header: () => (
          <SelectedThreadIdContextProvider value={initialState.threadId}>
            <ChatHeader userData={data?.user_data} />
          </SelectedThreadIdContextProvider>
        ),
      })
    }
  }, [data.thread_id, data?.user_data, navigation])

  const { thread = [] } = data

  if (
    thread.length > 0 &&
    thread[0].message === REMINDER_MESSAGE &&
    parseInt(thread[0].duid, 10) === parseInt(otherUserId, 10)
  ) {
    thread.shift()
  }

  const isSiteMaster = isSiteMasterDuid(otherUserId)

  if (thread.length) {
    const firstMsg = thread.find(t => isMessageType(t.tag))
    if (firstMsg) {
      firstMsg.claimable = !isSiteMaster && data?.claimable ? true : false
      firstMsg.claimed = !isSiteMaster && data?.claimed ? true : false
    }
  }

  if (isLoading) return null
  if (!thread.length) {
    return (
      <View style={styles.empty}>
        <EmptyChats username={data?.user_data?.username} />
      </View>
    )
  }

  const reversedThread = [...thread].reverse()

  return (
    <FlatList
      ref={ref}
      inverted
      data={reversedThread}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({ item, index }) => (
        <>
          <Chat otherUserId={otherUserId} {...item} navigation={navigation} />
          <SeparatorChat
            nextItem={reversedThread[index + 1]}
            item={reversedThread[index]}
          />
        </>
      )}
      indicatorStyle="white"
      keyExtractor={item => item?.msg_id}
      onEndReachedThreshold={0.3}
      onEndReached={() => {}}
      onContentSizeChange={onContentSizeChange}
      ListEmptyComponent={<EmptyChats username={data?.user_data?.username} />}
      ListHeaderComponent={
        <>
          <View style={styles.headerSpace} />
          <RateConversation data={data} />
        </>
      }
      ListFooterComponent={isLoading ? <Placeholder /> : null}
      keyboardDismissMode="on-drag"
    />
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  headerSpace: {
    height: 5,
  },
})

export default forwardRef(Chats)
