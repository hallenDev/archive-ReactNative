import React, { useEffect } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated'

import useFavorite from '~/hooks/useFavorite'
import { ButtonBackgroundGradient } from '~/ui'

import { Star } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'
import { FavoriteBtn } from '~/ui/icons'
import { cardSize } from './UserCard'

const Pulse = ({ delay = 0, repeat }) => {
  const animation = useSharedValue(0)

  useEffect(() => {
    animation.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 3000,
          easing: Easing.linear,
        }),
        repeat ? -1 : 1,
        false,
      ),
    )
  }, [])

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    )
    return {
      opacity: opacity,
      transform: [{ scale: animation.value }],
    }
  })
  return <Animated.View style={[styles.circle, animatedStyles]} />
}

const FavoriteButton = ({ user, onFavorite }) => {
  const { mutate: onAddFavorite } = useFavorite({ isMatchPage: true })

  const fbButtonSize = {
    width: cardSize.width * 0.16,
    height: cardSize.width * 0.16,
  }

  if (user.isFavorite) {
    return null
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          onAddFavorite(user.duid, true)
          onFavorite()
        }}
      >
        <FavoriteBtn {...fbButtonSize} />
      </Pressable>
      <Pulse repeat />
      <Text style={styles.textFavorite} allowFontScaling={false}>
        FAVORITE
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 29,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 29,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 150,
    position: 'absolute',
    backgroundColor: colors.primary,
    top: -10,
  },
  innerCircle: {
    width: 48,
    height: 48,
    borderRadius: 29,
    backgroundColor: colors.primary,
    zIndex: 2,
    position: 'absolute',
  },
  textFavorite: {
    ...typography.p3,
    color: colors.white,
    marginTop: 3,
  },
  btnFavorite: {
    width: 40,
  },
})

export default FavoriteButton
