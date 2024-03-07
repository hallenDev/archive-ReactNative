import React from 'react'
import { colors } from '~/ui/theme'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import LogoHeaderWithBack from '~/ui/header/LogoHeaderWithBack'
import MatchesList from '~/components/friends/matches-list'

const MatchesScreen = ({ navigation }) => {
  return (
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <MatchesList />
    </LinearGradient>
  )
}

MatchesScreen.options = ({ navigation }) => ({
  header: () => (
    <LogoHeaderWithBack
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default MatchesScreen
