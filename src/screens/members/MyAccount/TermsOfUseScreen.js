import React from 'react'
import { SafeAreaView } from 'react-native'
import { TermsOfUse } from '~/components'
import { LinearGradient } from '~/ui'
import SettingType from '~/shared/types/SettingType'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'

const TermsOfUseScreen = () => (
  <SafeAreaView
    edges={['bottom']}
    style={[globalStyle.flex, { backgroundColor: '#100526' }]}
  >
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <TermsOfUse />
    </LinearGradient>
  </SafeAreaView>
)

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title={SettingType.TERM_OF_SERVICE}
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default TermsOfUseScreen
