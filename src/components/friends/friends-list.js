import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { fetchFriends } from '~/shared/api/members'
import Placeholder from '~/ui/Placeholder'
import { FriendsType } from './types'
import FriendApproveItem from './friend-approve-item'
import FriendPendingItem from './friend-pending-item'
import FriendRequestItem from './friend-request-item'
import FriendEmptyList from './ui/friend-empty-list'
import SelectedDuidContextProvider from '~/context/selected-duid-context'
import SelectedRidContextProvider from '~/context/selected-rid-context'
import SkeletonListItem from '~/ui/SkeletonListItem'
import { createEmptyArray } from '~/utils/createEmptyArray'

const RENDER_ITEM_COMPONENTS = {
  [FriendsType.APPROVED]: FriendApproveItem,
  [FriendsType.PENDING]: FriendPendingItem,
  [FriendsType.REQUEST]: FriendRequestItem,
}

const SKELETON_LIST = createEmptyArray(10)

const FriendsList = ({ type = FriendsType.APPROVED }) => {
  const {
    data = {},
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['friends', type],
    ({ pageParam: page = 1 }) => fetchFriends({ page, type }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.total_pages > lastPage?.current_page) {
          return parseInt(lastPage?.current_page) + 1
        }

        return undefined
      },
    },
  )

  const list = data?.pages?.reduce((acc, current) => {
    const newResult = current?.friend_results || []
    return [...acc, ...newResult]
  }, [])

  const fetchNextPageAction = () => {
    if (isFetching || isFetchingNextPage) return null
    return fetchNextPage()
  }

  const RenderItemComponent = RENDER_ITEM_COMPONENTS[type]
  const renderItem = ({ item }) => (
    <SelectedDuidContextProvider value={item.duid}>
      <SelectedRidContextProvider value={item.rid}>
        <RenderItemComponent {...item} />
      </SelectedRidContextProvider>
    </SelectedDuidContextProvider>
  )

  if (isLoading) {
    return (
      <FlatList
        data={SKELETON_LIST}
        renderItem={() => <SkeletonListItem isOnlyName />}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.skeletonContainer}
      />
    )
  }

  return (
    <FlatList
      data={list}
      contentContainerStyle={styles.contentContainerStyle}
      onEndReached={fetchNextPageAction}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={
        isFetching ? (
          <Placeholder style={styles.placeholder} />
        ) : (
          <View style={styles.footer} />
        )
      }
      ListEmptyComponent={!isLoading && FriendEmptyList}
      renderItem={renderItem}
      keyExtractor={item => item?.duid}
      indicatorStyle="white"
    />
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    marginLeft: 20 + 40, // space avatar text + avatar size
    marginRight: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  placeholder: {
    paddingBottom: 40,
  },
  footer: {
    height: 20,
  },
  skeletonContainer: {
    marginTop: 8,
  },
})

export default FriendsList
