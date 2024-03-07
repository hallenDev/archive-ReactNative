import React from 'react'
import {
  Pressable,
  Modal,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import noop from '~/utils/noop'
import { Container, LinearGradient } from '~/ui'
import ButtonGradient from '~/ui/ButtonGradient'
import { ChevronRight, Chat } from '~/ui/icons'

import { colors, typography } from '~/ui/theme'

const Match = ({ user, closeAction = noop }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const openUser = () => {
    navigation.navigate('UserProfileScreen', { duid: user.duid })
    closeAction()
  }

  const handleGoToChat = () => {
    navigation.navigate('Chat', {
      otherUserId: user.duid,
    })
    closeAction()
  }

  return (
    <Container tapBar={false}>
      <ConfettiCannon
        count={200}
        origin={{
          x: Dimensions.get('window').width / 2,
          y: Dimensions.get('window').height,
        }}
        fadeOut
      />
      <View style={styles.container}>
        <Text style={styles.title}>You have a Match!</Text>
        <Pressable onPress={openUser}>
          <LinearGradient
            style={styles.avatarContainer}
            colors={[...colors.linerGradient].reverse()}
          >
            <Image source={{ uri: user?.profilePic }} style={styles.avatar} />
          </LinearGradient>
        </Pressable>

        <View style={styles.actions}>
          <View style={styles.btnRow}>
            <ButtonGradient
              title="View Profile"
              IconRight={ChevronRight}
              className={styles.btn}
              onAction={openUser}
              sizeIcon={20}
            />
            <ButtonGradient
              title="Message"
              IconRight={Chat}
              className={styles.btn}
              onAction={handleGoToChat}
            />
          </View>
          <Pressable onPress={closeAction}>
            <Text style={styles.return}>Return to match game</Text>
          </Pressable>
        </View>
      </View>
    </Container>
  )
}

const UserModal = ({ user, closeAction = noop, ...props }) => (
  <Modal
    visible={!!user}
    onRequestClose={closeAction}
    presentationStyle="fullScreen"
    animationType="slide"
  >
    {user && <Match user={user} closeAction={closeAction} {...props} />}
  </Modal>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    zIndex: 10,
  },
  topTitle: {
    marginVertical: 45,
  },
  title: {
    ...typography.h1,
    color: colors.textMain,
    marginVertical: 45,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 234,
    height: 234,
    borderRadius: 12,
  },
  avatar: {
    width: 230,
    height: 230,
    borderRadius: 12,
  },
  actions: {
    marginTop: 50,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  return: {
    ...typography.p2,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 32,
  },
  btnRow: {
    flexDirection: 'row',
  },
  btn: {
    minHeight: 48,
    marginHorizontal: 5,
  },
})

export default UserModal
