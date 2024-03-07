import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from '~/ui/LinearGradient'
import { colors } from '~/ui/theme'

const CircleButton = ({
  Icon,
  buttonStyle,
  iconStyle,
  textStyle,
  title,
  width = 20,
  height = 20,
  isPrimary = false,
  disabled = false,
  onPress,
  onPressIn,
  onPressOut,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && { opacity: 0.3 }]}
      disabled={disabled}
      opa
      onPress={onPress}
      onPressIn={onPressIn && onPressIn}
      onPressOut={onPressOut && onPressOut}
    >
      {isPrimary ? (
        <LinearGradient
          colors={colors.primaryGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.btn, buttonStyle, isPrimary && styles.primary]}
        >
          <View style={styles.primary}>
            <Icon
              width={width}
              height={height}
              style={[styles.svg, iconStyle]}
            />
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.btn, buttonStyle]}>
          <Icon width={width} height={height} style={[styles.svg, iconStyle]} />
        </View>
      )}

      {title && <Text style={[styles.title, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    color: colors.white,
  },
  title: {
    color: colors.butonSubText,
    fontSize: 11,
    marginTop: 3,
    textAlign: 'center',
  },
  primary: {
    shadowColor: 'rgba(247, 62, 143, 1)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})

export default CircleButton
