import { MasonryFlashList } from '@shopify/flash-list'
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { RefreshControl, StyleSheet, View } from 'react-native'
import { useInfiniteQuery, useQueryClient } from 'react-query'

import { fetchTrending } from '~/shared/api/members'
import Post from '~/components/Post/Post'
import FilterModal from '~/components/Trending/FilterModal'
import TrendingListHeader from './TrendingListHeader'
import EmptyTrending from './EmptyTrending'
import { Placeholder } from '~/ui'
import { MIN_VIDEO_FOR_AUTOPLAY_ENABLE } from '~/configs/constants'
import TrendingListSkeleton from './TrendingListSkeleton'
import useProfile from '../../hooks/useProfile'
import { colors } from '~/ui/theme'

let nextPage = 1

const TrendingList = () => {
  const [trendingParams, setTrendingParams] = useState()
  const [menuModalVisible, setMenuModalVisible] = useState(false)
  const flatListRef = useRef()
  const { data: myProfile } = useProfile()
  const queryClient = useQueryClient()

  useEffect(() => {
    nextPage = 1
    queryClient.removeQueries('trending')
  }, [trendingParams, queryClient])

  const {
    data = {},
    isLoading,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['trending', trendingParams],
    ({ pageParam: last_content_id = 0 }) =>
      fetchTrending({ last_content_id, page: nextPage, ...trendingParams }),
    {
      refetchOnMount: false,
      getNextPageParam: lastPage => {
        if (!!(lastPage?.content ?? []).length) {
          return lastPage?.content?.[lastPage?.content?.length - 1]?.contentId
        }

        return undefined
      },
    },
  )

  useEffect(() => {
    if (trendingParams?.filter_type === 'near_me') {
      setTimeout(() => {
        nextPage = 1
        queryClient.setQueriesData('trending', previousData => ({}))
        refetch()
      }, 500)
    }
  }, [
    myProfile?.country,
    myProfile?.state,
    myProfile?.city,
    trendingParams?.filter_type,
    queryClient,
    refetch,
  ])

  if (data?.pages?.length > 0) {
    data.pages.forEach(page => {
      page?.content?.forEach(c => {
        if (!c.aspectRatio) {
          c.aspectRatio = (Math.floor(Math.random() * 13) + 8) / 10
        }
      })
    })
  }

  const results =
    data?.pages?.reduce((acc, current) => {
      const newResult = current?.content || []

      return [...acc, ...newResult]
    }, []) || []

  const toggleModal = useCallback(() => {
    setMenuModalVisible(s => !s)
  }, [])

  const changeTrendingParams = useCallback(filter_type => {
    flatListRef.current?.scrollToIndex({ index: 0 })
    setTrendingParams({ filter_type })
  }, [])

  const handleOnResetFilterType = useCallback(filter_type => {
    setTrendingParams({ filter_type: 'popular_all' })
  }, [])

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      nextPage++

      if (data?.pages) {
        const skipPage = data.pages[data.pages.length - 1]?.next_page
        if (skipPage > nextPage) {
          nextPage = skipPage
        }
      }
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, data])

  useEffect(() => {
    if (results?.length <= 10) {
      handleEndReached()
    }
  }, [results?.length, handleEndReached])

  if (!results?.length && !isLoading && !isRefetching) {
    return (
      <View style={styles.empty}>
        <EmptyTrending onResetFilterType={handleOnResetFilterType} />
      </View>
    )
  }

  const videoItemCount = results?.reduce((acc, current) => {
    return current.type === 'VIDEO' ? acc + 1 : acc
  }, 0)

  function renderItem({ item }) {
    return (
      <Post
        post={item}
        hideLikersBtn
        isSmall
        isTrending
        isAutoplayVideoEnable={videoItemCount <= MIN_VIDEO_FOR_AUTOPLAY_ENABLE}
        aspectRatio={item.aspectRatio}
      />
    )
  }

  return (
    <>
      <TrendingListHeader
        onChange={changeTrendingParams}
        filter={trendingParams?.filter_type}
      />

      <MasonryFlashList
        ref={flatListRef}
        indicatorStyle="white"
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={item => item?.contentId}
        data={results}
        numColumns={2}
        estimatedItemSize={200}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={5}
        ListFooterComponent={isFetching && <Placeholder large />}
        removeClippedSubviews={true}
        ListEmptyComponent={<TrendingListSkeleton />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && nextPage === 1}
            onRefresh={() => {
              nextPage = 1
              queryClient.setQueriesData('trending', previousData => ({}))
              refetch()
            }}
            tintColor={colors.textMain}
          />
        }
      />

      <FilterModal
        modalVisible={menuModalVisible}
        closeAction={toggleModal}
        changeTrendingParams={changeTrendingParams}
        trendingParams={trendingParams}
      />
    </>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  empty: {
    flex: 1,
    marginHorizontal: 20,
  },
})

export default TrendingList
