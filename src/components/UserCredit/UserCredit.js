import React, { useCallback } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import useUserBalance from '~/hooks/useUserBalance'
import { Button, ButtonBackgroundGradient } from '~/ui'
import { Coin } from '~/ui/icons'

import { colors, typography } from '~/ui/theme'

const UserCredit = () => {
  const navigation = useNavigation()
  const { data, isFetched, refetch } = useUserBalance()

  const refetchCallback = useCallback(() => {
    refetch()
  }, [refetch])

  useFocusEffect(refetchCallback)

  if (!isFetched) return null

  return (
    <View style={styles.container}>
      <Button style={styles.btn} onPress={() => navigation.navigate('Payment')}>
        <ButtonBackgroundGradient className={styles.btnGradient}>
          <Text style={styles.btnText}>Add Credits</Text>
        </ButtonBackgroundGradient>
      </Button>

      <Pressable onPress={() => navigation.navigate('Payment')}>
        <View style={styles.container}>
          <Coin color={colors.textMain} width={12} height={12} />
          <Text style={styles.credits}>{data?.credits?.toLocaleString()}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  credits: {
    ...typography.p2,
    color: colors.textMain,
    marginLeft: 5,
  },
  btn: {
    marginRight: 8,
    minHeight: 0,
    width: 110,
  },
  btnGradient: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
})

export default UserCredit
