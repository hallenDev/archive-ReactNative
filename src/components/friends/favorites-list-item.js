import React from 'react'
import AvatarUsernameRightBtnList from '~/ui/lists/avatar-username-right-btn-list'
import MenuButton from '~/ui/buttons/menu-button'
import ViewMeasure from '~/ui/ViewMeasure'
import UserActionsModal from '~/components//Modals/UserActionsModal'

import SelectedDuidContext from '~/context/selected-duid-context'
import { useQueryClient } from 'react-query'

export default function FavoritesListItem({
  duid,
  pic = '',
  online = false,
  username = '',
}) {
  const ref = React.useRef(null)
  const queryClient = useQueryClient()
  const [menuModalVisible, setMenuModalVisible] = React.useState(false)
  const [marginTop, setMarginTop] = React.useState(0)

  return (
    <SelectedDuidContext value={duid}>
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
        withRemoveFavorite
        onSuccessAction={() => queryClient.invalidateQueries('favorites')}
      />
    </SelectedDuidContext>
  )
}
