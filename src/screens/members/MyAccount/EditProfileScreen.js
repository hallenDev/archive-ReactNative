import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import EditProfile from '~/components/EditProfile/EditProfile'
import BackgroundGradient from '~/ui/background-gradient'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const EditProfileScreen = () => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Edit profile" />}
    />,
    [],
  )

  return (
    <BackgroundGradient>
      <EditProfile />
    </BackgroundGradient>
  )
}

export default EditProfileScreen
