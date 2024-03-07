import React from 'react'
import { StyleSheet, View } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { colors } from '~/ui/theme'
import { cardSize } from './UserCard'

const MatchSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
          <Rect width={cardSize.width} height={cardSize.height} />
        </ContentLoader>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerCard: {
    width: cardSize.width,
    height: cardSize.height,
    borderRadius: 3,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
})

export default MatchSkeleton
