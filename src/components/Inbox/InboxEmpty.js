import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import EmptyContentPopup from '~/ui/EmptyContentPopup'

const InboxEmpty = () => {
  const navigation = useNavigation()

  return (
    <EmptyContentPopup
      Icon={
        <Image source={require('~/assets/images/local/loading-spinner.png')} />
      }
      title="No chats, yet"
      description="Find your perfect Match and start chatting!"
      buttonText="Find Your Match!"
      onPress={() => navigation.navigate('Match')}
    />
  )
}

export default InboxEmpty
