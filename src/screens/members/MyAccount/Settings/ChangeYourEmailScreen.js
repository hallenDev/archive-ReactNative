import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import useSetHeader from '~/hooks/useSetHeader'
import ChangeYourEmail from '~/components/Settings/ChangeYourEmail'
import { MainHeader, KeyboardAvoidingView } from '~/ui'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import HeaderTitle from '~/components/HeaderTitle'

const ChangeYourEmailScreen = () => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Change Your Email" />}
    />,
    [],
  )

  return (
    <SafeAreaView edges={['bottom']} style={globalStyle.flex}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
          <ChangeYourEmail />
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

export default ChangeYourEmailScreen
