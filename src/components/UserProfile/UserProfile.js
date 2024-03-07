import React, { useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import useSetHeader from '~/hooks/useSetHeader'
import useProfile from '~/hooks/useProfile'
import useGetUserMedia from '~/hooks/useGetUserMedia'
import { HeaderMenuBtn } from '~/components'
import UserBlocked from '~/components/UserProfile/UserBlocked'
import ProfileMediaList from '~/components/Profile/ProfileMediaList'
import ProfileMainInfo from '~/components/Profile/ProfileMainInfo'
import ProfileMainInfoBtns from '~/components/UserProfile/ProfileMainInfoBtns'
import UserProfileButtons from '~/components/UserProfile//UserProfileButtons'
import ProfileInterests from '~/components/ProfileInterests/ProfileInterests'
import { MainHeader } from '~/ui'
import CustomScrollbar from '~/ui/CustomScrollbar'
import { isCloseToBottomPage } from '~/utils/isCloseToBottomPage'
import QualityScore from '../QualityScore/QualityScore'
import UserInactive from './UserInactive'
import ProfileQA from '../../ui/ProfileQA'
import { AboutMe } from '../../ui'
import RecordVoiceList from '../MyAccount/RecordVoiceList'
import HeaderTitle from '~/components/HeaderTitle'

const UserProfile = ({ duid, navigation, isFromChat = false }) => {
  const { data: user = {}, isLoading, refetch } = useProfile({ duid })
  const { data: myProfile } = useProfile()

  const {
    data,
    handleEndReached,
    isLoading: isUserMediaLoading,
  } = useGetUserMedia(duid)
  const scrollRef = useRef()

  const MainHeaderComponent = useMemo(() => {
    return (
      <MainHeader
        RightComponent={
          !user?.isBlockedByMe && !user?.isInactive
            ? () => (
                <HeaderMenuBtn duid={duid} isFromChat={isFromChat} isGoBack />
              )
            : undefined
        }
        withBackBtn
        withLogo={!user?.isBlockedByMe && !user?.isInactive}
        CenterComponent={
          user?.isBlockedByMe
            ? () => <HeaderTitle title="Profile Blocked" isMainTitle />
            : user?.isInactive
            ? () => <HeaderTitle title="Profile Inactive" isMainTitle />
            : undefined
        }
        parentNavigation={navigation}
      />
    )
  }, [duid, user?.isBlockedByMe, user?.isInactive, isFromChat, navigation])

  useSetHeader(MainHeaderComponent, [duid])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    })
  }, [duid])

  if (user?.isBlockedByMe) {
    return <UserBlocked duid={duid} />
  }

  if (user?.isInactive) {
    return <UserInactive navigation={navigation} />
  }

  return (
    <CustomScrollbar
      ref={scrollRef}
      contentContainerStyle={styles.contentContainerStyle}
      onScroll={({ nativeEvent }) => {
        isCloseToBottomPage(nativeEvent) && handleEndReached()
      }}
      keyboardShouldPersistTaps="handled"
    >
      <QualityScore user={user} />
      <ProfileMainInfo
        age={user?.age}
        username={user?.username}
        city={user?.city}
        isVerified={user?.isVerified}
        state_code={user?.state_code}
        country={
          myProfile?.country_code === user?.country_code ? '' : user?.country
        }
        profilePic={user?.profilePic}
        last_active={user?.last_active}
        online={user?.online}
        navigation={navigation}
        isLoading={isLoading}
      >
        <ProfileMainInfoBtns
          duid={duid}
          isFavorite={user?.isFavorite}
          matchVote={user?.matchVote}
          isMatch={user?.isMatch}
        />
      </ProfileMainInfo>
      <UserProfileButtons
        duid={user.duid}
        isFriend={user?.isFriend}
        friendStatus={user?.friendStatus}
        threadUnlocked={user?.threadUnlocked}
        profilePic={user?.profilePic}
        username={user?.username}
        gender={user?.gender}
        onThreadUnlocked={refetch}
      />
      <ProfileInterests interests={user?.interested_in} isLoading={isLoading} />

      {!!user?.about_me && <AboutMe aboutMe={user?.about_me} />}

      <RecordVoiceList duid={user.duid} isLoading={isLoading} />

      {user?.qaQuestion && (
        <ProfileQA question={user?.qaQuestion} answer={user?.qaAnswer} />
      )}

      <ProfileMediaList
        data={data}
        user={user}
        isLoading={isUserMediaLoading}
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

export default UserProfile
