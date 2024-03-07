import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '~/ui/Button'
import noop from '~/utils/noop'
import { typography, colors } from '~/ui/theme'

const ActionSheetSubmitWithCancel = ({
  title = '',
  description = null,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onSubmitPress = noop,
  onCancelPress = noop,
  isLoading,
  titleStyle,
  descriptionStyle,
  buttonStyle,
}) => (
  <>
    <Text style={[styles.title, titleStyle]}>{title}</Text>
    {typeof description === 'string' ? (
      <Text style={[styles.description, descriptionStyle]}>{description}</Text>
    ) : (
      description
    )}
    <View style={styles.buttons}>
      <Button
        style={styles.submit}
        type="primary"
        onPress={onSubmitPress}
        isLoading={isLoading}
      >
        {submitText}
      </Button>
      <Button
        type="cancel"
        style={styles.cancel}
        textStyle={buttonStyle}
        onPress={onCancelPress}
      >
        {cancelText}
      </Button>
    </View>
  </>
)

const styles = StyleSheet.create({
  title: {
    ...typography.subtitle2Semibold,
    color: colors.textMain,
    marginBottom: 20,
  },
  description: {
    ...typography.bodyRegular14,
    color: colors.grey,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
  },
  submit: {
    flex: 1,
    height: 46,
    minHeight: 46,
    marginRight: 12,
  },
  cancel: {
    flex: 1,
    height: 46,
    minHeight: 46,
  },
})

export default ActionSheetSubmitWithCancel
