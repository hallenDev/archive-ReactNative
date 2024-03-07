import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { colors } from '~/ui/theme'

const width = Dimensions.get('window').width
const WIDTH_ITEM = (width - 12 - 16 * 2) / 2

const SkeletonItem = () => {
  return (
    <View style={styles.skeletonItem} height={WIDTH_ITEM}>
      <ContentLoader backgroundColor={colors.bgBlack} opacity={0.15}>
        <Rect rx="5" ry="5" width={WIDTH_ITEM} height={WIDTH_ITEM} />
      </ContentLoader>
    </View>
  )
}

const styles = StyleSheet.create({
  skeletonItem: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 5,
    flex: 0.5,
  },
})

export default SkeletonItem
