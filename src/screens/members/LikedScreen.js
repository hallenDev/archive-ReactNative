import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import useSetHeader from '~/hooks/useSetHeader'
import LikedList from '~/components/LikedList/LikedList'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import { MainHeader } from '~/ui'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import HeaderTitle from '~/components/HeaderTitle'

const LikedScreen = ({ route }) => {
  const postId = route?.params?.postId

  useSetHeader(
    <MainHeader
      CenterComponent={() => <HeaderTitle title={route.name} />}
      withBackBtn
    />,
    [route.name],
  )

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, styles.container]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <LikedList postId={postId} />
        <ReportSuccessModal />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export const options = () => ({
  tabBarLabel: 'Liked',
  tabBarButton: () => null,
})

export default LikedScreen
