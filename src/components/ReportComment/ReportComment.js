import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Pressable,
  Text,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { showNotificationError } from '~/services/in-app-notifications'
import { report, reportResolver as resolver } from '~/shared/api/members'
import {
  KeyboardAvoidingView,
  InputField,
  SelectBoxField,
  FormErrors,
} from '~/ui'
import CustomScrollbar from '~/ui/CustomScrollbar'
import ButtonGradient from '~/ui/ButtonGradient'
import { colors, typography } from '~/ui/theme'
import { APP_DISPLAY_NAME } from '../../configs/constants'

const commentsConfig = {
  1: 'Solicitation',
  2: 'Harassment',
  3: 'Inappropriate',
  4: 'Scammer',
}

const reportedFrom = 'app_messaging'

const ReportComment = ({ duid }) => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const form = useForm({
    resolver,
    reValidateMode: 'onSubmit',
  })

  const { mutate, isLoading } = useMutation(report, {
    onSuccess: () => {
      queryClient.invalidateQueries('block')
      queryClient.invalidateQueries('msgInbox')
      queryClient.invalidateQueries('comments')

      onToggleModal()
    },
    onError: ({ data }) => {
      const description = Array.isArray(data?.errors)
        ? data?.errors[0]
        : data?.errors?.reportedDuid || data?.errors?.reportedUserReasonId

      showNotificationError({
        message: 'Report',
        description,
      })
    },
  })

  const onGoBack = () => navigation.goBack()

  const onSubmit = input => {
    mutate({
      reportedDuid: duid,
      reportedFrom,
      reportedUserReasonId: input.reason,
      additionalInfo: `${input?.comment} from ${APP_DISPLAY_NAME} app`,
    })
  }

  const onToggleModal = () => {
    setIsOpenModal(s => !s)
  }

  return (
    <>
      <FormProvider {...form}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
          >
            <CustomScrollbar
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              contentContainerStyle={styles.contentContainerStyle}
            >
              <View style={styles.content}>
                <SelectBoxField name="reason" values={commentsConfig} />

                <View style={styles.inputContainer}>
                  <InputField
                    name="comment"
                    description="Your comments"
                    multiline
                    maxLength={500}
                    inputStyle={styles.input}
                  />
                </View>
                <ButtonGradient
                  title="Save"
                  className={styles.btn}
                  onAction={form.handleSubmit(onSubmit)}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                />
              </View>
            </CustomScrollbar>
          </KeyboardAvoidingView>
        </View>
        <FormErrors />
      </FormProvider>

      {isOpenModal && (
        <Modal
          animationType="fade"
          transparent
          visible={isOpenModal}
          onRequestClose={onGoBack}
        >
          <Pressable style={styles.centeredView} onPress={onGoBack}>
            <Pressable style={styles.modalView}>
              <View style={styles.success}>
                <Image
                  source={require('~/assets/images/local/loading-spinner.png')}
                  style={styles.logo}
                />
                <Text style={styles.successTitle}>Thank you</Text>
                <Text style={styles.successDescription}>
                  The information you provided is very important to us, every
                  report helps us to make our service safe and comfortable for
                  everyone.
                </Text>
                <ButtonGradient
                  title="Continue"
                  className={styles.btnModal}
                  onAction={onGoBack}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  wrapper: {
    flex: 1,
  },
  content: {
    padding: 20,
    width: '100%',
    paddingTop: 40,
  },
  btn: {
    marginTop: 50,
  },
  input: {
    minHeight: 160,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.semiTransparentWhite15,
    paddingTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiBlack50,
    zIndex: 10,
  },
  modalView: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: colors.bgBlack,

    shadowColor: colors.bgBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  success: {
    marginVertical: 12,
    alignItems: 'center',
  },
  successTitle: {
    ...typography.h3,
    color: colors.textMain,

    marginVertical: 20,
  },
  successDescription: {
    ...typography.p2,
    color: colors.textMain,

    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  btnModal: {
    maxHeight: 40,
  },
  contentContainerStyle: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
})

export default ReportComment
