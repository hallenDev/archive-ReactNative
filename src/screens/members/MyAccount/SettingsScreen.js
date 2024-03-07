import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import useProfile from '~/hooks/useProfile'
import MyAccountMenu from '~/components/MyAccount/MyAccountMenu'
import { MyAccountWarningMenu } from '~/components/MyAccount/MyAccountMenu'
import getLocationText from '~/utils/getLocationText'
import useLogout from '~/hooks/useLogout'
import { colors } from '~/ui/theme'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import SettingType from '~/shared/types/SettingType'
import {
  Ban,
  TwoHearts,
  CloseCircle,
  Email,
  Info,
  LocationMarker,
  LockClosed,
  Logout,
  VerifiedGray,
} from '~/ui/icons'
import { ActionSheet } from '~/ui'
import ActionSheetSubmitWithCancel from '~/ui/actionsSheet/ActionSheetSubmitWithCancel'
import DeviceInfo from '~/services/DeviceInfo'
import SvgBell from '~/ui/icons/Bell'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { showNotificationError } from '../../../services/in-app-notifications'
import { checkFacePic } from '../../../shared/api/members'

const mainMenuItems = ({ navigation, user }) =>
  [
    !user?.isVerified
      ? {
          Icon: VerifiedGray,
          title: SettingType.VERIFY_YOUR_PROFILE,
          description: SettingType.VERIFY_YOUR_PROFILE_DESC,
          onPress: async () => {
            const response = await checkFacePic()
            if (response.hasFacePic) {
              navigation.navigate('MyAccountVerifyProfileScreen')
            } else {
              showNotificationError({
                message:
                  'You must have a public face photo before you can verify your account',
              })
            }
          },
        }
      : null,
    {
      Icon: Email,
      title: SettingType.EMAIL,
      description: SettingType.CHANGE_EMAIL,
      onPress: () => navigation.navigate('MyAccountChangeYourEmailScreen'),
    },
    {
      Icon: LockClosed,
      title: SettingType.PASSWORD,
      description: SettingType.CHANGE_PASSWORD,
      onPress: () => navigation.navigate('MyAccountChangeYourPasswordScreen'),
    },
    {
      Icon: SvgBell,
      title: SettingType.NOTIFICATION_SETTINGS,
      description: SettingType.NOTIFICATION_SETTINGS_DESC,
      onPress: () => navigation.navigate('MyAccountNotificationSettingsScreen'),
    },
    {
      Icon: LocationMarker,
      title: SettingType.LOCATION,
      description: getLocationText({ ...user?.location, ...user }),
      onPress: () => navigation.navigate('MyAccountLocationScreen'),
    },
    {
      Icon: Ban,
      title: SettingType.BLOCKED_USERS,
      description: SettingType.MANAGE_BLOCKED_LIST,
      onPress: () => navigation.navigate('MyAccountBlockedUsersScreen'),
    },
    {
      Icon: Email,
      title: SettingType.HELP_CONTACT_US,
      description: SettingType.HELP_AND_SUPPORT,
      onPress: () => navigation.navigate('MyAccountContactUsScreen'),
    },
    {
      Icon: Info,
      title: SettingType.LEGAL_INFO,
      description: SettingType.LEGAL_INFORMATION,
      onPress: () => navigation.navigate('MyAccountLegalInfoScreen'),
    },
    {
      Icon: TwoHearts,
      title: SettingType.SEND_FEEDBACK,
      description: SettingType.SHARE_FEEDBACK,
      onPress: () => navigation.navigate('MyAccountSendFeedbackScreen'),
    },
    {
      Icon: CloseCircle,
      title: SettingType.DISABLE_PROFILE,
      description: SettingType.DISABLE_PROFILE_DESC,
      onPress: () => navigation.navigate('DisableProfileMenuScreen'),
    },
  ].filter(elem => !!elem)

const subMenuItems = ({ logOut }) => [
  {
    Icon: Logout,
    title: SettingType.LOGOUT,
    onPress: () => logOut(),
  },
]

const SettingsScreen = ({ navigation }) => {
  const { data } = useProfile()
  const { mutate: handleLogoutMutate } = useLogout()

  const actionSheetRef = React.useRef()

  const logOut = () => {
    actionSheetRef.current.show()
  }

  const handleCancel = () => {
    actionSheetRef.current?.hide()
  }

  const handleLogout = async () => {
    const deviceid = await DeviceInfo.getUniqueId()
    handleLogoutMutate({ deviceid })
  }

  return (
    <SafeAreaView edges={['bottom']} style={globalStyle.flex}>
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <CustomScrollbar contentContainerStyle={styles.container}>
          <MyAccountMenu
            withCreditBtn
            menu={mainMenuItems({ navigation, user: data, logOut })}
          />
          <MyAccountWarningMenu menu={subMenuItems({ logOut })} />
        </CustomScrollbar>
      </LinearGradient>

      <ActionSheet ref={actionSheetRef}>
        <ActionSheetSubmitWithCancel
          title="Log out?"
          submitText="Log Out"
          cancelText="No, go back"
          titleStyle={styles.actionSheetTitle}
          buttonStyle={styles.actionSheetButton}
          onSubmitPress={handleLogout}
          onCancelPress={handleCancel}
        />
      </ActionSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 6,
    paddingBottom: 50,
  },
  actionSheetTitle: {
    color: colors.textMain,
    fontSize: 20,
    textAlign: 'center',
  },
  actionSheetButton: {
    color: colors.textSub,
  },
})

SettingsScreen.options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Settings"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default SettingsScreen
