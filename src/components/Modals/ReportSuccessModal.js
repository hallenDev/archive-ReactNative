import React, { useContext } from 'react'
import { StyleSheet, View, Text, Pressable, Modal, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ReportSuccessModalContext } from '~/context/ReportModalContext'
import { LinearGradient } from '~/ui'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'

const ReportSuccessModal = ({ withGoBack = false }) => {
  const { onToggleReportSuccessModal, isShowSuccessModal } = useContext(
    ReportSuccessModalContext,
  )

  const navigation = useNavigation()

  const onHideModal = () => {
    onToggleReportSuccessModal()
    withGoBack && navigation.goBack()
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isShowSuccessModal}
      onRequestClose={onToggleReportSuccessModal}
    >
      <Pressable
        style={styles.centeredView}
        onPressIn={onToggleReportSuccessModal}
      >
        <LinearGradient
          style={styles.modalView}
          start={{ x: 0.55, y: 0.5 }}
          end={{ x: 0.0, y: 0.65 }}
          locations={[0, 0.6]}
          colors={colors.bgGradient}
        >
          <View style={styles.success}>
            <Image
              source={require('~/assets/images/local/loading-spinner.png')}
              style={styles.logo}
            />
            <Text style={styles.successTitle}>Thank you</Text>
            <Text style={styles.successDescription}>
              The information you provided is very important to us. Every report
              helps us to make our service safe and comfortable for everyone.
            </Text>
            <PressableHighlight
              style={[styles.approve, { width: '100%' }]}
              onPress={onHideModal}
              backgroundColor={colors.primaryShade}
            >
              <Text style={styles.approveText}>Continue</Text>
            </PressableHighlight>
          </View>
        </LinearGradient>
      </Pressable>
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
  approve: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: {
    ...typography.p2,
    color: colors.textMain,
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
})

export default ReportSuccessModal
