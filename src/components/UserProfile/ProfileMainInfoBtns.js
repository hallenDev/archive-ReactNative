import React, { memo, useCallback, useState } from 'react'
import { View } from 'react-native'
import useFavorite from '~/hooks/useFavorite'
import useLikeUser from '~/hooks/useLikeUser'
import ProfileMainInfoBtn from '~/components/Profile/ProfileMainInfoBtn'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import { Favorite, Attention } from '~/ui/icons'
import { Heart, Dislike, DoubleHeart } from '~/ui/icons/Solid'
import SvgMatched from '~/ui/icons/Matched'

const ProfileMainInfoBtns = ({ duid, isFavorite, matchVote, isMatch }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onToggleConfirmModal = useCallback(() => {
    setIsOpenModal(s => !s)
  }, [])

  const { mutate: onAddFavorite, isLoading } = useFavorite({
    onSettled: onToggleConfirmModal,
  })
  const onLike = useLikeUser()

  const onToggleFavorite = () => {
    isFavorite ? onToggleConfirmModal() : onAddFavorite(duid, !isFavorite)
  }

  return (
    <>
      <ProfileMainInfoBtn
        title={isFavorite ? 'Favorited' : 'Favorite'}
        Icon={Favorite}
        onAction={onToggleFavorite}
        active={isFavorite}
      />
      <View style={{ width: 8 }} />
      <ProfileMainInfoBtn
        title={
          !matchVote
            ? 'Like'
            : isMatch
            ? 'Matched'
            : matchVote === 'LIKE'
            ? 'Liked'
            : 'Disliked'
        }
        Icon={
          !matchVote
            ? Heart
            : isMatch
            ? SvgMatched
            : matchVote === 'LIKE'
            ? Heart
            : Dislike
        }
        onAction={() => (!matchVote ? onLike(duid) : null)}
        active={matchVote}
      />

      {isOpenModal && (
        <ConfirmModal
          onApprove={() => {
            onAddFavorite(duid, !isFavorite)
          }}
          onCancel={onToggleConfirmModal}
          modalVisible={isOpenModal}
          approveText="OK"
          info={`Are you sure you want to \n delete from the favorites?`}
          Icon={Attention}
          approveLoading={isLoading}
        />
      )}
    </>
  )
}

export default memo(ProfileMainInfoBtns)
