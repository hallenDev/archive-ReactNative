import React, { useEffect, useRef, useState } from 'react'
import { checkVersion } from 'react-native-check-version'

import { useUser } from '~/context/UserContext'
import FullscreenMediaContextProvider from '~/context/fullscreen-media-modal-context'
import ThreadsUnreadTotalProvider from '~/context/ThreadsUnreadTotalContext'
import SearchFilterProvider from '~/context/SearchFilterContext'
import RedirectNotificationContextProvider from '~/context/RedirectNotificationContext'
import UnmountPagesProvider from '~/context/UnmountPagesProvider'
import PublicNavigator from './PublicNavigator'
import MembersNavigator from './MembersNavigator'
import { Linking, Modal, Platform } from 'react-native'
import QuestionPopup from '~/ui/QuestionPopup'
import AccountStatusMap from '~/shared/types/AccountStatusMap'
import DisabledUserNavigator from './DisabledUserNavigator'

const Navigator = () => {
  const { isSignedIn, user } = useUser()
  const [visible, setVisible] = useState(false)
  const versionRef = useRef()

  const gotoStore = () => {
    if (Platform.OS === 'ios') {
      const link = versionRef.current.url.replace('https://', 'itms-apps://')
      Linking.canOpenURL(link).then(
        supported => {
          supported && Linking.openURL(link)
        },
        err => console.log(err),
      )
    } else {
      Linking.openURL(versionRef.current.url)
    }
  }

  useEffect(() => {
    const checkAppVersion = async () => {
      const version = await checkVersion()
      versionRef.current = version

      if (version.needsUpdate) {
        setVisible(true)
      }
    }

    checkAppVersion()
  }, [])

  return (
    <>
      {isSignedIn ? (
        <RedirectNotificationContextProvider>
          <FullscreenMediaContextProvider>
            <ThreadsUnreadTotalProvider>
              <SearchFilterProvider>
                <UnmountPagesProvider>
                  {user?.accountStatus === AccountStatusMap.USER_DISABLED ? (
                    <DisabledUserNavigator />
                  ) : (
                    <MembersNavigator user={user} />
                  )}
                </UnmountPagesProvider>
              </SearchFilterProvider>
            </ThreadsUnreadTotalProvider>
          </FullscreenMediaContextProvider>
        </RedirectNotificationContextProvider>
      ) : (
        <PublicNavigator />
      )}

      <Modal animationType="none" transparent visible={visible}>
        <QuestionPopup
          questionText="Hi, looks like there is a new version of the app in the store, please update before continuing."
          buttonText="Go to store"
          cancelText="Exit"
          isOnlyContinue
          hideCancel
          onContinue={() => gotoStore()}
        />
      </Modal>
    </>
  )
}

export default Navigator
