import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '~/ui/theme'

const AlertBox = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'stretch',
    backgroundColor: colors.black,
    marginHorizontal: 20,
    padding: 40,
    borderRadius: 15,
  },
})

export default AlertBox
