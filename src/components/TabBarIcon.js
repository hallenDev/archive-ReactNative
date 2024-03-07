import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '~/ui/theme'

const TabBarIcon = ({
  Icon,
  ActiveIcon,
  size,
  focused,
  color,
  isMatch = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        isMatch && styles.match,
        focused && styles.active,
      ]}
    >
      {focused && ActiveIcon ? (
        <ActiveIcon
          width={size + 2}
          height={size + 2}
          fill="none"
          color={color}
        />
      ) : (
        <Icon width={size} height={size} fill="none" color={color} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  match: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E8E9EA',
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
})

export default TabBarIcon
