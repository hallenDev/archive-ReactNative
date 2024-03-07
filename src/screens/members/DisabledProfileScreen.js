import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { View, Text, StyleSheet } from 'react-native'

import { SUPPORT_EMAIL } from '~/configs/constants'

import { useUser } from '~/context/UserContext'
import useLogout from '~/hooks/useLogout'
import { changeAccountPreferences } from '~/shared/api/members'
import AccountStatusMap from '~/shared/types/AccountStatusMap'

import { SafeAreaView, Button, Placeholder } from '~/ui'

import { colors, text, typography } from '~/ui/theme'
import DeviceInfo from '~/services/DeviceInfo'
import BackgroundGradient from '~/ui/background-gradient'

const DisabledProfileScreen = ({ navigation }) => {
  const { user, setUser } = useUser()
  const { mutate: handleLogoutMutate } = useLogout()
  const { mutateAsync, isLoading } = useMutation(changeAccountPreferences)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleReactivateProfile = () => {
    setLoading(true)
    mutateAsync({ profile_disabled: false })
      .then(() => {
        setUser({ ...user, accountStatus: AccountStatusMap.ACTIVE })
      })
      .catch(() =>
        setError(
          `Currently we cannot enable your account. Please contact us to: ${SUPPORT_EMAIL}`,
        ),
      )
      .finally(() => setLoading(false))
  }

  const handleLogout = async () => {
    const deviceid = await DeviceInfo.getUniqueId()
    handleLogoutMutate({ deviceid })
  }

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Your profile is currently disabled</Text>
            <Text style={styles.body}>
              With your profile disabled, users cannot see or contact you. You
              also cannot communicate with them.
            </Text>
            <Text style={styles.body}>
              To re-enable your account, click the Reactivate button below.
            </Text>
          </View>
        </View>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <Button
            onPress={handleReactivateProfile}
            style={[styles.btn, isLoading && styles.isDisabled]}
            type="primary"
            isLoading={loading}
            isDisabled={isLoading}
          >
            {isLoading ? <Placeholder isWhite /> : 'Reactivate'}
          </Button>
        )}
        <Button type="transparent" onPress={handleLogout}>
          Log out
        </Button>
      </SafeAreaView>
    </BackgroundGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  wrapper: {
    flex: 1,
  },
  btn: {
    height: 48,
    marginTop: 8,
    marginBottom: 10,
  },
  title: {
    ...text.base,
    color: colors.textSub,
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 40,
    marginBottom: 8,
  },
  body: {
    ...text.base,
    color: colors.textSub,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 20,
  },
  error: {
    ...typography.bodyRegular14,
    color: colors.textSub,
    textAlign: 'center',
    marginBottom: 16,
  },
  isDisabled: {
    opacity: 0.5,
  },
})

export const options = () => ({
  headerShown: false,
})

export default DisabledProfileScreen
