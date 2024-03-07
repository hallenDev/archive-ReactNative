import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { colors } from '~/ui/theme'

const itemSize = (Dimensions.get('window').width - 40 - 20) / 3

const MatchesSkeletonItem = () => (
  <View style={styles.skeletonItem} height={itemSize}>
    <ContentLoader backgroundColor={colors.bgBlack} opacity={0.15}>
      <Rect rx="10" ry="10" width={itemSize} height={itemSize} />
    </ContentLoader>
  </View>
)

const styles = StyleSheet.create({
  skeletonItem: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
  },
})

export default MatchesSkeletonItem
