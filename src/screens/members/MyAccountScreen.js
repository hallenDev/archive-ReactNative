import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import MyProfile from '~/components/MyAccount/MyProfile'
import ProfileMainInfoBtn from '~/components/Profile/ProfileMainInfoBtn'
import BackgroundGradient from '~/ui/background-gradient'
import { TabBarIcon, TabBarLabel } from '~/components'
import { MainHeader } from '~/ui'
import { Setting } from '~/ui/icons'
import { accountSettingBtnStyles } from '~/styles'
import { Profile, ProfileActive } from '~/ui/icons'
import HeaderTitle from '~/components/HeaderTitle'

const MyAccountScreen = ({ navigation, route }) => {
  useSetHeader(
    <MainHeader
      LeftComponent={() => <HeaderTitle title="Me" isMainTitle />}
      RightComponent={() => (
        <ProfileMainInfoBtn
          title="Account"
          Icon={Setting}
          onAction={() => navigation.navigate('MyAccountSettingsScreen')}
          additionalStyles={accountSettingBtnStyles.button}
          additionalTextStyle={accountSettingBtnStyles.text}
        />
      )}
    />,
    [route.name],
  )

  return (
    <BackgroundGradient>
      <MyProfile navigation={navigation} />
    </BackgroundGradient>
  )
}

export const optionsTabsScreen = () => ({
  headerShown: false,
  tabBarLabel: props => <TabBarLabel {...props}>Me</TabBarLabel>,
  tabBarIcon: props => (
    <TabBarIcon
      {...props}
      Icon={Profile}
      ActiveIcon={ProfileActive}
      size={17}
    />
  ),
})

export default MyAccountScreen
