import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import MyAccountMenu from '~/components/MyAccount/MyAccountMenu'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import { colors } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'
import { LinearGradient } from '~/ui'
import SettingType from '~/shared/types/SettingType'
import { CloseCircle, Trash } from '~/ui/icons'

const getMenuItems = navigation => [
  {
    Icon: CloseCircle,
    title: SettingType.DISABLE_PROFILE,
    onPress: () => navigation.navigate('MyAccountDisableProfileScreen'),
  },
  {
    Icon: Trash,
    title: SettingType.DELETE_ACCOUNT,
    onPress: () => navigation.navigate('MyAccountDeleteAccountScreen'),
  },
]

const DisableProfileMenu = props => {
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
      title={SettingType.DISABLE_PROFILE}
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default DisableProfileMenu
