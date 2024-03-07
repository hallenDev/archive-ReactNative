import React, { useState, useRef, memo, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { deleteComment } from '~/shared/api/members'
import { deleteCommentFromList } from '~/utils/deleteCommentFromList'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import ContentMenuModal from '~/ui/ContentMenuModal'
import PressableHighlight from '~/ui/PressableHighlight'
import ViewMeasure from '~/ui/ViewMeasure'
import { DotsHorizontal, Attention } from '~/ui/icons'
import { colors } from '~/ui/theme'

const DeleteCommentBtn = ({ comment_id, contentId }) => {
  const ref = useRef()
  const [menuModalVisible, setMenuModalVisible] = useState(false)
  const [marginTop, setMarginTop] = useState()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation('deleteComment', deleteComment, {
    onSuccess: () => {
      queryClient.setQueriesData(['comments', contentId], previousData => {
        const pages = previousData?.pages?.map(item => {
          item.comments = deleteCommentFromList(item.comments, comment_id)

          item.comments.map(commentItem => {
            return (commentItem.replies = deleteCommentFromList(
              commentItem.replies,
              comment_id,
            ))
          })

          item.has_deleted_comments = true

          return item
        })

        return {
          ...previousData,
          pages,
        }
      })
    },
  })

  const handlerDeleteComment = () => {
    mutate({ commentId: comment_id })
  }

  const onToggleConfirmModal = useCallback(() => {
    setIsOpenConfirmModal(s => !s)
    setMenuModalVisible(false)
  }, [])

  return (
    <>
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

      {menuModalVisible && (
        <ContentMenuModal
          title="Delete Comment"
          modalVisible={menuModalVisible}
          setModalVisible={setMenuModalVisible}
          handlerDeleteContent={onToggleConfirmModal}
          marginTop={marginTop}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          onApprove={handlerDeleteComment}
          onCancel={onToggleConfirmModal}
          modalVisible={isOpenConfirmModal}
          approveText="OK"
          info={`Are you sure you want to \n delete the comment?`}
          Icon={Attention}
          approveLoading={isLoading}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
    borderRadius: 32,
    marginLeft: 15,
  },
})

export default memo(DeleteCommentBtn)
