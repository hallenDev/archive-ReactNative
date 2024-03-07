import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { fetchFavorites } from '~/shared/api/members'
import { FriendsType } from './types'
import FriendEmptyList from './ui/friend-empty-list'
import FavoritesListItem from './favorites-list-item'
import SkeletonListItem from '~/ui/SkeletonListItem'
import { createEmptyArray } from '~/utils/createEmptyArray'

const SKELETON_LIST = createEmptyArray(10)

const renderItem = ({ item }) => <FavoritesListItem {...item} />

const FavoritesList = ({ type = FriendsType.APPROVED }) => {
  const {
    data = {},
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['favorites', type],
    ({ pageParam: page = 1 }) => fetchFavorites({ page, type }),
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
    const newResult = current?.favorite_profiles || []

    return [...acc, ...newResult]
  }, [])

  const fetchNextPageAction = () => {
    if (isFetching || isFetchingNextPage) return null
    return fetchNextPage()
  }

  if (isLoading) {
    return (
      <FlatList
        data={SKELETON_LIST}
        renderItem={() => <SkeletonListItem isOnlyName />}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainerStyle}
      />
    )
  }

  return (
    <FlatList
      data={list}
      contentContainerStyle={styles.contentContainerStyle}
      onEndReached={fetchNextPageAction}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={<View style={styles.footer} />}
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
  footer: {
    height: 20,
  },
})

export default FavoritesList
