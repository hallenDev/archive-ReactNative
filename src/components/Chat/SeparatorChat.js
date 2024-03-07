import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors, typography } from '~/ui/theme'
import dayjs from 'dayjs'

const SeparatorChat = ({ item, nextItem }) => {
  const msgDate = dayjs(item?.mtime)
  let isShowSeparateDate = false
  const mtime = msgDate.format('MMM D, YYYY')
  if (nextItem) {
    const mtime2 = dayjs(nextItem?.mtime).format('MMM D, YYYY')

    isShowSeparateDate = mtime !== mtime2
  } else {
    isShowSeparateDate = true
  }

  let timeLabel = mtime
  if (msgDate.isYesterday()) {
    timeLabel = 'Yesterday'
  } else if (msgDate.isToday()) {
    timeLabel = 'Today'
  }

  return (
    <View style={styles.container}>
      {isShowSeparateDate && <Text style={styles.text}>{timeLabel}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.p3,
    color: colors.textSub,

    marginVertical: 16,
  },
})

export default SeparatorChat
