import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import { PrivacyPolicy } from '~/components'
import BackgroundGradient from '~/ui/background-gradient'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const PublicPrivacyPolicyScreen = () => {
  useSetHeader(
    <MainHeader
      CenterComponent={() => <HeaderTitle title="Privacy Policy" isMainTitle />}
      withBackBtn
    />,
    [],
  )

  return (
    <BackgroundGradient>
      <PrivacyPolicy />
    </BackgroundGradient>
  )
}

export const options = () => ({
  headerShown: true,
})

export default PublicPrivacyPolicyScreen
