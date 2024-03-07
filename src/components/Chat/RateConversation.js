import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import isSiteMasterDuid from '~/utils/isSiteMasterDuid'
import { rateMsgThread } from '~/shared/api'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'

export const ThreadRatedType = { NICE: 'nice', RUDE: 'rude' }

export default function RateConversation({ data }) {
  const otherUserId = data?.user_data?.duid
  const threadRated = data?.thread_rated
  const thread = data?.thread || []

  const [selected, setSelected] = React.useState(
    threadRated === 1
      ? ThreadRatedType.NICE
      : threadRated === 0
      ? ThreadRatedType.RUDE
      : '',
  )
  const queryClient = useQueryClient()
  const { mutate } = useMutation(rateMsgThread, {
    onSuccess: response => {
      setSelected(response.rating)
      queryClient.invalidateQueries(['msgThread', otherUserId])
      showNotificationSuccess({
        message: 'You have successfully rated the conversation. Thank you!',
      })
    },
  })

  const niceHandler = () =>
    mutate({ otherUserId, rating: ThreadRatedType.NICE })
  const riceHandler = () =>
    mutate({ otherUserId, rating: ThreadRatedType.RUDE })

  const notUserReply =
    thread?.findIndex(e => !e.msg_system_id && e.direction === 'recipient') ===
    -1

  if (isSiteMasterDuid(otherUserId)) return null
  if (threadRated !== false) return null
  if (notUserReply) return null

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate conversation:</Text>
      <View style={styles.buttons}>
        <PressableHighlight onPress={niceHandler}>
          <Text style={[styles.emoji(selected === ThreadRatedType.NICE)]}>
            😀
          </Text>
        </PressableHighlight>
        <PressableHighlight onPress={riceHandler}>
          <Text style={[styles.emoji(selected === ThreadRatedType.RUDE)]}>
            🙁
          </Text>
        </PressableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 5,
    alignItems: 'center',
  },
  header: {
    ...typography.h5,
    color: colors.textMain,

    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emoji: selected =>
    Object.assign(
      {
        fontSize: 20,
        paddingHorizontal: 10,
        opacity: 0.5,
      },
      selected && { opacity: 1 },
    ),
})
