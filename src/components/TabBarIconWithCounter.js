import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import { fetchInbox } from '~/shared/api'
import { useThreadsUnreadTotal } from '~/context/ThreadsUnreadTotalContext'
import { colors } from '~/ui/theme'

const TabBarIconWithCounter = ({ Icon, ActiveIcon, size, focused, color }) => {
  const [unreadTotal] = useThreadsUnreadTotal()

  const { data = {}, refetch } = useQuery('msgInboxCounter', () =>
    fetchInbox({ unread: 1 }),
  )
  const unreadCount = !!data?.unreadCount

  useEffect(() => {
    if (unreadTotal === 0) {
      refetch()
    }
  }, [unreadTotal])

  return (
    <View style={[styles.container, focused && styles.active]}>
      {focused ? (
        <ActiveIcon
          width={size + 2}
          height={size + 2}
          fill="none"
          color={color}
        />
      ) : (
        <Icon width={size} height={size} fill="none" color={color} />
      )}
      {unreadCount ? <View style={styles.point(size)} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  point: size => ({
    width: size / 1.7,
    height: size / 1.7,
    backgroundColor: colors.green,
    position: 'absolute',
    right: 6,
    top: 7,
    borderRadius: size / 2.25,
    borderColor: colors.white,
    borderWidth: 2,
    zIndex: 2,
  }),
  active: {
    backgroundColor: colors.primary,
  },
})

export default TabBarIconWithCounter
