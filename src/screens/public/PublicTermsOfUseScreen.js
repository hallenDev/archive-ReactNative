import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import { TermsOfUse } from '~/components'
import BackgroundGradient from '~/ui/background-gradient'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const PublicTermsOfUseScreen = () => {
  useSetHeader(
    <MainHeader
      CenterComponent={() => (
        <HeaderTitle title="Terms of Service" isMainTitle />
      )}
      withBackBtn
    />,
    [],
  )

  return (
    <BackgroundGradient>
      <TermsOfUse />
    </BackgroundGradient>
  )
}

export const options = () => ({
  headerShown: true,
})

export default PublicTermsOfUseScreen
