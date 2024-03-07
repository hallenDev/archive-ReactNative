import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { getGiftsList, postPurchaseGift } from '~/shared/api'
import ChoseGiftModal from './ChoseGiftModal'
import GiftMessageModal from './GiftMessageModal'
import { showNotificationError } from '~/services/in-app-notifications'
import { LinearGradient, Placeholder } from '~/ui'
import { Close } from '~/ui/icons'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'
import useUserBalance from '~/hooks/useUserBalance'

export const GiftsMsgType = {
  DEFAULT_ERROR_MESSAGE: 'Message should be 10 characters',
  INSUFFICIENT_CREDITS: 'insufficient credits',
}

const GiftsModal = ({
  modalVisible,
  onCloseModal,
  duid,
  gender,
  username,
  profilePic,
}) => {
  const form = useForm()
  const navigation = useNavigation()
  const { data: creditBalance } = useUserBalance()
  const credits = creditBalance?.credits?.toLocaleString()
  const [gift, setGift] = useState()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(
    'getGiftsList',
    () => getGiftsList({ gender }),
    {
      enabled: !!gender,
    },
  )

  const { mutate, isLoading: isLoadingMutate } = useMutation(postPurchaseGift, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', duid])
      onCloseModal()
      navigation.navigate('Chat', {
        otherUserId: duid,
      })
    },
    onError: ({ data }) => {
      showSendMsgError(data?.errors)
    },
  })

  const onChooseGift = useCallback(
    id => {
      setGift(data?.gifts.find(item => item.id === id))
    },
    [data],
  )

  const onSendMessage = useCallback(
    input => {
      Keyboard.dismiss()
      mutate({ duid, message: input.message, virtual_gift_id: gift.id })
    },
    [gift, duid, mutate],
  )

  const showSendMsgError = errors => {
    const errorsMsg =
      errors?.message || errors.join(', ') || GiftsMsgType.DEFAULT_ERROR_MESSAGE

    if (errorsMsg.includes(GiftsMsgType.INSUFFICIENT_CREDITS)) {
      navigation.navigate('Payment')
      onCloseModal()
    } else {
      showNotificationError({
        message: 'Send Error',
        description: errorsMsg,
      })
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <KeyboardAvoidingView
        style={globalStyle.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <Pressable style={styles.centeredView} onPress={onCloseModal}>
          <LinearGradient
            style={styles.gradientContainer}
            colors={colors.bgGradient}
          >
            <Pressable onPress={onCloseModal} style={styles.closeBtn}>
              <Close width={28} height={28} color={colors.semiGray} />
            </Pressable>
            {isLoading ? (
              <Placeholder large />
            ) : (
              <>
                {!gift ? (
                  <ChoseGiftModal
                    onChooseGift={onChooseGift}
                    gifts={data?.gifts}
                    username={username}
                    credits={credits}
                  />
                ) : (
                  <FormProvider {...form}>
                    <GiftMessageModal
                      onSendMessage={form.handleSubmit(onSendMessage)}
                      profilePic={profilePic}
                      username={username}
                      isLoading={isLoadingMutate}
                      uri={gift?.urls[150]}
                    />
                  </FormProvider>
                )}
              </>
            )}
          </LinearGradient>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  gradientContainer: {
    width: 320,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    minHeight: 370,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
})

export default GiftsModal
