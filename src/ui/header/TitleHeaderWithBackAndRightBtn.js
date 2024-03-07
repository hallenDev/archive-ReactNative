import React from 'react'
import { StyleSheet, NativeModules } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { HEADER_HEIGHT } from '~/configs/constants'
import { colors } from '~/ui/theme'
import { Header } from '~/ui'
import { BackButton } from '~/components'
import HeaderTitle from '~/components/HeaderTitle'

const TitleHeaderWithBackAndRightBtn = ({
  title = '',
  rightButtonComponent = null,
}) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        leftComponent={<BackButton onPress={navigation.goBack} />}
        centerComponent={<HeaderTitle title={title} />}
        rightComponent={rightButtonComponent}
        shadow={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGradient[0],
    borderBottomColor: colors.darkViolet,
    borderBottomWidth: 1,
    height: NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 5,

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default TitleHeaderWithBackAndRightBtn
