import React from 'react'
import { StyleSheet, View, Pressable, Image, Text } from 'react-native'
import { VeriIcon } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const UserInfoPost = ({
  uri,
  username,
  age,
  location,
  locationClassName,
  isSmall = false,
  isVerified,
  onPress = () => null,
}) => (
  <Pressable style={styles.userInfo} onPress={onPress}>
    <Image style={styles.avatar} source={{ uri }} />
    <View style={styles.userData}>
      <View style={styles.userNameAge}>
        <Text
          style={[styles.userTitle, isSmall && styles.smallUserTitle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {username ?? ''}
        </Text>
        {isVerified && (
          <VeriIcon
            width={15}
            height={15}
            style={styles.verifiedIcon}
            fill={colors.primary}
          />
        )}
      </View>
      <View style={styles.userLocation}>
        {age && location ? (
          <Text
            style={[styles.location, locationClassName]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {age}•{location}
          </Text>
        ) : null}
      </View>
    </View>
  </Pressable>
)

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 5,
    marginRight: 8,
  },
  userData: {
    flex: 1,
    justifyContent: 'center',
    height: 35,
  },
  userNameAge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTitle: {
    ...typography.p2b,
    color: colors.textMain,

    maxWidth: '90%',
  },
  smallUserTitle: {
    maxWidth: '70%',
  },
  userAge: {
    ...typography.p2b,
    color: colors.textMain,
  },
  userLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocationIcon: {
    marginRight: 4,
    color: colors.semiGray,
  },
  location: {
    ...typography.p2,
    color: colors.semiGray,
  },
  verifiedIcon: {
    marginLeft: 5,
  },
})

export default UserInfoPost
