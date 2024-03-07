import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, NativeModules, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HEADER_HEIGHT } from '~/configs/constants'
import { BlurHeaderContext } from '~/context/BlurHeaderProvider'
import PressableHighlight from '~/ui/PressableHighlight'
import { Logo } from '~/ui/icons'
import { ShevronLeftLarge } from '../icons'
import { colors } from '~/ui/theme'
import { BackButton } from '~/components'

const TIME_CLOSE_KEYBOARD = 500

const MainHeader = ({
  LeftComponent,
  CenterComponent,
  RightComponent,
  withBackBtn,
  withLogo,
  parentNavigation,
}) => {
  const [showKeyboard, setShowKeyboard] = useState(false)

  const { isBlurHeader } = useContext(BlurHeaderContext)

  const navigation = useNavigation()

  const handleGoBack = () => {
    const nav = parentNavigation ?? navigation
    if (showKeyboard) {
      Keyboard.dismiss()

      setTimeout(() => {
        nav.goBack()
      }, TIME_CLOSE_KEYBOARD)
    } else {
      nav.goBack()
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowKeyboard(true)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false)
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {isBlurHeader && <View style={styles.blur} />}
      <View style={styles.content}>
        {withBackBtn ? (
          <View style={styles.left}>
            <BackButton onPress={handleGoBack} />
          </View>
        ) : !!LeftComponent ? (
          <LeftComponent />
        ) : (
          <View style={styles.empty} />
        )}
        {withLogo ? (
          <Logo width="140" height="30" />
        ) : CenterComponent ? (
          <CenterComponent />
        ) : null}
        {RightComponent ? <RightComponent /> : <View style={styles.empty} />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgHeader,
    borderBottomColor: colors.semiBlack25,
    borderBottomWidth: 1,
    height: NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT,
    position: 'relative',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    width: 36,
    height: 36,
  },
  blur: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: colors.semiBlack50,
    height: NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT,
    zIndex: 1,
    width: '100%',
  },
})

export default MainHeader
