import React from 'react'
import { StyleSheet, Keyboard, Platform } from 'react-native'
import { colors } from '~/ui/theme'
import { ActionSheet, ButtonTransparent } from '~/ui'
import SvgMoreVertical from '~/ui/icons/MoreVertical'

const HeaderRightMoreVertical = ({
  Component,
  duid = '',
  threadId = '',
  navigation,
}) => {
  const actionSheetRef = React.useRef()

  const handleSubmit = () => {
    navigation.goBack()
    actionSheetRef.current?.hide()
  }

  const handleCancel = () => {
    actionSheetRef.current?.hide()
  }

  const handleShow = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss()

      setTimeout(() => {
        actionSheetRef.current?.show()
      }, 500)
    } else {
      actionSheetRef.current?.show()
    }
  }

  return (
    <>
      <ButtonTransparent style={styles.container} onPress={handleShow}>
        <SvgMoreVertical width="24" height="24" color={colors.grey} />
      </ButtonTransparent>

      <ActionSheet ref={actionSheetRef}>
        <Component
          duid={duid}
          threadId={threadId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </ActionSheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
})

export default HeaderRightMoreVertical
