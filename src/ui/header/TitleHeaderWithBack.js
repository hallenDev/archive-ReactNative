import React from 'react'
import { StyleSheet, NativeModules } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HEADER_HEIGHT } from '~/configs/constants'
import { colors } from '~/ui/theme'
import { Header } from '~/ui'
import { BackButton } from '~/components'
import HeaderTitle from '~/components/HeaderTitle'

const TitleHeaderWithBack = ({ title = '', backAction }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        leftComponent={
          backAction ? <BackButton onPress={backAction} /> : undefined
        }
        centerComponent={<HeaderTitle title={title} />}
        shadow={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.header,
    borderBottomColor: colors.headerBorder,
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
})

export default TitleHeaderWithBack
