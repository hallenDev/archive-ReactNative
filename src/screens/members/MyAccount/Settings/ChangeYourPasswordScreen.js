import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import useSetHeader from '~/hooks/useSetHeader'
import ChangeYourPassword from '~/components/Settings/ChangeYourPassword'
import { MainHeader, KeyboardAvoidingView } from '~/ui'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import HeaderTitle from '~/components/HeaderTitle'

const ChangeYourPasswordScreen = () => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Change Your Password" />}
    />,
    [],
  )

  return (
    <SafeAreaView edges={['bottom']} style={globalStyle.flex}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
          <ChangeYourPassword />
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default ChangeYourPasswordScreen
