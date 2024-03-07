import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { View, FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { useUser } from '~/context/UserContext'
import { useThreadsUnreadTotal } from '~/context/ThreadsUnreadTotalContext'
import useFirebaseMessage from '~/hooks/useFirebaseMessage'
import { fetchInbox } from '~/shared/api/members'
import InboxItem from './InboxItem'
import InboxEmpty from './InboxEmpty'
import Placeholder from '~/ui/Placeholder'
import { useSubscribeToChannel } from '~/hooks/useSubscribeToChannel'
import SkeletonListItem from '~/ui/SkeletonListItem'
import { createEmptyArray } from '~/utils/createEmptyArray'
import { inboxListStyles as styles } from '~/styles'
import { REMINDER_MESSAGE } from '../UserProfile/UserProfileButtons'

const SKELETON_LIST = createEmptyArray(10)

const Inbox = () => {
  const {
    user: { duid: myDuid },
  } = useUser()

  const {
    isLoading,
    data = {},
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    'msgInbox',
    ({ pageParam: last_msg_id = null }) => fetchInbox({ last_msg_id }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.hasMoreMessages) {
          return lastPage?.threads?.[lastPage?.threads?.length - 1]?.msg_id
        }

        return undefined
      },
    },
  )

  const [unreadTotal, setUnreadTotal] = useThreadsUnreadTotal()

  useIsFocused() // rerender tab for change msg time
  useFirebaseMessage(() => refetch())
  useSubscribeToChannel(refetch)

  const unreadTotalRef = React.useRef(0)

  const threads = React.useMemo(
    () =>
      data?.pages
        ?.reduce((acc, current) => {
          const currentThreads = current?.threads || []

          currentThreads.map(thread => {
            unreadTotalRef.current += parseInt(thread?.unread_total, 10)
          })

          return [...acc, ...currentThreads]
        }, [])
        .filter(
          thread =>
            thread.message !== REMINDER_MESSAGE ||
            parseInt(thread.sender_duid, 10) === parseInt(myDuid, 10),
        ),
    [data?.pages],
  )

  // const threads = data?.pages?.reduce((acc, current) => {
  //   const newResult = current?.threads || []
  //   return [...acc, ...newResult]
  // }, [])

  React.useEffect(() => {
    if (isLoading || isFetching) return
    if (unreadTotal === unreadTotalRef.current) return

    setUnreadTotal(unreadTotalRef.current)
  }, [isLoading, isFetching, unreadTotalRef.current])

  const handleEndReached = () => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (isLoading) {
    return (
      <FlatList
        data={SKELETON_LIST}
        renderItem={() => <SkeletonListItem />}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<View style={styles.headerSeparator} />}
      />
    )
  }

  return (
    <FlatList
      indicatorStyle="white"
      data={threads}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
      onRefresh={refetch}
      refreshing={isLoading}
      renderItem={({ item }) => <InboxItem {...item} />}
      keyExtractor={item => item.duid}
      ListEmptyComponent={!isLoading && <InboxEmpty />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={<View style={styles.headerSeparator} />}
      ListFooterComponent={
        <>
          {isFetching && <Placeholder large />}
          <View style={styles.separatorFooter} />
        </>
      }
    />
  )
}

export default Inbox
