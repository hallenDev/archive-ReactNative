import React from 'react'
import { useTheme } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import SvgClose from '~/ui/icons/Close'

const HeaderBackButtonClose = navigation => props => {
  const theme = useTheme()

  return (
    <HeaderBackButton
      onPress={() => navigation?.goBack()}
      backImage={() => (
        <SvgClose width="24" height="24" color={theme.colors.grey} />
      )}
      {...props}
    />
  )
}

export default HeaderBackButtonClose
