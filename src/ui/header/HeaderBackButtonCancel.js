import React from 'react'
import { StyleSheet } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { colors } from '~/ui/theme'

const HeaderBackButtonCancel = navigation => props => {
  return (
    <HeaderBackButton
      {...props}
      backImage={() => <></>}
      label="Cancel"
      labelVisible={true}
      labelStyle={styles.labelStyle}
      onPress={() => navigation?.goBack()}
    />
  )
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    color: colors.purePink,
  },
})

export default HeaderBackButtonCancel
