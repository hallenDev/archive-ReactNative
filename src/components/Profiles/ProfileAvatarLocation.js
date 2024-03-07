import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import SvgLocationFill from '~/ui/icons/LocationFill'

import { typography, colors } from '~/ui/theme'

const ProfileAvatarLocation = () => {
  return (
    <View style={styles.location}>
      <SvgLocationFill width="12" height="12" color={colors.orangeButton} />
      <Text style={styles.text}>15km</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  location: {
    height: 20,
    position: 'absolute',
    left: 4,
    bottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    ...typography.bodyRegular10,
    color: colors.whiteSystem,
  },
})

export default ProfileAvatarLocation
