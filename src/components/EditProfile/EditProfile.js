import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useProfile from '~/hooks/useProfile'
import EditItem from './EditItem'
import getUrl from '~/utils/getUrl'
import Avatar from '~/ui/Avatar'
import Placeholder from '~/ui/Placeholder'
import { decode } from 'html-entities'
import { useUser } from '~/context/UserContext'

const EditProfile = () => {
  const navigation = useNavigation()
  const { data, isLoading } = useProfile()
  const { user } = useUser()

  if (isLoading) return <Placeholder large />

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar uri={getUrl(data?.profilePic)} size={100} resizeMode="cover" />
      </View>
      <View style={styles.list}>
        <EditItem
          title="Nickname"
          info={data?.username}
          onPress={() => navigation.navigate('Nickname')}
        />
        <EditItem
          title="Bio"
          info={decode(data?.about_me)}
          onPress={() => navigation.navigate('Bio')}
        />
        <EditItem
          title="Interests"
          info={`${data?.interested_in.length} selected`}
          onPress={() => navigation.navigate('Interests')}
        />
        <EditItem
          title="Age Filters"
          info={`Prefer users ${user?.preferences?.ageStart} to ${user?.preferences?.ageEnd} years old`}
          onPress={() => navigation.navigate('AgeFilters')}
        />
        <EditItem
          title="Question / Answer"
          info={decode(data?.qaAnswer)}
          onPress={() => navigation.navigate('QuestionsAnswers')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    marginBottom: 32,
  },
  list: {
    width: '100%',
  },
})

export default EditProfile
