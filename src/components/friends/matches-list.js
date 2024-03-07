import React from 'react'
import { StyleSheet, FlatList, View, Image, Dimensions } from 'react-native'
import { useQueryClient, useQuery } from 'react-query'
import { useNavigation } from '@react-navigation/native'

import { useUser } from '~/context/UserContext'
import { fetchQueueMatches, fetchLikedMe } from '~/shared/api'
import { MatchesType } from './types'
import FriendEmptyList from './ui/friend-empty-list'
import MatchesTab from './ui/matches-tab'
import LikedMeLocked from './ui/liked-me-locked'
import PressableHighlight from '~/ui/PressableHighlight'
import useSpendCredits from '~/hooks/useSpendCredits'
import { colors } from '~/ui/theme'
import SvgUserClosed from '~/ui/icons/UserClosed'
import FastImage from 'react-native-fast-image'
import MatchesSkeletonItem from './MatchesSkeletonItem'
import { createEmptyArray } from '~/utils/createEmptyArray'

const SKELETON_LIST = createEmptyArray(15)

const renderItem = ({ item }) => {
  if (item.empty) {
    return <View style={[styles.image, { backgroundColor: 'transparent' }]} />
  }

  const WrapperComponent = () => {
    const navigation = useNavigation()
    const handlePress = () =>
      navigation.navigate('UserProfileScreen', { duid: item.duid })
    return (
      <PressableHighlight onPress={handlePress}>
        {item?.profilePic ? (
          <FastImage source={{ uri: item?.profilePic }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.lock]}>
            <SvgUserClosed />
          </View>
        )}
      </PressableHighlight>
    )
  }
  return <WrapperComponent />
}

const getEmptyTotalListForThreeColumns = (total = 0) => {
  const lenghtEmptyArray = total > 21 ? 21 : total
  return new Array(lenghtEmptyArray).fill({})
}

const MatchesList = () => {
  const {
    user: { duid },
  } = useUser()
  const [type, setType] = React.useState(0)
  const isMatchesTab = type === 0

  const { data: dataMatches, isLoading: isLoadingMatches } = useQuery(
    MatchesType.MATCHES,
    fetchQueueMatches,
    {
      enabled: isMatchesTab,
    },
  )

  const { data: dataLiked, isLoading: isLoadingLiked } = useQuery(
    MatchesType.LIKED,
    fetchLikedMe,
    {
      enabled: !isMatchesTab,
    },
  )

  const queryClient = useQueryClient()
  const onSpendCredits = useSpendCredits()

  const handleApprove = () => {
    onSpendCredits(duid, 'unlock_liked_me_users', () =>
      queryClient.invalidateQueries(MatchesType.LIKED),
    )
  }

  const isLikedMeLocked = dataLiked?.total > 0 && dataLiked?.featureLocked
  const data = isMatchesTab
    ? dataMatches
    : isLikedMeLocked
    ? getEmptyTotalListForThreeColumns(dataLiked?.total)
    : dataLiked?.likedMe

  const isLoading = isMatchesTab ? isLoadingMatches : isLoadingLiked

  const dataColumns = data?.length % 3 === 2 ? [...data, { empty: true }] : data

  return (
    <>
      <MatchesTab onChange={setType} value={type} />
      {isLoading ? (
        <FlatList
          data={SKELETON_LIST}
          numColumns={3}
          keyExtractor={(item, index) => index}
          renderItem={() => <MatchesSkeletonItem />}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={!isLoading && FriendEmptyList}
          ListFooterComponent={<View style={styles.footer} />}
        />
      ) : (
        <FlatList
          data={dataColumns}
          numColumns={3}
          keyExtractor={(item, index) => item?.duid || index}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          // onEndReached={fetchNextPageAction}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={!isLoading && FriendEmptyList}
          ListFooterComponent={<View style={styles.footer} />}
          indicatorStyle="white"
        />
      )}
      {isLikedMeLocked && !isMatchesTab && (
        <LikedMeLocked onPress={handleApprove} />
      )}
    </>
  )
}

// Unlock to view all

const imageSize = (Dimensions.get('window').width - 40 - 20) / 3

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  separator: {
    height: 10,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
    backgroundColor: colors.semiBlack25,
  },
  lock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: 20,
  },
})

export default MatchesList
