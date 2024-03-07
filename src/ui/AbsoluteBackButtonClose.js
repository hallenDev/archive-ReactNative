import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'
import SvgClose from '~/ui/icons/Close'

const AbsoluteBackButtonClose = ({ closeAction, safeArea }) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const action = () => {
    if (closeAction) return closeAction()

    navigation?.goBack()
  }

  return (
    <Pressable
      onPress={action}
      style={[styles.container, safeArea && { top: insets.top }]}
    >
      <HeaderBackButton
        onPress={action}
        backImage={() => <SvgClose width="24" height="24" color="#FFFFFF" />}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 20,
    right: 20,
  },
})

export default AbsoluteBackButtonClose
