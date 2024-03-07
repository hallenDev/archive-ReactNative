import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'

import PressableHighlight from '~/ui/PressableHighlight'
import {
  onOpenPhotoCamera,
  onOpenVideoCamera,
  onOpenLibrary,
} from '~/services/imagePickerService'
import { Camera, FolderDown } from '~/ui/icons'
import { typography, colors } from '~/ui/theme'

const ActionSheetUpload = ({ onClose, onChange, withoutVideo = false }) => {
  const entities = [
    {
      text: 'Take Photo',
      onPress: () => onOpenPhotoCamera({ onChange }),
      Icon: Camera,
    },
    {
      text: Platform.OS === 'ios' ? 'From Gallery' : 'Add Photo',
      onPress: () =>
        onOpenLibrary({
          onChange,
          mediaType: Platform.OS === 'android' ? 'photo' : undefined,
        }),
      Icon: FolderDown,
    },
  ]

  if (!withoutVideo) {
    const video = {
      text: 'Take Video',
      onPress: () => onOpenVideoCamera({ onChange }),
      Icon: Camera,
    }

    entities.splice(1, 0, video)

    if (Platform.OS === 'android') {
      entities.push({
        text: 'Add Video',
        onPress: () =>
          onOpenLibrary({
            onChange,
            mediaType: 'video',
          }),
        Icon: FolderDown,
      })
    }
  }

  return entities.map(({ text, onPress, Icon }) => (
    <PressableHighlight key={text} style={styles.item} onPress={onPress}>
      <Icon width="24" height="24" color={colors.primary} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </PressableHighlight>
  ))
}

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
  item: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 15,
  },
  active: {
    backgroundColor: colors.bgBlack,
  },
  text: {
    ...typography.p1,
    color: colors.textSub,
  },
})

export default ActionSheetUpload
