import React from 'react'
import BackgroundGradient from '~/ui/background-gradient'
import WelcomeScreenContent from '~/components/WelcomScreenContent'

const WelcomeScreen = ({ navigation }) => {
  return (
    <BackgroundGradient>
      <WelcomeScreenContent navigation={navigation} />
    </BackgroundGradient>
  )
}

export default WelcomeScreen
