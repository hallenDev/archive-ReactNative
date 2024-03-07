import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import LikedListItem from './LikedListItem'
import { fetchContentLikes } from '~/shared/api/members'
import Placeholder from '~/ui/Placeholder'
import { colors, typography } from '~/ui/theme'
import SkeletonListItem from '~/ui/SkeletonListItem'
import { createEmptyArray } from '~/utils/createEmptyArray'

const SKELETON_LIST = createEmptyArray(10)

const LikedList = ({ postId }) => {
  const {
    data = {},
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['LikesList', postId],
    ({ pageParam: page = 1 }) =>
      fetchContentLikes(postId, {
        page,
        limit: 32,
      }),
    {
      refetchOnMount: false,
      getNextPageParam: (lastPage, pages) => {
        if (!!(lastPage?.likes ?? []).length) {
          return pages.length + 1
        }

        return undefined
      },
    },
  )
  const likes = data?.pages?.reduce((acc, current) => {
    const newResult = current?.likes || []
    return [...acc, ...newResult.filter(item => item?.userProfile?.duid)]
  }, [])

  const fetchNextPageAction = () => {
    if (isFetching || isFetchingNextPage) {
      return null
    }

    return fetchNextPage()
  }

  if (likes?.length === 0) {
    return <Text style={styles.emptyUsers}>There are no likes yet</Text>
  }

  const renderItem = ({ item }) => (
    <LikedListItem
      duid={item?.userProfile?.duid}
      pic={item?.userProfile?.pic}
      online={item?.userProfile?.online}
      name={item?.userProfile?.username}
    />
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
      data={likes}
      contentContainerStyle={styles.contentContainerStyle}
      onEndReached={fetchNextPageAction}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={renderItem}
      keyExtractor={item => item?.like_duid}
      indicatorStyle="white"
      ListFooterComponent={
        isFetching ? (
          <Placeholder style={styles.placeholder} />
        ) : (
          <View style={styles.footer} />
        )
      }
    />
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    marginLeft: 12 + 40, // space avatar text + avatar size
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  emptyUsers: {
    ...typography.h4,
    color: colors.textSub,
    marginTop: 150,
    textAlign: 'center',
  },
  placeholder: {
    paddingBottom: 80,
  },
  footer: {
    height: 80,
  },
  skeletonContainer: {
    marginTop: 20,
    marginBottom: 50,
    paddingRight: 20,
  },
})

export default LikedList
