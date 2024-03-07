import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import BackgroundGradient from '~/ui/background-gradient'
import EditMyInterests from '~/components/EditProfile/EditMyInterests'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const InterestsScreen = ({ route }) => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title={route.name} />}
    />,
    [route.name],
  )

  return (
    <BackgroundGradient>
      <EditMyInterests />
    </BackgroundGradient>
  )
}

export default InterestsScreen
