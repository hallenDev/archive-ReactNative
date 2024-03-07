import React from 'react'
import { Image } from 'react-native'
import EmptyContentPopup from '~/ui/EmptyContentPopup'

const EmptyBlockedUsers = () => (
  <EmptyContentPopup
    Icon={
      <Image source={require('~/assets/images/local/loading-spinner.png')} />
    }
    title="There is no one here."
    description="So far you have not blocked anyone."
  />
)

export default EmptyBlockedUsers
