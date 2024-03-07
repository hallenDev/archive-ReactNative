import React from 'react'
import Bugsnag from '@bugsnag/react-native'

Bugsnag.start()

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

export default ErrorBoundary
