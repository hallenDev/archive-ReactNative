import React from 'react'
import PressableHighlight from '~/ui/PressableHighlight'
import SvgShevronLeftLarge from '~/ui/icons/ShevronLeftLarge'
import { colors } from '~/ui/theme'
import { StyleSheet } from 'react-native'
import { TabItemBg } from '~/ui/icons'

const BackButton = ({ onPress = () => {} }) => {
  return (
    <PressableHighlight onPress={onPress} style={styles.wrap}>
      <TabItemBg width={40} height={34} fill={colors.buttonIconBg} />
      <SvgShevronLeftLarge
        width="22"
        height="22"
        color={colors.textMain}
        style={styles.icon}
      />
    </PressableHighlight>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
  },
})

export default BackButton
