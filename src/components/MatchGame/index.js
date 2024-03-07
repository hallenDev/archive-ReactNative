import React, { useCallback, useState, useRef, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useQuery, useMutation } from 'react-query'
import { useIsFocused } from '@react-navigation/native'
import { throttle, uniqueId } from 'lodash'

import { fetchQueuePlay, voteQueue } from '~/shared/api/members'
import useGetDefaultFilterParams from '~/hooks/useGetDefaultFilterParams'
import useFavorite from '~/hooks/useFavorite'
import { useSearchFilter } from '~/context/SearchFilterContext'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import MatchModal from '~/components/Modals/MatchModal'
import BackgroundGradient from '~/ui/background-gradient'

import FreeDailySwipes from '~/components/match/free-daily-swipes'
import UserCard from './UserCard'
import Swiper from './Swiper'
import Empty from './Empty'

import { colors, typography } from '~/ui/theme'

import { Heart, Dislike } from '~/ui/icons/Solid'
import MatchSkeleton from './MatchSkeleton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CircleButton from './CircleButton'
import { Shuffle, Dislike as Unlike, Like, Favorite } from '~/ui/icons'

const THROTTLE_WAIT = 500

const outputRotationRange = ['-30deg', '0deg', '30deg']

const showMatchOver = (arr, setIsMatchOver) => {
  if (Array.isArray(arr) && arr.includes('limit_reached')) {
    setIsMatchOver(true)
  }
}

const MatchGame = ({ onLoading }) => {
  const { matchFilter, changeMatchFilter } = useSearchFilter()
  const { bottom } = useSafeAreaInsets()

  const swiperRef = useRef(null)

  const [emptyQueue, setEmptyQueue] = useState(null)
  const [match, setMatch] = useState(null)
  const [isMatchOver, setIsMatchOver] = useState(false)
  const [isFreeDailySwipes, setIsFreeDailySwipes] = useState(false)
  const [curUser, setCurUser] = useState(false)

  const { mutate: onAddFavorite } = useFavorite({ isMatchPage: true })

  const { mutate: voteAction } = useMutation(voteQueue, {
    onSuccess: (resp, variables) => {
      if (resp && resp.mutual_match) {
        const findUser = swiperRef.current
          .getCards()
          .find(user => user.duid === variables.duid)

        if (findUser) {
          setMatch(findUser)
        }
      }
    },
    onError: error => {
      showMatchOver(error?.data?.errors, setIsMatchOver)
    },
  })

  const { data, isLoading, isFetched, error, isError, refetch } = useQuery(
    ['queuePlay', matchFilter],
    () => fetchQueuePlay(matchFilter),
    {
      keepPreviousData: false,
      staleTime: 5,
      retry: false,
      onSuccess: () => {
        setIsMatchOver(false)
      },
      onError: err => {
        showMatchOver(err?.data?.errors, setIsMatchOver)
      },
    },
  )

  useIsFocused()
  const getDefaultParams = useGetDefaultFilterParams()

  const setUsers = useCallback(resp => {
    const users = resp?.users ?? []
    swiperRef.current?.setCards(users)

    setEmptyQueue(!users?.length)
    onLoading(false)

    users?.length && setCurUser(users[0])
  }, [])

  useEffect(() => {
    if (!isFetched || !data) return

    setUsers(data)
  }, [isFetched, data, setUsers])

  useEffect(() => {
    setIsFreeDailySwipes(isMatchOver)
  }, [isMatchOver])

  const handleDislike = useCallback(
    throttle(() => swiperRef.current?.swipeLeft(), THROTTLE_WAIT),
    [],
  )

  const handleLike = useCallback(
    throttle(() => swiperRef.current?.swipeRight(), THROTTLE_WAIT),
    [],
  )

  const onRestAllParams = () => {
    const defaultParam = getDefaultParams()

    changeMatchFilter(() => defaultParam)
  }

  const onShuffle = useCallback(() => {
    const currentFilters = { ...matchFilter }
    currentFilters.randomize = Math.floor(Math.random() * 20)
    changeMatchFilter(() => currentFilters)
  }, [matchFilter])

  const getNew100Swipes = () => {
    setIsFreeDailySwipes(false)

    refetch()
  }

  useEffect(() => {
    if (isError) {
      showMatchOver(error?.data?.errors, setIsMatchOver)
    }
  }, [error?.data?.errors, isError])

  function handleSwipedLeft(cardIndex = 0) {
    if (!swiperRef.current) return
    if (swiperRef.current.getCards().length <= cardIndex) return

    const user = swiperRef.current.getCard(cardIndex)

    setCurUser(swiperRef.current.getCard(cardIndex + 1))

    voteAction({
      duid: user.duid,
      picNum: user.picNum,
      rating: 'not',
    })
  }

  function handleSwipedRight(cardIndex = 0) {
    if (!swiperRef.current) return
    if (swiperRef.current.getCards().length <= cardIndex) return

    const user = swiperRef.current.getCard(cardIndex)

    setCurUser(swiperRef.current.getCard(cardIndex + 1))

    voteAction({
      duid: user.duid,
      picNum: user.picNum,
      rating: 'cute',
    })
  }

  const handleSwipedLeftThrottle = throttle(handleSwipedLeft, THROTTLE_WAIT)
  const handleSwipedRightThrottle = throttle(handleSwipedRight, THROTTLE_WAIT)

  function handleSwiped(index = 0) {
    if (!swiperRef.current) return

    const users = swiperRef.current.getCards()

    if (users.length - index === 3) {
      fetchQueuePlay(matchFilter).then(res => {
        if (res?.users) {
          const userIds = users.map(({ duid }) => duid)
          const newUsers = res.users.filter(
            ({ duid }) => !userIds.includes(duid),
          )

          swiperRef.current.pushCards(newUsers)

          if (newUsers.length) {
            setEmptyQueue(false)
          }
        }
      })
    }

    if (users.length - (index + 1) === 0) {
      setEmptyQueue(true)
    }
  }

  function handleFavorite() {
    if (curUser) {
      onAddFavorite(curUser.duid, true)
      swiperRef.current?.setFavoritedDuid(curUser.duid)
    }
  }

  if (isLoading) {
    return <MatchSkeleton />
  }

  if (isFreeDailySwipes) {
    return (
      <BackgroundGradient>
        <FreeDailySwipes onSuccess={getNew100Swipes} />
      </BackgroundGradient>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.swiperContainer}>
        <Empty visible={emptyQueue} onResetFilter={onRestAllParams} />
        <Swiper
          cardStyle={styles.card}
          containerStyle={styles.swiper}
          cards={[]}
          ref={swiperRef}
          keyExtractor={user => user?.duid ?? uniqueId()}
          renderCard={(user, idx, favoritedDuid) =>
            !user ? null : (
              <UserCard user={user} favoritedDuid={favoritedDuid} />
            )
          }
          verticalSwipe
          animateCardOpacity
          showSecondCard={true}
          disableLeftSwipe={isMatchOver}
          disableRightSwipe={isMatchOver}
          disableTopSwipe={isMatchOver}
          disableBottomSwipe={isMatchOver}
          onSwipedLeft={handleSwipedLeftThrottle}
          onSwipedRight={handleSwipedRightThrottle}
          onSwipedAll={() => setEmptyQueue(true)}
          onSwiped={handleSwiped}
          outputRotationRange={outputRotationRange}
          overlayOpacityHorizontalThreshold={5}
          overlayLabels={overlayLabelsComponent}
          stackSize={2}
          stackScale={0}
          stackSeparation={0}
        />
      </View>

      {!emptyQueue && (
        <View
          style={[styles.swipeActionButtons, { marginBottom: bottom + 76 }]}
        >
          <CircleButton
            Icon={() => <Shuffle width={20} height={20} />}
            bgColor={'#F6F7FF'}
            onPress={onShuffle}
          />
          <CircleButton
            Icon={() => <Unlike width={19} height={19} />}
            onPress={handleDislike}
            disabled={isMatchOver}
            bgColor={'#FFF8F8'}
          />
          <CircleButton
            Icon={() => <Like width={24} height={22} />}
            onPress={handleLike}
            disabled={isMatchOver}
            bgColor={'#F6FFF9'}
          />
          {!curUser.isFavorite && (
            <CircleButton
              Icon={() => <Favorite width={25} height={24} />}
              bgColor={'#FFF2D5'}
              onPress={handleFavorite}
            />
          )}
        </View>
      )}

      <MatchModal user={match} closeAction={() => setMatch(null)} />
      <ReportSuccessModal />
    </View>
  )
}

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -4,
  },
  swiper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  card: {
    top: 'auto',
    left: 'auto',
    width: 'auto',
    height: 'auto',
  },
  swipeActionButtons: {
    height: 96,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEEFC',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  aLike: {
    justifyContent: 'flex-end',
  },
  actionTxt: {
    ...typography.p3,
    color: colors.semiGray,
  },
  likeIcon: {
    color: colors.green,
    marginLeft: 4,
  },
  skipIcon: {
    color: colors.alert,
    marginRight: 4,
  },

  dislikeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 15, 15, .3)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 203, 155, .3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: -100,
  },
  overlayIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.whiteBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const overlayLabelsComponent = {
  right: {
    element: (
      <View style={styles.likeOverlay}>
        <View style={styles.overlayIcon}>
          <Heart width={40} height={40} color={colors.green} />
        </View>
      </View>
    ),
  },
  left: {
    element: (
      <View style={styles.dislikeOverlay}>
        <View style={styles.overlayIcon}>
          <Dislike color={colors.alert} width={40} height={40} />
        </View>
      </View>
    ),
  },
}

export default MatchGame
