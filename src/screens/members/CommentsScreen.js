import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  NativeModules,
} from 'react-native'
import { MainHeader } from '~/ui'
import { useUser } from '~/context/UserContext'
import CommentSendInput from '~/components/Comments/CommentSendInput'
import Comments from '~/components/Comments/Comments'
import { HeaderMenuBtn } from '~/components'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import useSetHeader from '~/hooks/useSetHeader'
import { HEADER_HEIGHT } from '../../configs/constants'
import HeaderTitle from '~/components/HeaderTitle'

const ContentScreen = ({ route, navigation }) => {
  const contentId = route?.params?.contentId
  const duid = route?.params?.duid
  const [commentDate, setCommentDate] = useState()
  const commentInputRef = useRef()

  const {
    user: { duid: myDuid },
  } = useUser()

  useSetHeader(
    <MainHeader
      CenterComponent={() => <HeaderTitle title="Comments" />}
      RightComponent={
        parseInt(duid, 10) === parseInt(myDuid, 10)
          ? undefined
          : () => <HeaderMenuBtn duid={duid} />
      }
      withBackBtn
      parentNavigation={navigation}
    />,
    [route.name],
  )

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, styles.container]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <KeyboardAvoidingView
          style={globalStyle.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={
            Platform.OS === 'ios'
              ? NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT
              : 70
          }
        >
          <Comments
            duid={duid}
            contentId={contentId}
            setCommentDate={setCommentDate}
            handlePressComment={() => commentInputRef.current?.focus()}
            parentNavigation={navigation}
          />
          <CommentSendInput
            ref={commentInputRef}
            contentId={contentId}
            setCommentDate={setCommentDate}
            commentDate={commentDate}
          />
          <ReportSuccessModal withGoBack />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#06031d',
  },
})

export default ContentScreen
