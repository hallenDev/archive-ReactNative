import React from 'react'
import { useTheme } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import SvgArrowLeft from '~/ui/icons/ArrowLeft'

const HeaderBackButtonArrow = navigation => props => {
  const theme = useTheme()

  return (
    <HeaderBackButton
      onPress={() => navigation?.goBack()}
      backImage={() => (
        <SvgArrowLeft width="24" height="24" color={theme.colors.grey} />
      )}
      {...props}
    />
  )
}

export default HeaderBackButtonArrow
