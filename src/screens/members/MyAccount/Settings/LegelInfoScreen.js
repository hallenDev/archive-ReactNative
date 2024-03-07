import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import MyAccountMenu from '~/components/MyAccount/MyAccountMenu'
import SvgFileText from '~/ui/icons/FileText'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import { colors } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'
import { LinearGradient } from '~/ui'
import SettingType from '~/shared/types/SettingType'

const getMenuItems = navigation => [
  {
    Icon: SvgFileText,
    title: SettingType.PRIVACY_POLICY,
    onPress: () => navigation.navigate('MyAccountPrivacyPolicyScreen'),
  },
  {
    Icon: SvgFileText,
    title: SettingType.TERM_OF_SERVICE,
    onPress: () => navigation.navigate('MyAccountTermsOfServiceScreen'),
  },
]

const LegalInfoScreen = props => {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <View style={styles.container}>
          <MyAccountMenu menu={getMenuItems(props?.navigation)} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginVertical: 20,
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Legal info"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default LegalInfoScreen
