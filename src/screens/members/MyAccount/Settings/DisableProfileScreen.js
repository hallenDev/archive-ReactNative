import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Switch,
  ActivityIndicator,
} from 'react-native'
import { useMutation } from 'react-query'
import { LinearGradient } from '~/ui'
import { colors } from '~/ui/theme'
import globalStyle from '~/ui/globalStyle'
import SettingType from '~/shared/types/SettingType'
import AccountStatusMap from '~/shared/types/AccountStatusMap'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import { useUser } from '~/context/UserContext'
import { changeAccountPreferences } from '~/shared/api/members'

const DisableProfileScreen = ({ navigation }) => {
  const { user, setUser } = useUser()
  const [visible, setVisible] = React.useState(
    user?.accountStatus === AccountStatusMap.USER_DISABLED,
  )

  const { mutate: deactivateMutate, isLoading: loadingDeactive } = useMutation(
    changeAccountPreferences,
    {
      onSuccess: () => {
        setUser({ ...user, accountStatus: AccountStatusMap.USER_DISABLED })
      },
    },
  )

  const { mutate: activateMutate, isLoading } = useMutation(
    changeAccountPreferences,
    {
      onSuccess: () => {
        setUser({ ...user, accountStatus: AccountStatusMap.ACTIVE })
      },
    },
  )

  const handleVisibleChange = value => {
    setVisible(value)

    visible
      ? activateMutate({ profile_disabled: false })
      : deactivateMutate({ profile_disabled: true })
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.description}>
              We'll hide your account as if it's been deleted. But you can come
              back any time!
            </Text>
            <Switch
              value={visible}
              thumbColor={visible ? colors.primary : colors.semiGray}
              trackColor={{
                false: colors.semiGray,
                true: colors.semiGray,
              }}
              onValueChange={handleVisibleChange}
              disabled={isLoading || loadingDeactive}
            />
          </View>
          <View style={styles.horizontal}>
            <Text
              style={[
                styles.statusText,
                { color: !visible ? colors.greenApprove : colors.redAlert },
              ]}
            >
              {!visible ? 'Account is Visible' : 'Account is Hidden'}
            </Text>
            {isLoading || loadingDeactive ? (
              <ActivityIndicator color={colors.primary} />
            ) : null}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 25.6,
    letterSpacing: -0.5,
    fontWeight: '400',
    color: colors.textSub,
    flexGrow: 1,
    flexShrink: 1,
  },
  statusText: {
    fontSize: 18,
    color: colors.greenApprove,
  },
  horizontal: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title={SettingType.DISABLE_PROFILE}
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default DisableProfileScreen
