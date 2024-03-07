import React from 'react'
import Avatar from '~/ui/Avatar'
import { StyleSheet, View, Text } from 'react-native'
import { typography, colors } from '~/ui/theme'
import { useNavigation } from '@react-navigation/native'
import PressableHighlight from '~/ui/PressableHighlight'

const AvatarUsernameRightBtnList = ({
  duid,
  uri = '',
  online = false,
  username = '',
  renderRightButton = null,
}) => {
  const navigation = useNavigation()

  const handlePress = () => navigation.navigate('UserProfileScreen', { duid })

  return (
    <PressableHighlight style={styles.container} onPress={handlePress}>
      <View>
        <Avatar uri={uri} online={online} />
      </View>
      <View style={styles.content}>
        <View style={styles.username}>
          <Text
            style={styles.usernameText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {username}
          </Text>
        </View>
        <View style={styles.button}>{renderRightButton}</View>
      </View>
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    flex: 1,
  },
  button: {
    alignItems: 'flex-end',
  },
  usernameText: {
    ...typography.p2,
    color: colors.textMain,

    fontWeight: '600',
  },
})

export default AvatarUsernameRightBtnList
