import React from 'react'
import { StyleSheet, View } from 'react-native'
import usePost from '~/hooks/usePost'
import Post from './Post'
import Placeholder from '~/ui/Placeholder'
import noop from '~/utils/noop'

const GettingPost = ({ contentId, handlePressComment = noop }) => {
  const { data, isLoading } = usePost(parseInt(contentId, 10))

  if (isLoading) {
    return (
      <View style={styles.empty}>
        <Placeholder large />
      </View>
    )
  }

  return (
    <Post
      isFullscreenMedia
      hideLikersBtn
      showMenuBtn
      post={{
        ...data[0],
        userProfile: data.userProfile,
      }}
      handlePressComment={handlePressComment}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default GettingPost
