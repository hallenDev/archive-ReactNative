import React from 'react'
import { Dimensions, View, Modal } from 'react-native'
import ImageViewer from 'react-native-image-viewing'
import VideoPlayer from '~/ui/VideoPlayer'
import { AbsoluteBackButtonClose } from '~/ui'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'

const FullscreenMediaModalContext = React.createContext()
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default function FullscreenMediaContextProvider({ children }) {
  const [media, setMedia] = React.useState(null)
  const { type = '', uri = '', poster = '' } = media || {}
  const visible = !!uri

  return (
    <FullscreenMediaModalContext.Provider value={{ setMedia, visible }}>
      {children}

      {type === 'PHOTO' ? (
        <ImageViewer
          visible={visible}
          images={[{ uri }]}
          onRequestClose={() => setMedia(null)}
        />
      ) : (
        <Modal
          visible={visible}
          presentationStyle="fullScreen"
          animationType="slide"
          onRequestClose={setMedia}
          statusBarTranslucent
        >
          <View
            style={[globalStyle.flexCenter, { backgroundColor: colors.black }]}
          >
            <AbsoluteBackButtonClose closeAction={setMedia} safeArea />

            {type === 'VIDEO' && (
              <VideoPlayer
                uri={uri}
                videoThumbUrl={poster}
                stylesList={{ width, height }}
                isFullScreen
              />
            )}
          </View>
        </Modal>
      )}
    </FullscreenMediaModalContext.Provider>
  )
}

export function useFullscreenMediaModalContext() {
  const context = React.useContext(FullscreenMediaModalContext)

  if (context === undefined) {
    throw new Error(
      'useFullscreenMediaModalContext must be used within a FullscreenMediaModalContext',
    )
  }

  return context
}
