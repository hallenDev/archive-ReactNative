import React from 'react'
import { StyleSheet, View } from 'react-native'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { colors } from '~/ui/theme'

const SkeletonListItem = ({ isOnlyName = false }) => {
  return (
    <View style={styles.container}>
      <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
        <Circle cx="20" cy="25" r="20" />
        <Rect
          x="50"
          y={isOnlyName ? 20 : 10}
          rx="4"
          ry="4"
          width="150"
          height="13"
        />
        {!isOnlyName && (
          <Rect x="50" y="30" rx="3" ry="3" width="250" height="10" />
        )}
      </ContentLoader>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
})

export default SkeletonListItem
