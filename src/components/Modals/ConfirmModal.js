import React, { memo } from 'react'
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native'
import PressableHighlight from '~/ui/PressableHighlight'
import { Placeholder, LinearGradient } from '~/ui'
import { colors, typography } from '~/ui/theme'

const ConfirmModal = ({
  Icon,
  modalVisible,
  cancelText = 'Cancel',
  approveText = 'Yes',
  approveLoading,
  description,
  info,
  onApprove = () => {},
  onCancel = () => {},
  withoutCancel = false,
}) => {
  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.centeredView} onPress={onCancel}>
        <Pressable>
          <LinearGradient
            style={styles.modalView}
            start={{ x: 0.55, y: 0.5 }}
            end={{ x: 0.0, y: 0.65 }}
            locations={[0, 0.6]}
            colors={colors.bgGradient}
          >
            {Icon && <Icon width={36} height={36} color={colors.primary} />}
            {description && <Text style={styles.title}>{description}</Text>}
            {info && <Text style={styles.info}>{info}</Text>}
            <View style={styles.buttons}>
              <PressableHighlight
                style={[styles.approve, approveLoading && styles.isDisabled]}
                onPress={onApprove}
                backgroundColor={colors.primaryShade}
                disabled={approveLoading}
              >
                {approveLoading ? (
                  <Placeholder isWhite />
                ) : (
                  <Text style={styles.approveText}>{approveText}</Text>
                )}
              </PressableHighlight>
              {!withoutCancel && (
                <PressableHighlight style={styles.decline} onPress={onCancel}>
                  <Text style={styles.declineText}>{cancelText}</Text>
                </PressableHighlight>
              )}
            </View>
          </LinearGradient>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiBlack50,
    zIndex: 10,
  },
  modalView: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
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
    ...typography.h3,
    color: colors.textMain,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
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
  info: {
    ...typography.p2,
    color: colors.textMain,
    marginTop: 10,
    textAlign: 'center',
  },
})

export default memo(ConfirmModal)
