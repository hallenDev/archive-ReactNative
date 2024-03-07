import React from 'react'
import { SafeAreaView } from 'react-native'
import { PrivacyPolicy } from '~/components'
import { LinearGradient } from '~/ui'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'

const PrivacyPolicyScreen = () => (
  <SafeAreaView
    edges={['bottom']}
    style={[globalStyle.flex, { backgroundColor: '#100526' }]}
  >
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <PrivacyPolicy />
    </LinearGradient>
  </SafeAreaView>
)

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Privacy Policy"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default PrivacyPolicyScreen
