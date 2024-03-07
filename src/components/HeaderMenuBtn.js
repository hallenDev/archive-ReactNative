import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import UserActionsModal from '~/components/Modals/UserActionsModal'
import PressableHighlight from '~/ui/PressableHighlight'
import { DotsHorizontal } from '~/ui/icons'
import { colors } from '~/ui/theme'
import { TabItemBg } from '~/ui/icons'

const HeaderMenuBtn = ({ duid, isGoBack = false, isFromChat = false }) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()

  const handleGoBack = () => {
    isFromChat
      ? navigation.navigate('Inbox')
      : isGoBack
      ? navigation.goBack()
      : navigation.navigate('Trending')
  }

  return (
    <>
      <PressableHighlight
        onPress={() => setMenuModalVisible(true)}
        style={styles.menuButton}
        backgroundColor={colors.semiTransparentWhite15}
      >
        <TabItemBg width={40} height={34} fill={colors.buttonIconBg} />
        <DotsHorizontal
          width="22"
          height="22"
          color={colors.textMain}
          style={styles.icon}
        />
      </PressableHighlight>
      <UserActionsModal
        duid={duid}
        modalVisible={menuModalVisible}
        setModalVisible={setMenuModalVisible}
        onSuccessAction={handleGoBack}
        withDeleteChat={route?.name === 'Chat'}
      />
    </>
  )
}

const styles = StyleSheet.create({
  menuButton: {
    width: 40,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
  },
})

export default HeaderMenuBtn
