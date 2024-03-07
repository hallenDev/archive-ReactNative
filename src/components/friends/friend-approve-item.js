import React from 'react'
import MenuButton from '~/ui/buttons/menu-button'
import AvatarUsernameRightBtnList from '~/ui/lists/avatar-username-right-btn-list'
import ViewMeasure from '~/ui/ViewMeasure'
import UserActionsModal from '~/components/Modals/UserActionsModal'

export default function FriendApproveItem({ duid, pic, online, username }) {
  const ref = React.useRef(null)
  const [menuModalVisible, setMenuModalVisible] = React.useState(false)
  const [marginTop, setMarginTop] = React.useState(0)

  return (
    <>
      <ViewMeasure ref={ref}>
        <AvatarUsernameRightBtnList
          duid={duid}
          uri={pic}
          online={online}
          username={username}
          renderRightButton={
            <MenuButton
              onPress={() => {
                ref.current.measureInWindow((x, y) => {
                  const value = Math.round(y) || 0
                  setMarginTop(value)
                  setMenuModalVisible(true)
                })
              }}
            />
          }
        />
      </ViewMeasure>

      <UserActionsModal
        modalVisible={menuModalVisible}
        setModalVisible={setMenuModalVisible}
        marginTop={marginTop}
        duid={duid}
        withRemoveFriend
      />
    </>
  )
}
