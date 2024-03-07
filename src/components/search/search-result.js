import React, { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'
import { StyleSheet, View, FlatList } from 'react-native'
import { useSearchFilter } from '~/context/SearchFilterContext'
import { fetchQuickSearch } from '~/shared/api/members'
import ProfileAvatarItem from '~/components/Profiles/ProfileAvatarItem'
import useGetDefaultFilterParams from '~/hooks/useGetDefaultFilterParams'
import Empty from './Empty'
import { Placeholder } from '~/ui'
import SkeletonItem from './SearchSkeleton'
import { createEmptyArray } from '~/utils/createEmptyArray'

const itemsPerPage = 14
const SKELETON_LIST = createEmptyArray(6)

export default function SearchResult() {
  const { searchFilter, changeSearchFilter } = useSearchFilter()
  const getDefaultParams = useGetDefaultFilterParams()

  const {
    data = {},
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['quickSearch', searchFilter],
    ({ pageParam = 1 }) =>
      fetchQuickSearch({ page: pageParam, itemsPerPage, ...searchFilter }),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.pageData?.totalPages > lastPage?.pageData?.currentPage) {
          return lastPage?.pageData?.currentPage + 1
        }

        return undefined
      },
    },
  )

  const handleEndReached = () => {
    if (hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const searchResults = useMemo(() => {
    const result = []
    let pack = []

    if (!data?.pages || Array.isArray(data?.pages[0])) {
      return result
    }

    const items =
      data?.pages?.reduce(
        (acc, current) => [...acc, ...(current?.searchResults || [])],
        [],
      ) || []

    items.forEach(item => {
      if (item.smoker) {
        result.push([item])
      } else {
        pack.push(item)
        if (pack.length === 2) {
          result.push([...pack])
          pack = []
        }
      }
    })

    if (pack.length > 0) {
      result.push([...pack])
      pack = []
    }

    return result
  }, [data?.pages])

  const ListFooterComponent = () => {
    return (
      <>
        {isFetching && <Placeholder />}
        <View style={styles.footerSeparator} />
      </>
    )
  }

  const keyExtractor = item => {
    if (item?.length > 1) {
      return `${item?.[0]?.duid}-${item?.[1]?.duid}`
    } else {
      return item?.[0]?.duid
    }
  }

  const onRestAllParams = () => {
    const defaultParams = getDefaultParams()

    changeSearchFilter(() => defaultParams)
  }

  if (isLoading) {
    return (
      <FlatList
        numColumns={2}
        data={SKELETON_LIST}
        keyboardShouldPersistTaps="handled"
        renderItem={() => <SkeletonItem />}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item, index) => index}
      />
    )
  }

  return (
    <FlatList
      numColumns={2}
      data={searchResults}
      onEndReached={handleEndReached}
      onEndReachedThreshold={5}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <View>
          {item.map(user => (
            <ProfileAvatarItem
              key={user.duid}
              user={user}
              small={!user.smoker}
            />
          ))}
        </View>
      )}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        !isLoading && <Empty onResetFilter={onRestAllParams} />
      }
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={styles.contentContainerStyle}
      indicatorStyle="white"
    />
  )
}

const styles = StyleSheet.create({
  footerSeparator: {
    height: 20,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
    flexGrow: 1,
    paddingTop: 10,
  },
})
