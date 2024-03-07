import React, { memo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Flag } from '~/ui/icons/Solid'
import { colors } from '~/ui/theme'

const ReportUserBtn = ({ duid }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate('ReportCommentScreen', { duid })}
      style={styles.menuButton}
    >
      <Flag width="16" height="16" color={colors.textSub} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
    borderRadius: 32,
    marginLeft: 15,
  },
})

export default memo(ReportUserBtn)
