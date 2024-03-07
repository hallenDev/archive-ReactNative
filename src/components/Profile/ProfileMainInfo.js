import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import getUrl from '~/utils/getUrl'
import getProfileLocation from '~/utils/getProfileLocation'
import AvatarSquare from '~/ui/AvatarSquare'
import { LocationFill, VeriIcon } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'
import VerifiedProfileModal from '../Modals/VerifiedProfileModal'

const LOCATION_MARGIN_BOTTOM = {
  withActivity: 5,
  withoutActivity: 12,
}

const ProfileMainInfo = ({
  children,
  username,
  age,
  isVerified,
  city,
  state_code,
  country,
  profilePic,
  last_active,
  online,
  navigation,
  isLoading,
}) => {
  const [openVerifidModal, setOpenVerifiedModal] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <AvatarSquare
            uri={getUrl(profilePic)}
            online={online}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userNameAge}>
            {isLoading ? (
              <View style={styles.containerSkeleton(200, 25)}>
                <ContentLoader
                  backgroundColor={colors.darkBlack}
                  opacity={0.25}
                >
                  <Rect width="200" height="25" />
                </ContentLoader>
              </View>
            ) : (
              <>
                <Text
                  style={styles.userTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {username},
                </Text>
                <Text style={styles.userAge}>{age}</Text>
                {isVerified && (
                  <TouchableOpacity onPress={() => setOpenVerifiedModal(true)}>
                    <VeriIcon fill={colors.primary} />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
          <View
            style={styles.userLocation}
            marginBottom={
              last_active
                ? LOCATION_MARGIN_BOTTOM.withActivity
                : LOCATION_MARGIN_BOTTOM.withoutActivity
            }
          >
            {isLoading ? (
              <View style={styles.containerSkeleton(100, 10)}>
                <ContentLoader
                  backgroundColor={colors.darkBlack}
                  opacity={0.25}
                >
                  <Rect width="200" height="25" />
                </ContentLoader>
              </View>
            ) : (
              <>
                <LocationFill
                  width={12}
                  height={12}
                  style={styles.userLocationIcon}
                />
                <Text style={styles.location}>
                  {getProfileLocation(city, state_code, country)}
                </Text>
              </>
            )}
          </View>
          {online ? (
            <Text style={styles.textOnline}>Online Now</Text>
          ) : (
            !!last_active && (
              <Text
                style={styles.lastActive}
              >{`Last seen ${last_active}`}</Text>
            )
          )}
          <View style={styles.userButtons}>{children}</View>
        </View>
      </View>

      <VerifiedProfileModal
        modalVisible={openVerifidModal}
        setModalVisible={setOpenVerifiedModal}
        onApprove={() => {
          navigation.navigate('MyAccountVerifyProfileScreen')
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
    width: '100%',
  },
  avatar: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userNameAge: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 3,
  },
  userTitle: {
    ...typography.h4,
    color: colors.textMain,
    overflow: 'hidden',
    maxWidth: 170,
    marginRight: 5,
  },
  userAge: {
    ...typography.h4,
    color: colors.textMain,
    marginRight: 5,
  },
  lastActive: {
    ...typography.c2,
    color: colors.textMain,
    marginBottom: 5,
  },
  textOnline: {
    ...typography.c2,
    color: colors.textMain,
    marginBottom: 5,
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
    ...typography.c2,
    color: colors.semiGray,
  },
  userButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  containerSkeleton: (width, height) => ({
    borderRadius: 4,
    overflow: 'hidden',
    width: width,
    height: height,
  }),
})

export default ProfileMainInfo
