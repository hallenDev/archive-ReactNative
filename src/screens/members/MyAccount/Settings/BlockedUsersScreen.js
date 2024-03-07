import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useQueryClient, useInfiniteQuery, useMutation } from 'react-query'
import { fetchBlock, removeBlock } from '~/shared/api/members'
import Image from '~/ui/Image'
import { colors, typography } from '~/ui/theme'
import getLocationText from '~/utils/getLocationText'
import SvgLocationFill from '~/ui/icons/LocationFill'
import Placeholder from '~/ui/Placeholder'
import globalStyle from '~/ui/globalStyle'
import EmptyBlockedUsers from '~/components/MyAccount/EmptyBlockedUsers'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import LinearGradient from '~/ui/LinearGradient'
import ConfirmModal from '~/components/Modals/ConfirmModal'

const BlockedUsersScreen = ({ navigation }) => {
  const {
    data = {},
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'block',
    ({ pageParam = 1 }) => fetchBlock({ page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.total_pages > lastPage?.current_page) {
          return parseInt(lastPage?.current_page, 10) + 1
        }

        return undefined
      },
    },
  )

  const totalResults = data?.pages?.[0]?.total_results

  const blocked = data?.pages?.reduce((acc, current) => {
    const newResult = Object.values(current?.blocked_users || {}) || []
    return [...acc, ...newResult]
  }, [])

  if (blocked) {
  }

  React.useEffect(() => {
    navigation.setOptions(
      options({
        route: { params: { count: totalResults } },
        navigation,
      }),
    )
  }, [navigation, totalResults])

  const handleEndReached = () => {
    // if (hasNextPage && !isFetching && !isFetchingNextPage) {
    //   fetchNextPage()
    // }
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <View style={styles.main}>
          {isLoading ? (
            <Placeholder large />
          ) : (
            <>
              {blocked?.length > 0 ? (
                <FlatList
                  data={blocked}
                  onEndReached={handleEndReached}
                  onEndReachedThreshold={0.3}
                  renderItem={({ item }) => <BlockUserItem {...item} />}
                  keyExtractor={item => item.duid}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  ListHeaderComponent={<View style={styles.separatorLarge} />}
                  ListFooterComponent={
                    isFetching ? (
                      <Placeholder />
                    ) : (
                      <View style={styles.separatorLarge} />
                    )
                  }
                  indicatorStyle="white"
                />
              ) : (
                <EmptyBlockedUsers />
              )}
            </>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const BlockUserItem = ({ duid = '', pic = '', username = '', ...rest }) => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation('blockRemove', removeBlock, {
    onSuccess: () => {
      toggleConfirmModal()
      queryClient.invalidateQueries('block')
    },
  })

  const toggleConfirmModal = () => setIsOpenConfirmModal(s => !s)

  const handleUnblock = () => mutate({ blockDuid: duid })

  const location = getLocationText(rest)

  return (
    <>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Image source={{ uri: pic }} style={styles.image} />
        </View>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.location}>
              <SvgLocationFill
                width="12"
                height="12"
                color={colors.orangeButton}
              />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={toggleConfirmModal}>
            <Text style={styles.buttonText}>Unblock</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isOpenConfirmModal && (
        <ConfirmModal
          modalVisible={isOpenConfirmModal}
          onCancel={toggleConfirmModal}
          onApprove={handleUnblock}
          description="Unblock this User?"
          approveLoading={isLoading}
          approveText="Unblock"
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  item: {
    backgroundColor: colors.whiteBg,
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    ...typography.bodyBold14,
    color: colors.textSub,

    marginBottom: 7,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...typography.bodyRegular10,
    color: colors.textSub,

    marginLeft: 4,
  },
  button: {
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.bodyMedium12,
    color: colors.primary,
  },
  separator: {
    height: 12,
  },
  separatorLarge: {
    height: 20,
  },
  emptyView: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 200,
  },
  actionSheetTitle: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
  actionSheetButton: {
    color: colors.white,
  },
})

export const options = ({ route, navigation }) => {
  const count = route?.params?.count || 0
  const title = 'Blocked users' + (count ? ` (${count})` : '')

  return {
    header: () => (
      <TitleHeaderWithBack
        title={title}
        backAction={() => {
          navigation.pop()
        }}
      />
    ),
  }
}

export default BlockedUsersScreen
