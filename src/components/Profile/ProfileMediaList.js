import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Post from '~/components/Post/Post'
import SmallPost from '~/components/Post/SmallPost'
import ProfileFeed from '~/components/ProfileFeed/ProfileFeed'
import { MIN_VIDEO_FOR_AUTOPLAY_ENABLE } from '~/configs/constants'
import { MediaListType } from '~/shared/types/MediaListType'
import { colors, typography } from '~/ui/theme'

const renderItem = ({ listType, videoItemCount, item }) => {
  const isAutoplayVideoEnable = videoItemCount <= MIN_VIDEO_FOR_AUTOPLAY_ENABLE

  if (listType === 'list')
    return (
      <Post
        key={item?.contentId}
        post={item}
        isAutoplayVideoEnable={isAutoplayVideoEnable}
        isProfile
      />
    )

  return (
    <SmallPost
      key={item?.contentId}
      contentId={item.contentId}
      url={item.url}
      videoThumbUrl={item.videoThumbUrl}
      isVideo={item.type === 'VIDEO'}
      duid={item.duid}
      isAutoplayVideoEnable={isAutoplayVideoEnable}
    />
  )
}

const ProfileMediaList = ({
  data,
  user,
  isMyProfile = false,
  isLoading = true,
}) => {
  const [listType, setListType] = useState(MediaListType.C_LIST)

  const onChangeListType = useCallback(type => {
    setListType(type)
  }, [])

  const results = data?.pages
    ?.reduce((acc, current) => {
      const newResult = current ?? []
      return [...acc, ...newResult]
    }, [])
    .map(post => ({ ...post, userProfile: user }))

  const videoItemCount = results?.reduce((acc, current) => {
    return current.type === 'VIDEO' ? acc + 1 : acc
  }, 0)

  if (!results?.length) {
    return (
      <View style={styles.emptyContainer}>
        {isLoading ? (
          <Text style={styles.emptyMessage}>Loading...</Text>
        ) : (
          <Text style={styles.emptyMessage}>
            {isMyProfile
              ? 'Add your first post'
              : 'Unfortunately, there are no available posts'}
          </Text>
        )}
      </View>
    )
  }

  return (
    <>
      <ProfileFeed
        onChangeListType={onChangeListType}
        listType={listType}
        duid={user.duid}
      />
      <View style={listType === MediaListType.C_GRID && styles.container}>
        {results?.map(item => renderItem({ listType, videoItemCount, item }))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyContainer: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    ...typography.p1,
    color: colors.textSub,
  },
})

export default ProfileMediaList
