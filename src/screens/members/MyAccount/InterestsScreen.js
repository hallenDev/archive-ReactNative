import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Interest } from '~/ui'
import InterestMap from '~/shared/types/InterestMap'
import { changeInterests } from '~/shared/api/members'
import { showNotificationError } from '~/services/in-app-notifications'
import useProfile from '~/hooks/useProfile'

const InterestsScreen = () => {
  const queryClient = useQueryClient()
  const { data } = useProfile()
  const { mutate, isLoading } = useMutation(changeInterests, {
    onSuccess: response => {
      queryClient.invalidateQueries(['profile', data?.duid])
    },
    onError: error => {
      showNotificationError({
        description: error?.data?.errors?.interested_in,
      })
    },
  })
  const [checked, setChecked] = React.useState(
    new Set(data?.interested_in || []),
  )

  const handleUpdateInterests = () => {
    const interested_in = Array.from(checked)
    mutate({ interested_in, duid: data?.duid })
  }

  const handleChecked = id => {
    setChecked(prev => {
      const next = new Set(prev)
      prev.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const isDisabled = Array.from(checked).length <= 0

  return (
    <View style={styles.container} pointerEvents={isLoading ? 'none' : 'auto'}>
      <Text style={styles.title}>Add new interest</Text>
      <View style={styles.content}>
        {Object.entries(InterestMap).map(([key, value]) => (
          <Interest
            key={key}
            onPress={() => handleChecked(key)}
            value={value}
            active={checked.has(key)}
          />
        ))}
      </View>
      <Button
        onPress={handleUpdateInterests}
        isLoading={isLoading}
        disabled={isDisabled}
      >
        Save
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  content: {
    marginVertical: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#2E3138',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
})

export const options = () => ({
  title: 'Interested in',
})

export default InterestsScreen
