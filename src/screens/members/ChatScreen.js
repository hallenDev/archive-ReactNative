import React from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  NativeModules,
} from 'react-native'
import { colors } from '~/ui/theme'
import Chats from '~/components/Chat/Chats'
import ChatSendInput from '~/components/Chat/ChatSendInput'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import ChatHeader from '~/ui/header/ChatHeader'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { HEADER_HEIGHT } from '../../configs/constants'

const ChatScreen = ({ navigation, route }) => {
  const chatsRef = React.createRef()
  const otherUserId = String(route?.params?.otherUserId)

  const handleContentSizeChange = () => {
    // chatsRef?.current?.scrollToEnd({animated: false})
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#06031d' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={
            Platform.OS === 'ios'
              ? NativeModules.StatusBarManager.HEIGHT + HEADER_HEIGHT
              : 70
          }
          style={globalStyle.flex}
        >
          <View style={styles.list}>
            <Chats
              ref={chatsRef}
              otherUserId={otherUserId}
              onContentSizeChange={handleContentSizeChange}
              navigation={navigation}
            />
          </View>
          <ChatSendInput
            navigation={navigation}
            otherUserId={otherUserId}
            onContentSizeChange={handleContentSizeChange}
          />
          <ReportSuccessModal withGoBack />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export const options = () => ({
  header: () => <ChatHeader placeholder />,
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null,
})

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',

    alignItems: 'flex-end',
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        // flex: 1,
      },
    }),
  },
})

export default ChatScreen
