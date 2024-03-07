import React, { useRef, useState, useCallback } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useQueryClient } from 'react-query'
import { useUser } from '~/context/UserContext'
import useProfile from '~/hooks/useProfile'
import useMediaAdd from '~/hooks/useMediaAdd'
import getUrl from '~/utils/getUrl'
import getProfileLocation from '~/utils/getProfileLocation'
import fileValidation from '~/utils/fileValidation'
import {
  showNotificationError,
  showNotificationSuccess,
} from '~/services/in-app-notifications'
import ActionSheetUpload from '~/components/ActionSheets/ActionSheetUpload'
import ActionSheetRaw from '~/ui/actionsSheet/ActionSheetRaw'
import ConfirmModal from '~/components/Modals/ConfirmModal'
import PressableHighlight from '~/ui/PressableHighlight'
import UserInfoPost from '~/ui/UserInfoPost'
import { Button, LinearGradient, Placeholder } from '~/ui'
import { Picture, RightChevronLarge } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'
import AddMediaPreview from './add-media-preview'

const EMPTY_MEDIA_ERROR = 'Media is a required field'

const AddMedia = ({ navigation }) => {
  const [media, setMedia] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [isError, setError] = useState(false)
  const uploadFilePopupRef = useRef(null)

  const queryClient = useQueryClient()
  const {
    user: { duid },
  } = useUser()
  const { data } = useProfile()
  const upload = useMediaAdd({
    onUploadStart: () => setIsUploadLoading(true),
    onUploadEnd: () => setIsUploadLoading(false),
    onSuccess: () => {
      showNotificationSuccess({ message: 'Upload successful.' })

      queryClient.invalidateQueries(['profile', duid])
      queryClient.invalidateQueries(['profileTrending', parseInt(duid, 10)])

      if (media.type.match('video*')) {
        setIsOpenModal(true)
      } else {
        navigation.goBack()
      }
    },
    onError: description => {
      showUploadMediaError(description)
    },
  })

  const onGoToGuidelines = () => {
    navigation.navigate('UploadGuidelines')
  }

  const showUploadMediaError = errorMsg => {
    showNotificationError({ message: errorMsg })
  }

  const onSaveMedia = input => {
    uploadFilePopupRef.current?.hide()

    const mediaFile = input[0] || input

    fileValidation(mediaFile, setMedia, showUploadMediaError)
  }

  const attachMediaHandler = () => {
    uploadFilePopupRef.current.show()
  }

  const onClosePopup = useCallback(() => {
    setIsOpenModal(false)

    navigation.goBack()
  }, [navigation])

  const onSubmit = () => {
    if (!media) {
      showNotificationError({ message: EMPTY_MEDIA_ERROR })
      setError(true)

      return
    }

    upload(media)
  }

  const location = getProfileLocation(
    data?.city,
    data?.state_code,
    data?.country,
  )
  const profilePic = getUrl(data?.profilePic)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.info}>
            <UserInfoPost
              age={data?.age}
              username={data?.username}
              uri={profilePic}
              locationClassName={styles.location}
              location={location}
            />
          </View>
          <Text style={styles.text}>
            Make sure to SMILE! ;-) This is the single most important thing you
            can do for activity!
          </Text>

          {media ? (
            <AddMediaPreview
              uri={media.uri}
              isVideo={media?.type?.match('video*')}
              isStopVideo={isOpenModal}
            />
          ) : (
            <PressableHighlight
              style={styles.attachButton}
              onPress={attachMediaHandler}
            >
              <Picture width={16} height={16} color={colors.primary} />
              <Text style={styles.inputTitle}>Add Media</Text>
            </PressableHighlight>
          )}
          {isError && <Text style={styles.error}>{EMPTY_MEDIA_ERROR}</Text>}
          <View style={styles.guidelines}>
            <Pressable onPress={onGoToGuidelines}>
              <Text style={styles.clickHere}>Click Here</Text>
            </Pressable>
            <Text style={{ ...typography.p2, color: colors.textMain }}>
              {' '}
              For Upload Guidelines
            </Text>
          </View>
        </View>
        <Button
          style={styles.btn}
          onPress={onSubmit}
          isDisabled={isUploadLoading}
        >
          <LinearGradient
            style={styles.gradientContainer}
            colors={colors.linerGradient}
          >
            {isUploadLoading ? (
              <Placeholder isWhite />
            ) : (
              <>
                <Text style={styles.btnText}>Post it</Text>
                <RightChevronLarge width={16} height={16} style={styles.icon} />
              </>
            )}
          </LinearGradient>
        </Button>
        <Button style={styles.btn} onPress={() => navigation.goBack()}>
          <LinearGradient
            style={styles.gradientContainer}
            colors={colors.linerGradient}
          >
            <Text style={styles.btnText}>Close</Text>
          </LinearGradient>
        </Button>
      </View>

      <ActionSheetRaw ref={uploadFilePopupRef}>
        <ActionSheetUpload
          onClose={() => uploadFilePopupRef.current?.hide()}
          onChange={onSaveMedia}
        />
      </ActionSheetRaw>

      {isOpenModal && (
        <ConfirmModal
          withoutCancel
          onApprove={onClosePopup}
          modalVisible={isOpenModal}
          description="Great!"
          approveText="OK"
          info="This update will be posted very soon!"
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: 'space-between',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    height: 31,
    width: '100%',
  },
  location: {
    ...typography.c2,
    color: colors.semiGray,
  },
  text: {
    ...typography.p3,
    color: colors.textMain,
    marginVertical: 20,
    textAlign: 'center',
  },
  attachButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiBlack25,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
  inputTitle: {
    ...typography.p2,
    color: colors.primary,

    marginTop: 8,
  },
  guidelines: {
    ...typography.p2,
    color: colors.textMain,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  clickHere: {
    ...typography.p2,
    color: colors.textMain,
    textDecorationLine: 'underline',
  },
  btn: {
    marginBottom: 10,
  },
  gradientContainer: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
  icon: {
    color: colors.textMain,
    marginLeft: 8,
  },
  error: {
    color: colors.redAlert,
  },
})

export default AddMedia
