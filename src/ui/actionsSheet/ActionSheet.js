import React from 'react'
import { StyleSheet, View } from 'react-native'
import RNActionSheet from 'react-native-actions-sheet'

import { colors } from '~/ui/theme'

const ActionSheet = ({ children, containerStyle, ...props }, ref) => (
  <RNActionSheet
    gestureEnabled={true}
    {...props}
    ref={ref}
    indicatorColor={colors.primary}
    containerStyle={[styles.containerStyle, containerStyle ?? {}]}
  >
    <View style={styles.container}>{children}</View>
  </RNActionSheet>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
  containerStyle: {
    padding: 20,
    backgroundColor: colors.actionSheetBg,
  },
})

export default React.forwardRef(ActionSheet)
