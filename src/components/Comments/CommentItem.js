import React, { memo } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { useUser } from '~/context/UserContext'
import DeleteCommentBtn from './DeleteCommentBtn'
import ReportUserBtn from './ReportUserBtn'
import { decode } from 'html-entities'
import Avatar from '~/ui/Avatar'
import { colors, typography } from '~/ui/theme'
import { useNavigation } from '@react-navigation/native'
import getPostsDate from '~/utils/getPostDate'
import getDate from '~/utils/getDate'

const CommentItem = ({
  duid,
  comment_duid,
  comment,
  username,
  replies,
  ctime,
  uri,
  isReply = false,
  setCommentDate,
  comment_id,
  contentId,
  parentNavigation,
}) => {
  const navigation = useNavigation()

  const {
    user: { duid: myDuid },
  } = useUser()

  const handleGoToProfile = () => {
    if (myDuid !== comment_duid) {
      const nav = parentNavigation ?? navigation
      nav.navigate('UserProfileScreen', { duid: comment_duid })
    }
  }

  return (
    <View style={[styles.container, isReply && styles.reply]}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Pressable style={styles.userInfo} onPress={handleGoToProfile}>
            <View style={styles.userPhoto}>
              <Avatar uri={uri} online={false} size={24} />
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {username}
            </Text>
          </Pressable>
          <Text style={styles.date}>{getPostsDate(getDate(ctime))}</Text>
        </View>
        {myDuid !== parseInt(comment_duid, 10) && (
          <ReportUserBtn duid={comment_duid} />
        )}
        {(myDuid === parseInt(comment_duid, 10) ||
          myDuid === parseInt(duid, 10)) && (
          <DeleteCommentBtn comment_id={comment_id} contentId={contentId} />
        )}
      </View>
      <Text style={styles.comment}>{decode(comment)}</Text>
      {!isReply && (
        <TouchableOpacity>
          <Text
            onPress={() =>
              setCommentDate({ comment_id, comment_duid, username })
            }
            style={styles.replyBtn}
          >
            Reply
          </Text>
        </TouchableOpacity>
      )}
      {(replies ?? []).reverse().map(reply => (
        <CommentItem
          duid={duid}
          comment={reply.body}
          key={reply.comment_id}
          comment_duid={reply.comment_duid}
          username={reply.username}
          ctime={reply.ctime}
          uri={reply.url}
          comment_id={reply.comment_id}
          contentId={contentId}
          isReply
          parentNavigation={parentNavigation}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 1,
  },
  userPhoto: {
    marginRight: 8,
  },
  name: {
    ...typography.p3b,
    color: colors.textSub,
    flexShrink: 1,
    flexGrow: 1,
  },
  date: {
    ...typography.p3,
    color: colors.semiGray,
    marginLeft: 20,
  },
  comment: {
    ...typography.p3,
    color: colors.textMain,
    paddingBottom: 4,
  },
  replyBtn: {
    ...typography.p2,
    color: colors.primary,
  },
  reply: {
    marginLeft: 8,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderColor: colors.semiGray,
  },
})

export default memo(CommentItem)
