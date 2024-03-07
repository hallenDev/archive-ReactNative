import React from 'react'
import { StyleSheet, Text } from 'react-native'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import FriendsList from '~/components/friends/friends-list'
import TitleHeaderWithBackAndRightBtn from '~/ui/header/TitleHeaderWithBackAndRightBtn'
import PressableHighlight from '~/ui/PressableHighlight'
import { typography, colors } from '~/ui/theme'

const FriendsScreen = () => {
  return (
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <FriendsList />
      <ReportSuccessModal />
    </LinearGradient>
  )
}

FriendsScreen.options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBackAndRightBtn
      title="Friends"
      rightButtonComponent={
        <PressableHighlight
          style={styles.rightButton}
          onPress={() => navigation.navigate('RequestsScreen')}
        >
          <Text style={styles.rightButtonText}>Requests</Text>
        </PressableHighlight>
      }
    />
  ),
})

const styles = StyleSheet.create({
  rightButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  rightButtonText: {
    ...typography.p2,
    color: colors.primary,
  },
})

export default FriendsScreen
