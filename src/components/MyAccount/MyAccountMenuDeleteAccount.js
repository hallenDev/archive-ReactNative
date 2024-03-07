import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MyAccountWarningMenu } from '~/components/MyAccount/MyAccountMenu'
import SvgTrash2 from '~/ui/icons/Trash2'

const MyAccountMenuDeleteAccount = props => {
  const navigation = useNavigation()

  const handleDeleteAccount = () => {
    navigation.navigate('MyAccountDeleteAccountScreen')
  }

  return (
    <MyAccountWarningMenu
      menu={[
        {
          Icon: SvgTrash2,
          title: 'Delete Account',
          onPress: handleDeleteAccount,
        },
      ]}
    />
  )
}

export default MyAccountMenuDeleteAccount
