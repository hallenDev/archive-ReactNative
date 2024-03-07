import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors, typography } from '~/ui/theme'

const UserInactive = () => (
  <View style={styles.container}>
    <Text style={styles.question}>Sorry, this profile is not active</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  question: {
    ...typography.p1,
    color: colors.textMain,
    marginBottom: 10,
  },
})

export default UserInactive
