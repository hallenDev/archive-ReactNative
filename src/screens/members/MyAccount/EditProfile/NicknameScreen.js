import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import BackgroundGradient from '~/ui/background-gradient'
import EditNickname from '~/components/EditProfile/EditNickname'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const NicknameScreen = ({ route }) => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title={route.name} />}
    />,
    [route.name],
  )

  return (
    <BackgroundGradient>
      <EditNickname />
    </BackgroundGradient>
  )
}

export default NicknameScreen
