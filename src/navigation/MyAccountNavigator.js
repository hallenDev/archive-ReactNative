import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MyAccountScreen from '~/screens/members/MyAccountScreen'
import SettingsScreen from '~/screens/members/MyAccount/SettingsScreen'
import FriendsScreen from '~/screens/members/MyAccount/FriendsScreen'
import FavoritesScreen from '~/screens/members/MyAccount/FavoritesScreen'
import MatchesScreen from '~/screens/members/MyAccount/MatchesScreen'
import RequestsScreen from '~/screens/members/MyAccount/RequestsScreen'
import VoiceAnswerScreen, {
  options as VoiceAnswerScreenOptions,
} from '~/screens/members/MyAccount/VoiceAnswerScreen'
import LegelInfoScreen, {
  options as LegelInfoScreenOptions,
} from '~/screens/members/MyAccount/Settings/LegelInfoScreen'
import DisableProfileMenu, {
  options as DisableProfileMenuOptions,
} from '~/screens/members/MyAccount/Settings/DisableProfileMenu'
import ForgotYourPasswordScreen, {
  options as ForgotYourPasswordScreenOptions,
} from '~/screens/members/MyAccount/Settings/ForgotYourPasswordScreen'
import LocationScreen, {
  options as LocationScreenOptions,
} from '~/screens/members/LocationScreen'
import BlockedUsersScreen, {
  options as BlockedUsersScreenOptions,
} from '~/screens/members/MyAccount/Settings/BlockedUsersScreen'
import ChangeYourEmailScreen, {
  options as ChangeYourEmailScreenOptions,
} from '~/screens/members/MyAccount/Settings/ChangeYourEmailScreen'
import ChangeYourPasswordScreen, {
  options as ChangeYourPasswordScreenOptions,
} from '~/screens/members/MyAccount/Settings/ChangeYourPasswordScreen'
import ChangeYourPasswordSuccessScreen, {
  options as ChangeYourPasswordSuccessScreenOptions,
} from '~/screens/members/MyAccount/Settings/ChangeYourPasswordSuccessScreen'
import ResetYourPasswordSuccessScreen, {
  options as ResetYourPasswordSuccessScreenOptions,
} from '~/screens/members/MyAccount/Settings/ResetYourPasswordSuccessScreen'
import DeleteAccountScreen, {
  options as DeleteAccountScreenOptions,
} from '~/screens/members/MyAccount/Settings/DeleteAccountScreen'
import DisableProfileScreen, {
  options as DisableProfileScreenOptions,
} from '~/screens/members/MyAccount/Settings/DisableProfileScreen'
import SendFeedbackScreen, {
  options as SendFeedbackScreenOptions,
} from '~/screens/members/MyAccount/Settings/SendFeedbackScreen'
import VerifyProfileScreen, {
  options as VerifyProfileScreenOptions,
} from '~/screens/members/MyAccount/Settings/VerifyProfileScreen'

import PrivacyPolicyScreen, {
  options as PrivacyPolicyScreenOptions,
} from '~/screens/members/MyAccount/PrivacyPolicyScreen'
import TermsOfUseScreen, {
  options as TermsOfUseScreenOptions,
} from '~/screens/members/MyAccount/TermsOfUseScreen'
import ContactUsScreen, {
  options as ContactUsScreenOptions,
} from '~/screens/members/MyAccount/Settings/ContactUsScreen'
import EditMediaScreen from '~/screens/members/MyAccount/EditMediaScreen'
import EditProfileScreen from '~/screens/members/MyAccount/EditProfileScreen'
import NicknameScreen from '~/screens/members/MyAccount/EditProfile/NicknameScreen'
import BioScreen from '~/screens/members/MyAccount/EditProfile/BioScreen'
import InterestsScreen from '~/screens/members/MyAccount/EditProfile/InterestsScreen'
import QuestionsAnswersScreen from '~/screens/members/MyAccount/EditProfile/QuestionsAnswersScreen'

import { colors, typography } from '~/ui/theme'
import NotificationSettingsScreen, {
  options as NotificationSettingsScreenOptions,
} from '~/screens/members/MyAccount/Settings/NotificationSettingsScreen'
import AgeFiltersScreen from '~/screens/members/MyAccount/EditProfile/AgeFiltersScreen'

const MY_ACCOUNT_SCREEN_MAP = [
  ['MyAccountHome', MyAccountScreen],
  ['FriendsScreen', FriendsScreen],
  ['RequestsScreen', RequestsScreen],
  ['FavoritesScreen', FavoritesScreen],
  ['MatchesScreen', MatchesScreen],
  ['MyAccountSettingsScreen', SettingsScreen],
  ['EditProfile', EditProfileScreen],
  ['Nickname', NicknameScreen],
  ['Bio', BioScreen],
  ['Interests', InterestsScreen],
  ['AgeFilters', AgeFiltersScreen],
  ['QuestionsAnswers', QuestionsAnswersScreen],
  ['MyAccountVoiceAnswerScreen', VoiceAnswerScreen, VoiceAnswerScreenOptions],
  ['MyAccountLegalInfoScreen', LegelInfoScreen, LegelInfoScreenOptions],
  ['DisableProfileMenuScreen', DisableProfileMenu, DisableProfileMenuOptions],
  ['EditMedia', EditMediaScreen],
  [
    'MyAccountForgotYourPasswordScreen',
    ForgotYourPasswordScreen,
    ForgotYourPasswordScreenOptions,
  ],
  ['MyAccountLocationScreen', LocationScreen, LocationScreenOptions],
  [
    'MyAccountBlockedUsersScreen',
    BlockedUsersScreen,
    BlockedUsersScreenOptions,
  ],
  [
    'MyAccountChangeYourEmailScreen',
    ChangeYourEmailScreen,
    ChangeYourEmailScreenOptions,
  ],
  [
    'MyAccountChangeYourPasswordScreen',
    ChangeYourPasswordScreen,
    ChangeYourPasswordScreenOptions,
  ],
  [
    'MyAccountNotificationSettingsScreen',
    NotificationSettingsScreen,
    NotificationSettingsScreenOptions,
  ],
  [
    'MyAccountChangeYourPasswordSuccessScreen',
    ChangeYourPasswordSuccessScreen,
    ChangeYourPasswordSuccessScreenOptions,
  ],
  [
    'MyAccountResetYourPasswordSuccessScreen',
    ResetYourPasswordSuccessScreen,
    ResetYourPasswordSuccessScreenOptions,
  ],
  [
    'MyAccountDeleteAccountScreen',
    DeleteAccountScreen,
    DeleteAccountScreenOptions,
  ],
  [
    'MyAccountDisableProfileScreen',
    DisableProfileScreen,
    DisableProfileScreenOptions,
  ],
  [
    'MyAccountSendFeedbackScreen',
    SendFeedbackScreen,
    SendFeedbackScreenOptions,
  ],
  [
    'MyAccountVerifyProfileScreen',
    VerifyProfileScreen,
    VerifyProfileScreenOptions,
  ],
]

const MY_ACCOUNT_MODAL_MAP = [
  [
    'MyAccountPrivacyPolicyScreen',
    PrivacyPolicyScreen,
    PrivacyPolicyScreenOptions,
  ],
  ['MyAccountTermsOfServiceScreen', TermsOfUseScreen, TermsOfUseScreenOptions],
  ['MyAccountContactUsScreen', ContactUsScreen, ContactUsScreenOptions],
]

const MyAccountStack = createNativeStackNavigator()

export default function MyAccountNavigator() {
  return (
    <MyAccountStack.Navigator>
      <MyAccountStack.Group>
        {MY_ACCOUNT_SCREEN_MAP.map(([name, component, options]) => (
          <MyAccountStack.Screen
            key={name}
            name={name}
            component={component}
            options={component?.options || options}
          />
        ))}
      </MyAccountStack.Group>

      <MyAccountStack.Group
        screenOptions={{
          headerTitleStyle: {
            ...typography.subtitle2Semibold,
            color: colors.pureBlack,
          },
        }}
      >
        {MY_ACCOUNT_MODAL_MAP.map(([name, component, options]) => (
          <MyAccountStack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
      </MyAccountStack.Group>
    </MyAccountStack.Navigator>
  )
}
