import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { colors } from '~/ui/theme'

const Placeholder = ({ isWhite = false, large = false, style }) => {
  const size = large ? 'large' : 'small'

  return (
    <View style={[large ? styles.large : styles.small, style]}>
      <ActivityIndicator
        size={size}
        color={isWhite ? colors.white : colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  large: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Placeholder
