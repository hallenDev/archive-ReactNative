import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import { colors, typography } from '~/ui/theme'
import { DotsHorizontal } from '../../ui/icons'
import { useMutation, useQueryClient } from 'react-query'
import { changeMedia } from '../../shared/api'
import { showNotificationError } from '../../services/in-app-notifications'
import useProfile from '../../hooks/useProfile'

const ProfilePhotoMenu = ({ contentId, contentMediaId, fileMd5 }) => {
  const queryClient = useQueryClient()

  const { data: profile } = useProfile()

  const { mutate } = useMutation(changeMedia, {
    onSuccess: data => {
      queryClient.invalidateQueries(['profile'])
    },
    onError: error => {
      showNotificationError({
        message: 'Failed to set primary picture',
      })
    },
  })

  const handleSetPrimary = () => {
    mutate({
      contentId,
      contentMediaId,
      fileMd5,
    })
  }

  if (profile?.profilePic.indexOf(`-${contentMediaId}-`) !== -1) return null

  return (
    <Menu style={styles.menu}>
      <MenuTrigger customStyles={triggerStyles}>
        <DotsHorizontal width="22" height="22" color={colors.textSub} />
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyle}>
        <MenuOption onSelect={handleSetPrimary}>
          <Text style={styles.itemText}>Set as Primary</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  )
}

const triggerStyles = {
  TriggerTouchableComponent: TouchableOpacity,
}

const optionsStyle = {
  optionsContainer: {
    backgroundColor: colors.bgMenuModal,
    borderRadius: 10,
    width: 130,
    paddingVertical: 5,
  },
}

const styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    ...typography.p2,
    color: colors.textMain,
    marginLeft: 10,
  },
})

export default ProfilePhotoMenu
