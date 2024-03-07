import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ViewMeasure from '~/ui/ViewMeasure'
import Avatar from '~/ui/Avatar'
import { HeaderMenuBtn } from '~/components'
import GetApproveVideoCallModal from '~/components/Modals/GetApproveVideoCallModal'
import { SITEMASTER_DUID, VIDEO_CALL_AVAILABLE } from '~/configs/constants'
import PressableHighlight from '~/ui/PressableHighlight'
import SvgVideoCamera from '~/ui/icons/VideoCamera'
import { colors } from '~/ui/theme'
import { BackButton } from '~/components'
import { chatHeaderStyles as styles } from '~/styles'

const ChatHeader = ({ placeholder = false, userData = {} }) => {
  const {
    duid = '',
    username = '',
    description = '',
    pic: uri = '',
    online = false,
  } = userData
  const [videoCallModalVisible, setVideoCallModalVisible] = useState(false)
  const ref = React.useRef()

  const isSiteMaster = duid === SITEMASTER_DUID

  const navigation = useNavigation()
  const handleGoBack = () => {
    Keyboard.dismiss()
    navigation.goBack()
  }
  const handleUsernamePress = () => {
    !isSiteMaster &&
      navigation.navigate('UserProfileScreen', { duid, isFromChat: true })
  }

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.content}>
          <View style={styles.left}>
            <BackButton onPress={handleGoBack} />
          </View>
          <PressableHighlight
            onPress={handleUsernamePress}
            style={styles.center}
          >
            <Avatar uri={uri} online={online} size={styles.avatar.width} />
            <View style={styles.username}>
              <Text style={styles.title} numberOfLines={1}>
                {username}
              </Text>
              {description ? (
                <Text style={styles.description}>{description}</Text>
              ) : null}
            </View>
          </PressableHighlight>
          <View style={styles.right}>
            {!isSiteMaster && (
              <ViewMeasure ref={ref} style={styles.buttons}>
                {VIDEO_CALL_AVAILABLE && (
                  <PressableHighlight
                    onPress={() => setVideoCallModalVisible(true)}
                    style={[styles.button, styles.videoCallButton]}
                  >
                    <SvgVideoCamera
                      width="22"
                      height="22"
                      color={colors.textMain}
                    />
                    <View style={styles.paidClick}>
                      <Text style={styles.paidClickText}>C</Text>
                    </View>
                  </PressableHighlight>
                )}

                <HeaderMenuBtn duid={duid} isGoBack />
              </ViewMeasure>
            )}
          </View>
        </View>
      </SafeAreaView>

      {!placeholder && (
        <GetApproveVideoCallModal
          modalVisible={videoCallModalVisible}
          setModalVisible={setVideoCallModalVisible}
        />
      )}
    </>
  )
}

export default ChatHeader
