import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeAreaViewComponent = ({ style, children, ...props }) => {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      {...props}
      style={[
        !insets.bottom && styles.container,
        ...(Array.isArray(style) ? style : [style]),
      ]}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
})

export default SafeAreaViewComponent
