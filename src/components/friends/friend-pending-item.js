import React from 'react'
import AvatarUsernameRightBtnList from '~/ui/lists/avatar-username-right-btn-list'
import ApproveButton from './ui/approve-button'

export default function FriendPendingItem({ duid, pic, online, username }) {
  return (
    <AvatarUsernameRightBtnList
      duid={duid}
      uri={pic}
      online={online}
      username={username}
      renderRightButton={<ApproveButton approve={false} />}
    />
  )
}
