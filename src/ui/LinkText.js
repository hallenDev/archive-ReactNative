import React from 'react'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import noop from '~/utils/noop'

const LinkText = ({ style, onPress = noop, children }) => {
  const theme = useTheme()

  return (
    <TouchableHighlight
      style={style}
      onPress={onPress}
      underlayColor="transparent"
    >
      <Text
        style={[styles(theme).hyperlink, style.color && { color: style.color }]}
      >
        {children}
      </Text>
    </TouchableHighlight>
  )
}

const styles = theme =>
  StyleSheet.create({
    hyperlink: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.goodBlue,
    },
  })

export default LinkText
