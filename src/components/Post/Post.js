import React, { useState, useRef, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useFullscreenMediaModalContext } from '~/context/fullscreen-media-modal-context'
import useLike from '~/hooks/useLike'
import getUrl from '~/utils/getUrl'
import getProfileLocation from '~/utils/getProfileLocation'
import DeletePostModal from '~/components/Modals/DeletePostModal'
import PostFooterTab from './PostFooterTab'
import ContentReportDeleteBtn from '~/components/ContentReportDeleteBtn/ContentReportDeleteBtn'
import PressableHighlight from '~/ui/PressableHighlight'
import ContentMenuModal from '~/ui/ContentMenuModal'
import UserInfoPost from '~/ui/UserInfoPost'
import VideoPlayer from '~/ui/VideoPlayer'
import { Like, DotsHorizontal } from '~/ui/icons'
import ViewMeasure from '~/ui/ViewMeasure'
import { Heart as SolidLike, Chat } from '~/ui/icons/Solid'
import globalStyle from '~/ui/globalStyle'
import { colors, typography } from '~/ui/theme'

import VideoPlayerBtn from '~/ui/VideoPlayerBtn'
import { Video as VideoPlay } from '~/ui/icons/Solid'
import noop from '~/utils/noop'
import getDate from '~/utils/getDate'
import getPostsDate from '~/utils/getPostDate'
import FastImage from 'react-native-fast-image'
import ProfilePhotoMenu from '../MyAccount/ProfilePhotoMenu'
import useProfile from '../../hooks/useProfile'

const POST_HORIZONTAL_PADDING = 6
const SMALL_POST_MARGIN = 5

const VideoElement = ({
  aspectRatio,
  uri,
  post,
  isAutoplayVideoEnable,
  isStopVideo,
}) => {
  const [poster, setPoster] = useState(!isAutoplayVideoEnable)

  if (poster) {
    return (
      <View style={styles.posterContainer}>
        <VideoPlayerBtn
          action={() => setPoster(false)}
          className={{ bottom: 5, left: 10 }}
          Icon={VideoPlay}
        />
        <FastImage
          style={styles.image(aspectRatio)}
          source={{ uri: post.videoThumbUrl }}
          resizeMode="contain"
        />
      </View>
    )
  }

  return (
    <View style={styles.videoPlayerWrap(aspectRatio)}>
      <VideoPlayer
        uri={uri}
        videoThumbUrl={post.videoThumbUrl}
        isStopVideo={isStopVideo}
      />
    </View>
  )
}

const Post = ({
  post,
  showMenuBtn = false,
  hideLikersBtn = false,
  isFullscreenMedia = false,
  isTrending = false,
  isSmall = false,
  isProfile = false,
  isAutoplayVideoEnable = false,
  handlePressComment = noop,
  aspectRatio = 1,
}) => {
  const ref = useRef()
  const [marginTop, setMarginTop] = useState()
  const [menuModalVisible, setMenuModalVisible] = useState(false)
  const [modalDeletePostVisible, setModalDeletePostVisible] = useState(false)

  const navigation = useNavigation()
  const { data: myProfile } = useProfile()

  const { setMedia: setFullscreenMedia, visible } =
    useFullscreenMediaModalContext()

  const {
    data: { duid },
  } = useProfile()
  const myDuid = parseInt(duid, 10)

  const onLike = useLike()

  const isVideo = post.type === 'VIDEO'

  const handlePressMediaInside = () => {
    if (isFullscreenMedia) {
      setFullscreenMedia(
        isVideo
          ? { type: 'VIDEO', uri: post.url, poster: post.videoThumbUrl }
          : { type: 'PHOTO', uri: post.url },
      )

      return
    }

    navigation.navigate('Comments', {
      contentId: post.contentId,
      duid: post.duid,
      parentNavigation: navigation,
    })
  }

  const handleGoToLiked = () => {
    navigation.navigate('Liked', {
      postId: post.contentId,
    })
  }

  const handleGoToProfile = () => {
    if (myDuid !== parseInt(post.duid, 10)) {
      navigation.navigate('UserProfileScreen', { duid: post.duid })
    }
  }

  const onToggleDeleteModal = useCallback(() => {
    setModalDeletePostVisible(s => !s)
  }, [])

  const location =
    post?.location ??
    getProfileLocation(
      post?.userProfile?.city,
      post?.userProfile?.stateCode || post?.userProfile?.state_code,
      myProfile?.country === post?.userProfile?.country
        ? ''
        : post?.userProfile?.country,
    )
  const date = getPostsDate(getDate(post?.ctime))
  const profilePic = getUrl(
    post?.userProfile?.profilePic || post?.userProfile?.pic || post?.pic || '',
  )
  const uri = post.url

  return (
    <>
      <View style={[styles.container, isSmall && styles.smallContainer]}>
        <View style={styles.header}>
          <UserInfoPost
            isSmall={isSmall}
            onPress={handleGoToProfile}
            age={post?.userProfile?.age || post?.age}
            username={post?.userProfile?.username || post?.username}
            isVerified={post?.userProfile?.isVerified ?? post?.isVerified}
            uri={profilePic}
            location={location}
          />
          {showMenuBtn && myDuid === parseInt(post.duid, 10) && (
            <ViewMeasure ref={ref}>
              <PressableHighlight
                onPress={() => {
                  ref.current.measureInWindow((x, y) => {
                    setMarginTop(Math.round(y))
                    setMenuModalVisible(true)
                  })
                }}
                style={styles.menuButton}
                backgroundColor={colors.semiTransparentWhite15}
              >
                <DotsHorizontal width="22" height="22" color={colors.textSub} />
              </PressableHighlight>
            </ViewMeasure>
          )}

          {isProfile &&
            (myDuid !== parseInt(post.duid, 10) ? (
              <ContentReportDeleteBtn
                duid={post.duid}
                withMainContainerStyle={false}
                withGoBack
              />
            ) : (
              !isVideo && (
                <ProfilePhotoMenu
                  contentId={post.contentId}
                  contentMediaId={post.contentMediaId}
                  fileMd5={post.fileMd5}
                />
              )
            ))}
        </View>
        <View style={styles.userMedia}>
          <Pressable style={globalStyle.flex} onPress={handlePressMediaInside}>
            {isVideo ? (
              <VideoElement
                uri={uri}
                post={post}
                aspectRatio={1}
                isAutoplayVideoEnable={isAutoplayVideoEnable}
                isStopVideo={visible}
              />
            ) : (
              <FastImage
                style={styles.image(aspectRatio)}
                source={{ uri }}
                resizeMode="cover"
              />
            )}
          </Pressable>
          {myDuid !== parseInt(post.duid, 10) && isTrending && (
            <ContentReportDeleteBtn duid={post.duid} />
          )}
        </View>
        <View style={styles.footer}>
          <Text style={[styles.date, isSmall && styles.smallDate]}>{date}</Text>
          {!hideLikersBtn && (
            <TouchableOpacity onPress={handleGoToLiked}>
              <Text style={styles.showLikes}>Show likes</Text>
            </TouchableOpacity>
          )}
          <PostFooterTab
            counter={post?.actionCounts?.LIKE_UNIQUE}
            Icon={post?.isLiked ? SolidLike : Like}
            isPink={post?.isLiked}
            action={() => (post.isLiked ? null : onLike(post))}
          />
          <PostFooterTab
            counter={post?.actionCounts?.COMMENT}
            Icon={Chat}
            action={
              isFullscreenMedia ? handlePressComment : handlePressMediaInside
            }
          />
        </View>
      </View>

      <ContentMenuModal
        title="Delete Post"
        modalVisible={menuModalVisible}
        setModalVisible={setMenuModalVisible}
        handlerDeleteContent={() => {
          setMenuModalVisible(false)
          onToggleDeleteModal()
        }}
        marginTop={marginTop}
      />

      {modalDeletePostVisible && (
        <DeletePostModal
          contentId={post?.contentId}
          modalVisible={modalDeletePostVisible}
          onCloseModal={onToggleDeleteModal}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.postBackground,
    borderRadius: 5,
    padding: POST_HORIZONTAL_PADDING,
    marginBottom: 10,
  },
  smallContainer: {
    marginHorizontal: SMALL_POST_MARGIN,
    flex: 0.5,
  },
  posterContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlayerWrap: aspectRatio => ({
    width: '100%',
    height: undefined,
    aspectRatio: aspectRatio,
  }),
  header: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    ...typography.p3,
    color: colors.semiGray,

    flexGrow: 1,
  },
  smallDate: {
    ...typography.c2,
    color: colors.semiGray,
  },
  userMedia: {
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  footer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  showLikes: {
    ...typography.p3b,
    color: colors.textSub,
  },
  image: aspectRatio => ({
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: 1 / aspectRatio,
    resizeMode: 'cover',
  }),
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 32,
    width: 32,
    borderRadius: 32,
  },
})

export default Post
