import React from 'react'
import { StyleSheet, NativeModules, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HEADER_HEIGHT } from '~/configs/constants'
import { typography, colors } from '~/ui/theme'

const TitleHeader = ({ title = '' }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGradient[0],
    borderBottomColor: colors.darkViolet,
    borderBottomWidth: 1,
    height: NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: 5,

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  content: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.white,
  },
})

export default TitleHeader
