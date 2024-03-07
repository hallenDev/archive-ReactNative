import React from 'react'
import { View, Platform } from 'react-native'

function ViewMeasure({ children, ...props }, ref) {
  const collapsable = Platform.OS === 'ios' ? true : false
  return (
    <View ref={ref} collapsable={collapsable} {...props}>
      {children}
    </View>
  )
}

export default React.forwardRef(ViewMeasure)
