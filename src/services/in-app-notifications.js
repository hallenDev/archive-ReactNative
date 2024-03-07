import { initialWindowMetrics } from 'react-native-safe-area-context'

import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message'

import { typography, colors } from '~/ui/theme'

const statusBarHeight = initialWindowMetrics?.insets?.top
const style = {
  backgroundColor: colors.greenApprove,
}
const styleError = {
  backgroundColor: colors.redAlert,
}
const titleStyle = {
  ...typography.h5,
  color: colors.white,

  textAlign: 'center',
}
const textStyle = {
  textAlign: 'center',
}

export function showNotificationSuccess({
  message = '',
  description = '',
  duration = 2000,
}) {
  showMessage({
    message,
    description,
    duration,
    type: 'success',
    statusBarHeight,
    titleStyle,
    textStyle,
    style,
  })
}

export function showNotificationError({
  message = '',
  description = '',
  duration = 2000,
  autoHide = true,
}) {
  showMessage({
    message,
    description,
    duration,
    type: 'danger',
    statusBarHeight,
    titleStyle,
    textStyle,
    style: styleError,
    autoHide,
  })
}

export function hideNotification() {
  hideMessage()
}

export default FlashMessage
