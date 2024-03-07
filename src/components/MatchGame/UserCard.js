import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native'
import useProfile from '~/hooks/useProfile'
import { hasNotch } from 'react-native-device-info'

import { LinearGradient, Loading, AnimatedHideView } from '~/ui'
import ChatbotDuids from '~/shared/types/ChatbotDuids'

import { User, Major, Verified, Camera } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'
import { useNavigation } from '@react-navigation/native'
import ContentReportDeleteBtn from '~/components/ContentReportDeleteBtn/ContentReportDeleteBtn'
import { RobotLove } from '~/ui/icons'

const UserCard = ({ user, actions = true, favoritedDuid }) => {
  const navigation = useNavigation()
  const [wTip, setWTip] = useState(true)
  const [fTip, setFTip] = useState(false)

  const { data: myProfile } = useProfile()

  const isChatBot = ChatbotDuids.find(
    bot_duid => parseInt(user.duid, 10) === bot_duid,
  )

  useEffect(() => {
    if (favoritedDuid === user?.duid) {
      handleFavorite()
    }
  }, [favoritedDuid])

  useEffect(() => {
    setWTip(true)
    let timeout = setTimeout(() => {
      setWTip(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!fTip) return

    let timeout = setTimeout(() => {
      setFTip(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [fTip])

  if (!user) return null

  function handleFavorite() {
    setFTip(true)
    setWTip(false)
  }

  let location = `${user.city}, ${user.stateCode || user.state_code}`

  if (myProfile?.country !== user.country) {
    location += `, ${user.country}`
  }

  const photos = [
    user?.profilePic,
    ...(user?.media || []).map(({ url }) => url),
  ]

  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <Loading />
      </View>
      <ImageBackground
        source={{ uri: photos[0] }}
        resizeMode="cover"
        style={styles.image}
      >
        <Pressable
          onPress={() =>
            navigation.navigate('UserProfileScreen', { duid: user.duid })
          }
          style={styles.body}
        >
          <View>
            {isChatBot ? (
              <View style={styles.botAlertWrap}>
                <View style={styles.botIconWrap}>
                  <RobotLove width={37} height={37} fill={colors.primary} />
                </View>
                <View style={styles.botTextWrap}>
                  <Text style={typography.p3}>
                    <Text style={styles.botTextBold}>New Feature!</Text> Swipe
                    right to chat with our AI Companion!
                  </Text>
                </View>
              </View>
            ) : null}
            <AnimatedHideView visible={fTip} style={styles.tip} duration={700}>
              <View style={[styles.fTip, styles.tipContainer]}>
                <Major width={16} height={16} color={colors.white} />
                <Text style={styles.tipTxt}>Added to Favorite!</Text>
              </View>
            </AnimatedHideView>
            <AnimatedHideView visible={wTip} style={styles.tip} duration={700}>
              <View style={[styles.wTip, styles.tipContainer]}>
                <User width={16} height={16} color={colors.white} />
                <Text style={styles.tipTxt} allowFontScaling={false}>
                  tap to view profile
                </Text>
              </View>
            </AnimatedHideView>
          </View>
          <View style={styles.photosContainer}>
            <Camera width={16} height={16} color={colors.white} />
            <Text style={styles.photos} allowFontScaling={false}>
              {user?.contentCount}
            </Text>
          </View>
          <ContentReportDeleteBtn duid={user.duid} />
          <LinearGradient colors={colors.userCardGradient} style={styles.info}>
            <View style={styles.userInfo}>
              {isChatBot ? (
                <View style={styles.botNameWrap}>
                  <Text style={styles.botName}>AI Companion(beta)</Text>
                </View>
              ) : null}

              <View style={styles.username}>
                <Text
                  style={[
                    styles.userTitle,
                    user?.isVerified && styles.shortName,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  allowFontScaling={false}
                >
                  {user.username}
                </Text>
                <Text style={styles.userAge}>, {user.age}</Text>
                {user?.isVerified && (
                  <Verified width={16} height={16} fill={colors.primary} />
                )}
              </View>
              <Text
                style={styles.location}
                numberOfLines={2}
                ellipsizeMode="tail"
                allowFontScaling={false}
              >
                {location}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </ImageBackground>
    </View>
  )
}

const widthProp = Platform.select({ ios: 0.86, android: 0.84 })
const heightProp = !hasNotch() ? 1.335 : 1.584

export const cardSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width * widthProp * heightProp,
}

const styles = StyleSheet.create({
  container: {
    width: cardSize.width,
    height: cardSize.height,
    backgroundColor: colors.black,
    overflow: 'hidden',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  loading: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'flex-end',
  },
  info: {
    height: 86,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  userInfo: {
    paddingRight: 16,
    alignItems: 'center',
  },
  location: {
    ...typography.p2,
    color: colors.white,
  },
  userAge: {
    ...typography.h3,
    textTransform: 'capitalize',
    color: colors.white,
    marginRight: 5,
    fontSize: 18,
  },
  userTitle: {
    ...typography.h3,
    color: colors.white,
    overflow: 'hidden',
    maxWidth: '95%',
    fontSize: 18,
  },
  shortName: {
    maxWidth: '80%',
  },
  photosContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: colors.semiBlack50,
  },
  photos: {
    ...typography.p3,
    color: colors.white,
    marginLeft: 4,
  },
  body: { flex: 1, justifyContent: 'flex-end' },
  tip: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  tipTxt: {
    ...typography.p3,
    marginLeft: 8,
    color: colors.white,
  },
  wTip: {
    backgroundColor: colors.semiBlack50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fTip: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAlertWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: '75%',
    backgroundColor: colors.bgGradient[0],
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    padding: 7,
    marginBottom: 60,
  },
  botIconWrap: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  botTextWrap: {
    ...typography.p3,
    flexShrink: 1,
    paddingLeft: 10,
  },
  botTextBold: {
    ...typography.p2b,
  },
  botNameWrap: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  botName: {
    ...typography.p3,
    color: colors.white,
  },
})

export default UserCard
