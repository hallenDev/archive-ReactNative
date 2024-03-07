import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import MasonryList from '@react-native-seoul/masonry-list'
import { getRandomArbitrary } from '~/utils/getRandomArbitrary'
import { createEmptyArray } from '~/utils/createEmptyArray'
import { colors } from '~/ui/theme'

const WIDTH_ITEM = Dimensions.get('window').width / 2
const SKELETON_LIST = createEmptyArray(6)
const HORIZONTAL_MARGIN = 20

const SkeletonItem = () => {
  const hight = WIDTH_ITEM * getRandomArbitrary(1, 2)

  return (
    <View style={styles.skeletonItem} height={hight}>
      <ContentLoader backgroundColor={colors.bgBlack} opacity={0.15}>
        <Rect
          rx="5"
          ry="5"
          width={WIDTH_ITEM - HORIZONTAL_MARGIN}
          height={hight}
        />
      </ContentLoader>
    </View>
  )
}

const TrendingListSkeleton = () => (
  <MasonryList
    data={SKELETON_LIST}
    numColumns={2}
    renderItem={SkeletonItem}
    removeClippedSubviews={true}
  />
)

const styles = StyleSheet.create({
  skeletonItem: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 5,
    flex: 0.5,
  },
})

export default TrendingListSkeleton
