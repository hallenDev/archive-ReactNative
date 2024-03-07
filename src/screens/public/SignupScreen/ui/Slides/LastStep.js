import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Platform,
  Image,
} from 'react-native'
import { useFormContext } from 'react-hook-form'

import ImagePicker from '~/services/imagePickerService'

import { Button, ActionSheet, OZContainer, OZTitle } from '~/ui'
import { Add as AddIcon } from '~/ui/icons/Solid'
import { Camera, FolderDown, Close } from '~/ui/icons'

import { colors, typography } from '~/ui/theme'

import requestCameraPermission from '~/utils/requestCameraPermission'

const imagePickerOptions = { mediaType: 'photo' }

const AddPhoto = () => (
  <View style={styles.addContainer}>
    <AddIcon style={styles.addIcon} />
  </View>
)

const Photo = ({ photo, delAction }) => (
  <View style={styles.photo}>
    <Image
      style={styles.photoImage}
      resizeMode="cover"
      source={{
        uri: photo.uri,
      }}
    />
    <Pressable style={styles.photoDel} onPress={delAction}>
      <Close width={12} height={12} color={colors.white} />
    </Pressable>
  </View>
)

const LastStep = ({ loading = false, nextAction, backAction }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  const form = useFormContext()
  const actionSheetRef = useRef()

  const photos = form.watch('photos')

  const handleAddMedia = media => {
    const value = form.getValues('photos')
    form.setValue('photos', [...value, media])
  }

  const handleOpenCamera = async () => {
    const res = Platform.OS === 'ios' ? true : await requestCameraPermission()
    if (res) {
      ImagePicker.launchCamera(imagePickerOptions, response => {
        actionSheetRef.current?.hide()
        if (response.didCancel || response.error) {
          return null
        }
        const media = response?.assets?.[0]

        handleAddMedia(media)
      })
    }
  }

  const handleOpenLibrary = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      actionSheetRef.current?.hide()

      if (response.didCancel || response.error) return null

      const media = response?.assets?.[0]
      handleAddMedia(media)
    })
  }

  return (
    <OZContainer backAction={backAction}>
      <OZTitle left="Last step!" />
      <View style={styles.info}>
        <Text style={styles.require}>
          We require all members to upload at least one photo.{'\n'}
          Make sure to SMILE! ;-) This is the single most important thing you
          can do for activity!
        </Text>
      </View>

      <View style={styles.photos}>
        {Array(6)
          .fill(null)
          .map((val, key) =>
            photos[key] ? (
              <Photo
                key={key}
                photo={photos[key]}
                delAction={() => {
                  let value = [...photos]
                  value.splice(key, 1)
                  form.setValue('photos', value)
                }}
              />
            ) : (
              <TouchableOpacity
                key={key}
                style={styles.photo}
                onPress={() => {
                  if (!loading && !isDisabled) actionSheetRef.current?.show()
                }}
              >
                <AddPhoto />
              </TouchableOpacity>
            ),
          )}
      </View>

      <View style={styles.action}>
        <Button
          isDisabled={isDisabled}
          loading={loading}
          type="primary"
          onPress={async () => {
            setIsDisabled(true)

            const isVal = await form.trigger(['photos'])
            if (isVal) {
              nextAction()
            } else {
              setIsDisabled(false)
            }
          }}
        >
          Continue
        </Button>
      </View>

      <ActionSheet ref={actionSheetRef}>
        <Text style={styles.caption}>Add a photo</Text>
        <View style={styles.content}>
          <Pressable
            style={styles.item}
            underlayColor="transparent"
            onPress={handleOpenCamera}
          >
            <Camera width="24" height="24" color={colors.primary} />
            <Text style={styles.title}>Take Photo</Text>
          </Pressable>
          <View style={{ width: 12 }} />
          <Pressable
            style={styles.item}
            underlayColor="transparent"
            onPress={handleOpenLibrary}
          >
            <FolderDown width="24" height="24" color={colors.primary} />
            <Text style={styles.title}>
              {Platform.OS === 'ios' ? 'From Gallery' : 'Add Photo'}
            </Text>
          </Pressable>
        </View>
      </ActionSheet>
    </OZContainer>
  )
}

const styles = StyleSheet.create({
  info: {
    marginBottom: 20,
  },
  require: {
    ...typography.p1,
    color: colors.textSub,
  },
  action: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  photos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    height: ((Dimensions.get('window').width - 40 - 12) / 3) * 1.2,
    width: (Dimensions.get('window').width - 40 - 12) / 3,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  photoImage: {
    flex: 1,
  },
  photoDel: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.semiBlack50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContainer: {
    flex: 1,
    borderColor: colors.semiGray,
    borderWidth: 1,
    backgroundColor: colors.semiBlack25,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    color: colors.primary,
  },
  caption: {
    ...typography.h3,
    color: colors.textMain,
  },
  content: {
    marginTop: 20,
  },
  item: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
  },
  title: {
    ...typography.p1,
    marginLeft: 12,
    color: colors.textSub,
  },
})

export default LastStep
