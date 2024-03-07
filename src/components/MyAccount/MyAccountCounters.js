import React, { memo } from 'react'
import { View, Text } from 'react-native'
import { useQuery } from 'react-query'
import { countAbbreviatedForm } from '~/shared/utils/count-abbreviated-form'
import { fetchActivityCounts } from '~/shared/api/members'
import { Button } from '~/ui'
import { profileCounterStyles as styles } from '~/styles'

const MyAccountCounters = ({ navigation }) => {
  const { data } = useQuery('counts', fetchActivityCounts)

  const friendsCount = countAbbreviatedForm(data?.friends) || '-'
  const favoritesCount = countAbbreviatedForm(data?.favorites) || '-'
  const matchesCount = countAbbreviatedForm(data?.mutualMatches) || '-'

  return (
    <View style={styles.container}>
      <Button
        type="transparent"
        style={styles.btn}
        onPress={() => navigation.navigate('FriendsScreen')}
      >
        <View style={styles.btnContent}>
          <Text style={styles.btnCounter}>{friendsCount}</Text>
          <Text style={styles.btnName}>Friends</Text>
        </View>
      </Button>
      <Button
        type="transparent"
        style={[styles.btn, styles.centerBtn]}
        onPress={() => navigation.navigate('FavoritesScreen')}
      >
        <View style={styles.btnContent}>
          <Text style={styles.btnCounter}>{favoritesCount}</Text>
          <Text style={styles.btnName}>Favorites</Text>
        </View>
      </Button>
      <Button
        type="transparent"
        style={styles.btn}
        onPress={() => navigation.navigate('MatchesScreen')}
      >
        <View style={styles.btnContent}>
          <Text style={styles.btnCounter}>{matchesCount}</Text>
          <Text style={styles.btnName}>Matches</Text>
        </View>
      </Button>
    </View>
  )
}

export default memo(MyAccountCounters)
