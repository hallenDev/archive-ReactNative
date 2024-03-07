import React, { memo } from 'react'
import { View, Text } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import InterestMap from '~/shared/types/InterestMap'
import { createEmptyArray } from '~/utils/createEmptyArray'
import { colors } from '~/ui/theme'
import { profileInterestsStyles as styles } from '~/styles'

const SKELETON_LIST = createEmptyArray(3)

const ProfileInterests = ({ interests = [], isLoading = false }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Interests</Text>
    <View style={styles.interestsList}>
      {isLoading ? (
        <>
          {SKELETON_LIST.map((item, index) => (
            <View key={index} style={styles.containerSkeleton}>
              <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
                <Rect width="130" height="25" />
              </ContentLoader>
            </View>
          ))}
        </>
      ) : (
        <>
          {interests.map(item => (
            <View key={item} style={styles.item}>
              <Text style={styles.itemText}>{InterestMap[item]}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  </View>
)

export default memo(ProfileInterests)
