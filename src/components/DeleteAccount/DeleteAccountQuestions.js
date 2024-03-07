import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { DeleteAccountContext } from '~/context/DeleteAccountProvider'
import DeviceInfo from '~/services/DeviceInfo'
import { showNotificationError } from '~/services/in-app-notifications'
import useLogout from '~/hooks/useLogout'
import { removeGdprReason } from '~/shared/api/members'
import Button from '~/ui/Button'
import ButtonGradient from '~/ui/ButtonGradient'
import { Attention } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const DeleteAccountQuestions = ({ onDeleteAccount }) => {
  const navigation = useNavigation()
  const { reasonId } = useContext(DeleteAccountContext)

  const [isDeleted, setIsDeleted] = useState(false)

  const { mutate: handleLogoutMutate } = useLogout()
  const { mutate, isLoading } = useMutation(removeGdprReason, {
    onSuccess: () => {
      setIsDeleted(true)
    },
    onError: ({ data }) => {
      showNotificationError({
        description: data?.errors?.[0],
      })
    },
  })

  const handleDeleteAccount = () => {
    mutate({ reasonId })
  }

  const onLogOut = async () => {
    const deviceid = await DeviceInfo.getUniqueId()

    handleLogoutMutate({ deviceid })
  }

  return (
    <View style={[styles.container, reasonId && styles.isReasonId]}>
      <View style={[styles.header, isDeleted && styles.isDeleted]}>
        {reasonId && <Attention style={styles.svg} />}
        <Text style={styles.title}>
          {isDeleted
            ? 'Your account has been deleted'
            : 'Delete Account Confirmation'}
        </Text>
      </View>
      {!isDeleted && (
        <Text style={[styles.description, styles.marginDescription]}>
          Permanently delete your account and information. Once the deletion
          process begins, you will not be able to retrieve any account
          information.
        </Text>
      )}
      {!isDeleted && (
        <>
          {reasonId && (
            <Button
              type="transparent"
              textStyle={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              No, I want to stay
            </Button>
          )}
          <ButtonGradient
            title="Delete account"
            onAction={reasonId ? handleDeleteAccount : onDeleteAccount}
            className={[styles.btnGradient, reasonId && styles.marginTopBtn]}
            isLoading={isLoading}
            isDisabled={isLoading}
          />

          {!reasonId && (
            <Button
              type="transparent"
              style={styles.marginTopBtn}
              textStyle={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              No, I want to stay
            </Button>
          )}
        </>
      )}
      {isDeleted && (
        <ButtonGradient
          title="Go To The Home Page"
          onAction={onLogOut}
          className={[styles.btnGradient, styles.goHomeBtn]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  isReasonId: {
    marginTop: '50%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  svg: {
    marginRight: 10,
    color: colors.redAlert,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '600',
    color: colors.textSub,
  },
  description: {
    fontSize: 16,
    lineHeight: 25.6,
    letterSpacing: -0.5,
    fontWeight: '400',
    color: colors.textSub,
  },
  marginDescription: {
    marginTop: 20,
    marginBottom: 40,
  },
  marginTopBtn: {
    marginTop: 20,
  },
  cancelBtn: {
    ...typography.p2,
    color: colors.white,
  },
  btnGradient: {
    height: 45,
  },
  goHomeBtn: {
    marginTop: 80,
  },
  isDeleted: {
    justifyContent: 'center',
  },
})

export default DeleteAccountQuestions
