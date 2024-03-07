import React from 'react'
import { View } from 'react-native'
import { UploadGuidelines } from '~/components'
import { MainHeader } from '~/ui'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import useSetHeader from '~/hooks/useSetHeader'
import HeaderTitle from '~/components/HeaderTitle'

const UploadGuidelinesScreen = () => {
  useSetHeader(
    <MainHeader
      CenterComponent={() => <HeaderTitle title="Upload Guidelines" />}
      withBackBtn
    />,
  )

  return (
    <View style={globalStyle.flex}>
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <UploadGuidelines />
      </LinearGradient>
    </View>
  )
}

export default UploadGuidelinesScreen
