import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'

import { showNotificationError } from '~/services/in-app-notifications'
import useReportUser from '~/hooks/useReportUser'
import { Placeholder, LinearGradient } from '~/ui'
import RadioButton from '~/ui/RadioButton'
import PressableHighlight from '~/ui/PressableHighlight'
import TextInput from '~/ui/TextInput'
import { colors, typography } from '~/ui/theme'
import { useSelectedDuidContext } from '~/context/selected-duid-context'
import { ReportSuccessModalContext } from '~/context/ReportModalContext'
import globalStyle from '~/ui/globalStyle'

const MAX_CHAR_COUNT = 2000

const config = [
  [1, 'Solicitation'],
  [2, 'Harassment'],
  [3, 'Inappropriate'],
  [4, 'Scammer'],
]

const reportedFrom = 'app_messaging'

const ReportModal = ({ modalVisible = false, setModalVisible }) => {
  const [reportedUserReasonId, setReportedUserReasonId] = React.useState()
  const [additionalInfo, setAdditionalInfo] = React.useState('')

  const reportedDuid = useSelectedDuidContext()
  const { onToggleReportSuccessModal } = useContext(ReportSuccessModalContext)

  const { mutate, isLoading } = useReportUser({
    reportedDuid,
    reportedFrom,
    reportedUserReasonId,
    additionalInfo,
    onSuccess: () => {
      successHandler()
    },
    onError: ({ data }) => {
      const description = Array.isArray(data?.errors)
        ? data?.errors[0]
        : data?.errors?.reportedDuid || data?.errors?.reportedUserReasonId

      requestCloseHandler()

      showNotificationError({
        message: 'Report',
        description: description.replace('reportedUserReasonId', 'reason'),
      })
    },
  })

  const requestCloseHandler = () => {
    setModalVisible()
  }

  const approveHandler = () => {
    mutate()
  }

  const declineHandler = () => {
    requestCloseHandler()
  }

  const successHandler = () => {
    requestCloseHandler()
    onToggleReportSuccessModal()
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={requestCloseHandler}
    >
      <KeyboardAvoidingView
        style={globalStyle.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable style={styles.centeredView} onPressIn={requestCloseHandler}>
          <Pressable onPress={() => Keyboard.dismiss()}>
            <LinearGradient
              style={styles.modalView}
              start={{ x: 0.55, y: 0.5 }}
              end={{ x: 0.0, y: 0.65 }}
              locations={[0, 0.6]}
              colors={colors.bgGradient}
            >
              <Text style={styles.title}>Report:</Text>
              <View style={styles.radiobuttons}>
                {config.map(([key, value]) => (
                  <Pressable
                    key={key}
                    style={styles.radiobutton}
                    onPress={() => setReportedUserReasonId(key)}
                  >
                    <RadioButton
                      checked={reportedUserReasonId === key}
                      onPress={() => setReportedUserReasonId(key)}
                    />
                    <Text style={styles.label}>{value}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.titleComment}>Your comments</Text>

              <TextInput
                multiline
                numberOfLines={5}
                placeholder=""
                textAlignVertical="top"
                onChangeText={e => {
                  setAdditionalInfo(e)
                }}
                value={additionalInfo}
                maxLength={MAX_CHAR_COUNT}
                inputContainterStyle={styles.inputContainterStyle}
                style={styles.textInput}
              />

              <View style={styles.buttons}>
                <PressableHighlight
                  style={[styles.approve, isLoading && styles.isDisabled]}
                  onPress={approveHandler}
                  backgroundColor={colors.primaryShade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Placeholder isWhite />
                  ) : (
                    <Text style={styles.approveText}>Yes</Text>
                  )}
                </PressableHighlight>
                <PressableHighlight
                  style={styles.decline}
                  onPress={declineHandler}
                >
                  <Text style={styles.declineText}>Cancel</Text>
                </PressableHighlight>
              </View>
            </LinearGradient>
          </Pressable>
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
  modalView: {
    margin: 20,
    minWidth: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: colors.bgBlack,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...typography.p2,
    color: colors.textMain,
  },
  titleComment: {
    ...typography.p2,
    color: colors.textMain,

    marginTop: 20,
    marginBottom: 8,
  },
  radiobuttons: {
    marginTop: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  radiobutton: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  approve: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  isDisabled: {
    opacity: 0.5,
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,
  },
  decline: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },
  declineText: {
    ...typography.p2,
    color: colors.textSub,
  },
  label: {
    ...typography.p1,
    color: colors.textSub,

    marginLeft: 20,
  },
  inputContainterStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    borderWidth: 0,
    maxHeight: 160,
  },
  textInput: {
    ...typography.p2,
    color: colors.textMain,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
})

export default ReportModal
