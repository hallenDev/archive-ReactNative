import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { typography, colors } from '~/ui/theme'

export default function FriendEmptyList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>There are no users yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.p1,
    color: colors.textMain,
  },
})
