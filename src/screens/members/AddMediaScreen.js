import React from 'react'
import { View } from 'react-native'
import useSetHeader from '~/hooks/useSetHeader'
import AddMedia from '~/components/AddMedia/AddMedia'
import { MainHeader } from '~/ui'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import HeaderTitle from '~/components/HeaderTitle'

const AddMediaScreen = ({ navigation, route }) => {
  useSetHeader(
    <MainHeader
      CenterComponent={() => <HeaderTitle title="Add Media" isMainTitle />}
      withBackBtn
    />,
    [route.name],
  )

  return (
    <View style={globalStyle.flex}>
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <AddMedia navigation={navigation} />
      </LinearGradient>
    </View>
  )
}

AddMediaScreen.options = () => ({
  tabBarLabel: 'Add Media',
})

export default AddMediaScreen
