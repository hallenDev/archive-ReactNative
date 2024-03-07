import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import useProfile from '~/hooks/useProfile'
import useGetUserMedia from '~/hooks/useGetUserMedia'
import ProfileMediaList from '~/components/Profile/ProfileMediaList'
import ProfileMainInfo from '~/components/Profile/ProfileMainInfo'
import MyAccountCounters from '~/components/MyAccount/MyAccountCounters'
import ProfileInterests from '~/components/ProfileInterests/ProfileInterests'
import AddMediaBtn from '~/components/MyAccount/AddMediaBtn'
import ProfileMainInfoBtn from '~/components/Profile/ProfileMainInfoBtn'
import RecordVoiceList from '~/components/MyAccount/RecordVoiceList'
import { AboutMe } from '~/ui'
import ProfileQA from '~/ui/ProfileQA'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { Pencil } from '~/ui/icons'
import { isCloseToBottomPage } from '~/utils/isCloseToBottomPage'
import QualityScore from '../QualityScore/QualityScore'
import { useSubscribeToChannel } from '~/hooks/useSubscribeToChannel'

const HEIGHT = Dimensions.get('window').height
const BOTOM_INDET = 500

const MyProfile = ({ navigation }) => {
  const ref = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState('bottom')

  const {
    data: user = {},
    isLoading: isLoadingUserData,
    refetch,
  } = useProfile()

  const {
    data,
    handleEndReached,
    refetch: refetchMedia,
    isLoading,
  } = useGetUserMedia(user?.duid)

  const handleDeclineImages = useCallback(
    message => {
      if (
        message.msg_type === 'refresh_user_data' &&
        message?.payload?.reason === 'no_pics'
      ) {
        refetch()
        refetchMedia()
      }
    },
    [refetch, refetchMedia],
  )

  const onChangeDropdownPosition = () => {
    ref.current.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition(pageY + BOTOM_INDET > HEIGHT ? 'top' : 'bottom')
    })
  }

  useSubscribeToChannel(handleDeclineImages)

  return (
    <CustomScrollbar
      contentContainerStyle={styles.contentContainerStyle}
      onScroll={({ nativeEvent }) => {
        isCloseToBottomPage(nativeEvent) && handleEndReached()
        onChangeDropdownPosition()
      }}
    >
      <QualityScore user={user} />
      <ProfileMainInfo
        age={user?.age}
        username={user?.username}
        city={user?.city}
        state_code={user?.state_code}
        country={user?.country}
        isVerified={user?.isVerified}
        profilePic={user?.profilePic}
        navigation={navigation}
        isLoading={isLoadingUserData}
      >
        <ProfileMainInfoBtn
          title="Edit Profile"
          Icon={Pencil}
          onAction={() => navigation.navigate('EditProfile')}
          isLoading={isLoadingUserData}
        />
        <View style={{ width: 8 }} />
      </ProfileMainInfo>
      <MyAccountCounters
        navigation={navigation}
        isLoading={isLoadingUserData}
      />
      <AddMediaBtn navigation={navigation} />

      <ProfileInterests
        interests={user?.interested_in}
        isLoading={isLoadingUserData}
      />
      {!!user?.about_me && <AboutMe aboutMe={user?.about_me} />}

      <View ref={ref} onLayout={onChangeDropdownPosition}>
        <RecordVoiceList
          duid={user.duid}
          isLoading={isLoadingUserData}
          dropdownPosition={dropdownPosition}
        />
      </View>

      {user?.qaQuestion && (
        <ProfileQA question={user?.qaQuestion} answer={user?.qaAnswer} />
      )}
      <ProfileMediaList
        data={data}
        user={user}
        isMyProfile
        isLoading={isLoading}
      />
    </CustomScrollbar>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 100,
  },
})

export default MyProfile
