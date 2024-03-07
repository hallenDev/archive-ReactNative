import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '~/context/UserContext'
import UserActionsModal from '~/components/Modals/UserActionsModal'
import Avatar from '~/ui/Avatar'
import ViewMeasure from '~/ui/ViewMeasure'
import PressableHighlight from '~/ui/PressableHighlight'
import { DotsHorizontal } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const LikedListItem = ({ pic, name, duid, online }) => {
  const ref = useRef()
  const [marginTop, setMarginTop] = useState()
  const [menuModalVisible, setMenuModalVisible] = useState(false)

  const navigation = useNavigation()

  const {
    user: { duid: myDuid },
  } = useUser()

  const handleGoToProfile = () => {
    if (myDuid !== duid) {
      navigation.navigate('UserProfileScreen', { duid })
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.userInfo} onPress={handleGoToProfile}>
        <Avatar uri={pic} online={online} />
        <Text style={styles.userName}>{name}</Text>
      </Pressable>
      {parseInt(myDuid, 10) !== parseInt(duid, 10) && (
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

          <UserActionsModal
            modalVisible={menuModalVisible}
            setModalVisible={setMenuModalVisible}
            marginTop={marginTop}
            duid={duid}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
  },
  userName: {
    ...typography.p2b,
    color: colors.textMain,
    marginLeft: 12,
    flexShrink: 1,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LikedListItem
