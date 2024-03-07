import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HEADER_HEIGHT } from '~/configs/constants'
import BackgroundGradient from '~/ui/background-gradient'

const Container = ({ children, tapBar = true, header = true, style = {} }) => {
  const insets = useSafeAreaInsets()

  return (
    <BackgroundGradient>
      <View
        style={[
          { flex: 1, flexGrow: 1 },
          !header && { marginTop: insets.top },
          tapBar && { marginBottom: HEADER_HEIGHT - 6 },
        ]}
      >
        <View style={[styles.container, style]}>{children}</View>
      </View>
    </BackgroundGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
})

export default Container
