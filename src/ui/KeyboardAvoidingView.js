import React from 'react'
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native'
import globalStyle from '~/ui/globalStyle'

// ScrollView keyboardShouldPersistTaps="handled"
export default function KeyboardAvoidingViewUI({
  children,
  keyboardDismiss = true,
  ...props
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      {...props}
    >
      <Pressable
        style={globalStyle.flex}
        onPress={keyboardDismiss ? Keyboard.dismiss : () => {}}
      >
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  )
}
