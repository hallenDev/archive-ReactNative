import React, { useState, useCallback, useRef } from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import useFeedbackModal from '~/hooks/useFeedbackModal'
import TrendingList from '~/components/Trending/TrendingList'
import UploadPhotoOverlay from '~/components/UploadPhotoOverlay'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import { MainHeader } from '~/ui'
import ActionSheet from '~/ui/actionsSheet/ActionSheet'
import BackgroundGradient from '~/ui/background-gradient'
import { Trending, TrendingActive } from '~/ui/icons'
import {
  TabBarIcon,
  TabBarLabel,
  AddMediaBtn,
  AddMediaModal,
} from '~/components'
import HeaderTitle from '~/components/HeaderTitle'

const TrendingScreen = ({ route }) => {
  const [addMediaModalVisible, setAddMediaModalVisible] = useState(false)

  const actionSheetRef = useRef(null)
  const { FeedbackModal } = useFeedbackModal({
    onShow: () => actionSheetRef.current?.show(),
  })

  const toggleAddMediaModal = useCallback(() => {
    setAddMediaModalVisible(s => !s)
  }, [])

  useSetHeader(
    <MainHeader
      LeftComponent={() => <HeaderTitle title="Trending" isMainTitle />}
      RightComponent={() => <AddMediaBtn onOpenModal={toggleAddMediaModal} />}
    />,
    [route.name],
  )

  return (
    <>
      <BackgroundGradient>
        <UploadPhotoOverlay />
        <TrendingList />

        <ReportSuccessModal />
        <AddMediaModal
          addMediaModalVisible={addMediaModalVisible}
          onHideAttachMediaModal={toggleAddMediaModal}
          withApproveModal
        />
      </BackgroundGradient>

      <ActionSheet ref={actionSheetRef}>
        <FeedbackModal onHide={() => actionSheetRef.current?.hide()} />
      </ActionSheet>
    </>
  )
}

export const options = () => ({
  headerShown: false,
  tabBarLabel: props => <TabBarLabel {...props}>Trending</TabBarLabel>,
  tabBarIcon: props => (
    <TabBarIcon
      {...props}
      Icon={Trending}
      ActiveIcon={TrendingActive}
      size={16}
    />
  ),
})

export default TrendingScreen
