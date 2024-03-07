import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import BackgroundGradient from '~/ui/background-gradient'
import EditBio from '~/components/EditProfile/EditBio'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const BioScreen = ({ route }) => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title={route.name} />}
    />,
    [route.name],
  )

  return (
    <BackgroundGradient>
      <EditBio />
    </BackgroundGradient>
  )
}

export default BioScreen
