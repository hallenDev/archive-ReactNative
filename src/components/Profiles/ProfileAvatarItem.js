import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ContentReportDeleteBtn from '~/components/ContentReportDeleteBtn/ContentReportDeleteBtn'
import { colors, typography } from '~/ui/theme'
import { Camera } from '~/ui/icons/Solid'
import { VeriIcon } from '~/ui/icons'
import globalStyle from '~/ui/globalStyle'
import FastImage from 'react-native-fast-image'

const ProfileAvatarItem = ({ user, small }) => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  const handleOpenProfile = () => {
    navigation.navigate('UserProfileScreen', { duid: user.duid })
  }

  const calcColumnWidthWithWindow = (width - 12 - 16 * 2) / 2

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={handleOpenProfile}>
        <View
          style={[
            styles.image(calcColumnWidthWithWindow),
            !small && styles.image2(calcColumnWidthWithWindow),
          ]}
          source={{ uri: user.profilePic }}
        >
          <FastImage
            source={{ uri: user.profilePic }}
            style={styles.fastImage}
          />
          <View style={styles.info}>
            <View style={globalStyle.flex}>
              <View style={styles.usernameWrapper}>
                <Text style={styles.username} numberOfLines={1}>
                  {user.username}
                </Text>
                <Text style={styles.age}>, {user.age}</Text>
                {user.isVerified && (
                  <VeriIcon
                    width={12}
                    style={styles.verifyIcon}
                    fill={colors.primary}
                  />
                )}
              </View>
              <Text style={styles.text} numberOfLines={1}>
                {user.location}
              </Text>
            </View>
            <View style={styles.media}>
              <Camera width={12} height={12} style={styles.icon} />
              <Text style={styles.text} numberOfLines={1}>
                {user.contentCount}
              </Text>
            </View>
          </View>
        </View>
        <ContentReportDeleteBtn duid={user.duid} />
      </TouchableOpacity>
      {user?.online && <View style={styles.online} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  box: {
    marginHorizontal: 6,
    marginBottom: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: size => ({
    width: size,
    height: size,
    justifyContent: 'flex-end',
  }),
  image2: size => ({
    height: size * 2 + 12,
  }),
  fastImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  info: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  usernameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    ...typography.p3b,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    flexShrink: 1,
  },
  age: {
    ...typography.p3b,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  verifyIcon: {
    marginLeft: 5,
  },
  text: {
    ...typography.p3,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  media: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  },
  icon: {
    color: colors.white,
    marginRight: 2,
  },
  online: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: colors.greenApprove,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.darkViolet,
    top: -6,
    right: 2,
  },
})

export default ProfileAvatarItem
