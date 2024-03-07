import React from 'react'
import UserProfile from '~/components/UserProfile'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import BackgroundGradient from '~/ui/background-gradient'

const UserProfileScreen = ({ navigation, route }) => {
  const { duid, isFromChat } = route?.params

  return (
    <BackgroundGradient>
      <UserProfile
        duid={parseInt(duid)}
        navigation={navigation}
        isFromChat={isFromChat}
      />
      <ReportSuccessModal withGoBack />
    </BackgroundGradient>
  )
}

export const options = () => ({
  tabBarButton: () => null,
})

export default UserProfileScreen
