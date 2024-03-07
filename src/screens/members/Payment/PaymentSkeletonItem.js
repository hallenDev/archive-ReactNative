import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { colors } from '~/ui/theme'

const size = Dimensions.get('window').width / 3

const PaymentSkeletonItem = () => (
  <View style={styles.skeletonItem} height={160} width={size - 20}>
    <ContentLoader backgroundColor={colors.bgBlack} opacity={0.15}>
      <Rect rx="10" ry="10" width={size - 20} height={160} />
    </ContentLoader>
  </View>
)

const styles = StyleSheet.create({
  skeletonItem: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    flex: 1,
    marginTop: 25,
  },
})

export default PaymentSkeletonItem
