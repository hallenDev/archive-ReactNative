import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import ActionSheet from 'react-native-actions-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '~/ui/theme'

const ANDROID_CONTROLS_HEIGHT = 30

const ActionSheetRaw = ({ children, containerStyle, ...props }, ref) => {
  const { bottom: marginBottom } = useSafeAreaInsets()

  return (
    <ActionSheet
      gestureEnabled
      {...props}
      ref={ref}
      indicatorColor={colors.primary}
      containerStyle={[styles.containerStyle, containerStyle ?? {}]}
    >
      <View
        style={styles.container(
          (Platform.OS === 'android' ? ANDROID_CONTROLS_HEIGHT : 0) +
            marginBottom,
        )}
      >
        {children}
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  container: marginBottom => ({
    marginTop: 10,
    marginBottom,
  }),
  containerStyle: {
    padding: 10,
    backgroundColor: colors.actionSheetBg,
  },
})

export default React.forwardRef(ActionSheetRaw)
