import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { fetchContentComments } from '~/shared/api/members'
import GettingPost from '../Post/GettingPost'
import CommentItem from './CommentItem'
import { colors, typography } from '~/ui/theme'
import noop from '~/utils/noop'

const Comments = ({
  duid,
  contentId,
  setCommentDate,
  parentNavigation,
  handlePressComment = noop,
}) => {
  const [hasDeleted, setHasDeleted] = useState(false)

  const {
    data = {},
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['comments', contentId],
    ({ pageParam: last_comment_id = 0 }) =>
      fetchContentComments(contentId, {
        last_comment_id,
        limit: 24,
      }),
    {
      refetchOnMount: false,
      getNextPageParam: lastPage => {
        if ((lastPage?.comments ?? []).length) {
          return lastPage.comments[lastPage.comments.length - 1].comment_id
        }

        return undefined
      },
    },
  )

  const comments = data?.pages?.reduce((acc, current) => {
    const newResult = current?.comments || []

    let sortedComments = [...acc, ...newResult].sort((a, b) => {
      return parseInt(b.comment_id, 10) - parseInt(a.comment_id, 10)
    })

    sortedComments.forEach(comment => {
      comment?.replies?.sort((a, b) => {
        return parseInt(b.comment_id, 10) - parseInt(a.comment_id, 10)
      })
    })

    return sortedComments
  }, [])

  const fetchNextPageAction = () => {
    if (!hasNextPage || isFetching || isFetchingNextPage) return null
    return fetchNextPage()
  }

  useEffect(() => {
    !hasDeleted &&
      data?.pages?.forEach(item => {
        !!item.has_deleted_comments && setHasDeleted(true)
      })
  }, [data, hasDeleted, comments])

  const renderItem = ({ item }) => (
    <CommentItem
      duid={duid}
      comment_duid={item.comment_duid}
      comment_id={item.comment_id}
      username={item.username}
      comment={item.body}
      ctime={item.ctime}
      replies={item?.replies}
      uri={item.url}
      setCommentDate={setCommentDate}
      contentId={contentId}
      parentNavigation={parentNavigation}
    />
  )

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      data={comments}
      contentContainerStyle={styles.contentContainerStyle}
      ListHeaderComponent={
        <>
          <GettingPost
            contentId={contentId}
            handlePressComment={handlePressComment}
          />
          <View style={styles.hasDeleted}>
            {hasDeleted && (
              <Text style={{ ...typography.p3, color: colors.textSub }}>
                Note: some comments have been deleted
              </Text>
            )}
          </View>
        </>
      }
      onEndReached={fetchNextPageAction}
      renderItem={renderItem}
      keyExtractor={item => item?.comment_id}
      keyboardDismissMode="on-drag"
      indicatorStyle="white"
    />
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 50,
  },
  hasDeleted: {
    borderTopWidth: 1,
    borderColor: colors.semiTransparentWhite15,
    paddingTop: 8,
  },
})

export default Comments
