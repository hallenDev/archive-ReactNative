import { useInfiniteQuery } from 'react-query'
import { fetchProfileFeed } from '~/shared/api/members'

const LIMIT = 32

const useGetUserMedia = duid => {
  const {
    data = {},
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['profileTrending', parseInt(duid)],
    ({ pageParam: last_content_id = undefined }) =>
      fetchProfileFeed({
        duid,
        limit: LIMIT,
        last_content_id,
      }),
    {
      enabled: !!duid,
      refetchOnMount: false,
      getNextPageParam: lastPage => {
        if (!!(lastPage ?? [])?.length && (lastPage ?? [])?.length > 0) {
          return lastPage?.[lastPage?.length - 1]?.contentId
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

  return {
    data,
    isLoading,
    handleEndReached,
    hasNextPage,
    refetch,
  }
}

export default useGetUserMedia
