import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import FriendsList from '~/components/friends/friends-list'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import RequestsTab from '~/components/friends/requests-tab'
import { FriendsType } from '~/components/friends/types'
import { colors } from '~/ui/theme'

const RequestsScreen = ({ navigation }) => {
  return (
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <RequestsTab>
        <FriendsList type={FriendsType.REQUEST} />
        <FriendsList type={FriendsType.PENDING} />
      </RequestsTab>
    </LinearGradient>
  )
}

RequestsScreen.options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Requests"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

const styles = StyleSheet.create({
  tab: {
    marginTop: 16,
    marginBottom: 14,
    marginHorizontal: 20,
  },
})

export default RequestsScreen
