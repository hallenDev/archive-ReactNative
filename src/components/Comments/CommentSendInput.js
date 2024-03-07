import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Keyboard,
} from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { addComment } from '~/shared/api/members'
import usePost from '~/hooks/usePost'
import ErrorMessageType from '~/shared/types/ErrorMessageType'
import { showNotificationError } from '~/services/in-app-notifications'
import PressableHighlight from '~/ui/PressableHighlight'
import SvgPaperAirplane from '~/ui/icons/PaperAirplane'
import { Close } from '~/ui/icons'
import noop from '~/utils/noop'
import { colors } from '~/ui/theme'
import { commentInputStyles as styles } from '~/styles'

const CommentSendInput = ({ contentId, commentDate, setCommentDate }, ref) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')
  const { data: post, isLoading } = usePost(parseInt(contentId, 10))
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }))

  const { mutate, isLoading: isSendLoafing } = useMutation(
    'addComment',
    addComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments', parseInt(contentId, 10))

        const trendings = queryClient.getQueriesData('trending')

        trendings.forEach(([params, data]) => {
          const newData = { ...data }

          newData.pages = newData?.pages?.map(page => {
            const foundIndex = page.content.findIndex(
              p => p.contentId === contentId,
            )

            if (foundIndex >= 0) {
              page.content[foundIndex].actionCounts.COMMENT =
                parseInt(
                  page.content[foundIndex].actionCounts.COMMENT ?? 0,
                  10,
                ) + 1
            }

            return page
          })

          queryClient.setQueryData(params, newData)
        })

        const profileFeed = queryClient.getQueriesData([
          'profileTrending',
          parseInt(post[0].duid, 10),
        ])

        profileFeed.forEach(([params, data]) => {
          const newData = { ...data }
          newData.pages = newData?.pages?.map(page => {
            const foundIndex = page.findIndex(p => p.contentId === contentId)

            if (foundIndex >= 0) {
              page[foundIndex].actionCounts.COMMENT =
                parseInt(page[foundIndex].actionCounts.COMMENT ?? 0, 10) + 1
            }

            return page
          })

          queryClient.setQueryData(params, newData)
        })

        const p = queryClient.getQueryData(['post', parseInt(contentId, 10)])

        if (p) {
          let newComment = { ...p }

          newComment[0].actionCounts.COMMENT =
            parseInt(newComment[0].actionCounts.COMMENT ?? 0, 10) + 1
          queryClient.setQueryData(
            ['post', parseInt(contentId, 10)],
            newComment,
          )
        }
      },
      onError: () => {
        // error?.data?.errors?.includes('id_throttled')
        showNotificationError({
          message: ErrorMessageType.ERROR_MESSAGE_COMMENT,
        })
      },
    },
  )

  const handleSendMessage = () => {
    Keyboard.dismiss()

    const body = message.trim()
    if (!body) return

    const commentData = {
      content_id: post[0].contentId,
      content_duid: post[0].duid,
      content_gender: post[0].gender,
      content_type: post[0].contentType,
      media_type: post[0].type ?? undefined,
      body,
    }

    if (commentDate) {
      commentData.parent_comment_id = commentDate.comment_id
      commentData.parent_comment_duid = commentDate.comment_duid
    }

    mutate(commentData)
    setMessage('')
    setCommentDate(null)
  }

  const closeReply = () => setCommentDate(null)

  return (
    <View style={styles.container}>
      {commentDate && (
        <View style={styles.replyingContainer}>
          <Text style={styles.replying}>
            Replying to {commentDate.username}
          </Text>
          <PressableHighlight
            onPress={closeReply}
            style={styles.closeReply}
            backgroundColor={colors.semiTransparentWhite15}
          >
            <Close width={14} height={14} color={colors.textMain} />
          </PressableHighlight>
        </View>
      )}

      <View style={styles.textInputWrapper}>
        <TextInput
          autoGrow
          multiline
          maxHeight={100}
          ref={inputRef}
          style={styles.input}
          placeholder="Add a comment"
          placeholderTextColor={colors.semiGray}
          onContentSizeChange={noop}
          value={message}
          onChangeText={text => setMessage(text)}
          enableScrollToCaret
          autoFocus={false}
          selectionColor={colors.cursorColor}
        />
        <PressableHighlight
          backgroundColor={colors.semiTransparentWhite15}
          style={styles.sendButton}
          onPress={isLoading ? noop : handleSendMessage}
        >
          {isSendLoafing ? (
            <ActivityIndicator />
          ) : (
            <SvgPaperAirplane
              width="24"
              height="24"
              color={message.length > 0 ? colors.textMain : colors.semiGray}
            />
          )}
        </PressableHighlight>
      </View>
    </View>
  )
}

export default forwardRef(CommentSendInput)
