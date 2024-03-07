import React, { useState, useRef, useContext } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useQueryClient } from 'react-query'
import { showNotificationError } from '~/services/in-app-notifications'
import { BlurHeaderContext } from '~/context/BlurHeaderProvider'
import useMediaAdd from '~/hooks/useMediaAdd'
import useProfile from '~/hooks/useProfile'
import fileValidation from '~/utils/fileValidation'
import ActionSheetUpload from '~/components/ActionSheets/ActionSheetUpload'
import { Placeholder } from '~/ui'
import ActionSheetRaw from '~/ui/actionsSheet/ActionSheetRaw'
import { ChevronRight } from '~/ui/icons'
import { Camera } from '~/ui/icons/Solid'
import Overlay from '~/ui/Overlay'
import { colors, typography } from '~/ui/theme'

const UploadPhotoOverlay = () => {
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const uploadFilePopupRef = useRef(null)

  const { handleBlurHeader } = useContext(BlurHeaderContext)

  const queryClient = useQueryClient()

  const { data } = useProfile()

  const isProfileAvatar = data?.profilePic?.toLowerCase().includes('nopic')

  const upload = useMediaAdd({
    onUploadStart: () => setIsUploadLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', String(data.duid)])
      queryClient.invalidateQueries([
        'profileTrending',
        parseInt(data.duid, 10),
      ])
      setIsUploadLoading(false)
    },
    onError: description => {
      showUploadMediaError(description)
      setIsUploadLoading(false)
    },
  })

  const showUploadMediaError = errorMsg => {
    showNotificationError({ message: errorMsg })
  }

  const onSaveMedia = input => {
    uploadFilePopupRef.current?.hide()

    const mediaFile = input[0] || input

    fileValidation(mediaFile, upload, showUploadMediaError)
  }

  const attachMediaHandler = () => {
    uploadFilePopupRef.current.show()
  }

  useFocusEffect(
    React.useCallback(() => {
      if (__DEV__) return

      handleBlurHeader(isProfileAvatar)

      return () => {
        handleBlurHeader(false)
      }
    }, [isProfileAvatar, handleBlurHeader]),
  )

  if (!isProfileAvatar || __DEV__) {
    return null
  }

  return (
    <>
      <Overlay>
        <Pressable style={[styles.container]} onPress={attachMediaHandler}>
          <View style={styles.icon}>
            {isUploadLoading ? (
              <Placeholder isWhite />
            ) : (
              <Camera width={20} height={20} color={colors.textMain} />
            )}
          </View>

          <View style={styles.text}>
            <Text style={styles.title}>Upload at least one photo</Text>
            <Text style={styles.info}>
              Make sure to SMILE! ;-{`)`} It's crucial for more activity!
            </Text>
          </View>
          <ChevronRight width={24} height={24} color={colors.textMain} />
        </Pressable>
      </Overlay>
      <ActionSheetRaw ref={uploadFilePopupRef}>
        <ActionSheetUpload
          onClose={() => uploadFilePopupRef.current?.hide()}
          onChange={onSaveMedia}
          withoutVideo
        />
      </ActionSheetRaw>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlayContainer,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    flex: 1,
  },
  title: {
    ...typography.p2,
    color: colors.textMain,
    marginBottom: 6,
  },
  info: {
    ...typography.p3,
    color: colors.textMain,
  },
})
export default UploadPhotoOverlay
