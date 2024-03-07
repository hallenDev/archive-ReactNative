import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, LinearGradient, Overlay, Placeholder } from '~/ui'
import noop from '~/utils/noop'
import { Coin } from '~/ui/icons'
import SvgAttention from './icons/Attention'
import { colors, typography } from '~/ui/theme'

const QuestionPopup = ({
  questionText,
  buttonText = 'Continue',
  cancelText = 'Cancel',
  isShowCredits = false,
  credits,
  onContinue = noop,
  onClose = noop,
  isLoading = false,
  isOnlyContinue = false,
  hideCancel = false,
}) => (
  <>
    <Overlay />
    <View style={styles.container}>
      <LinearGradient
        style={styles.modalView}
        start={{ x: 0.55, y: 0.5 }}
        end={{ x: 0.0, y: 0.65 }}
        locations={[0, 0.6]}
        colors={colors.bgGradient}
      >
        <SvgAttention style={styles.warningIcon} width={30} height={30} />
        <Text style={styles.question}>{questionText}</Text>

        {isShowCredits && (
          <View style={styles.creditContainer}>
            <Text style={styles.creditTxt}>Credit Balance: </Text>
            <Coin
              width={12}
              height={12}
              color={colors.semiGray}
              style={styles.coin}
            />
            <Text style={styles.creditTxt}>{credits}</Text>
          </View>
        )}

        <View style={styles.actionsWrap}>
          <Button
            type="primary"
            style={styles.continueBtn}
            onPress={() => {
              onContinue()
              !isOnlyContinue && onClose()
            }}
          >
            {isLoading ? <Placeholder isWhite /> : buttonText}
          </Button>
          {!hideCancel && (
            <Button
              type="transparent"
              style={styles.cancelBtn}
              onPress={onClose}
            >
              {cancelText}
            </Button>
          )}
        </View>
      </LinearGradient>
    </View>
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  modalView: {
    marginHorizontal: 25,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 280,
  },
  warningIcon: {
    color: colors.primary,
    alignSelf: 'center',
  },
  question: {
    ...typography.p1,
    color: colors.primary,
    textAlign: 'center',
  },
  actionsWrap: {
    marginTop: 8,
  },
  cancelBtn: {
    marginTop: 10,
  },
  creditContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditTxt: {
    ...typography.p3,
    color: colors.semiGray,
  },
  coin: {
    marginRight: 5,
  },
})

export default QuestionPopup
