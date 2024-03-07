import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import { fetchProfile } from '~/shared/api'
import CircleButton from '~/ui/CircleButton'
import SvgEndCall from '~/ui/icons/EndCall'
import { colors, typography } from '~/ui/theme'
import noop from '~/utils/noop'

const OutgoingVideoCall = ({
  duid,
  userUrl,
  isUnavailable = false,
  onExitChat = noop,
}) => {
  const { data: user = {} } = useQuery(
    ['profile', parseInt(duid)],
    () => fetchProfile({ duid }),
    { enabled: !!duid },
  )

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePic}
        source={{ uri: userUrl }}
        blurRadius={1}
      />
      <View style={styles.blur} />
      <View style={styles.otherUserInfo}>
        {isUnavailable ? (
          <Text style={styles.unavailableText}>
            Sorry, looks like the other person is unavailable at the moment.
          </Text>
        ) : (
          <Text style={styles.outgoingText}>Outgoing VideoCall...</Text>
        )}

        <Image style={styles.myProfilePic} source={{ uri: user?.profilePic }} />
        <Text style={styles.myName}>{user?.username}</Text>
      </View>

      <View style={styles.endCallWrap}>
        <CircleButton
          Icon={SvgEndCall}
          buttonStyle={styles.endCall}
          textStyle={{ color: colors.white }}
          width={23}
          height={23}
          title={'End Call'}
          onPress={onExitChat}
        />
      </View>
    </View>
  )
}

export default OutgoingVideoCall

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blur: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  otherUserInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableText: {
    ...typography.p2,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  outgoingText: {
    ...typography.p2,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  myProfilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 10,
  },
  myName: {
    ...typography.h4,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  endCall: {
    backgroundColor: 'red',
  },
  endCallWrap: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
})
