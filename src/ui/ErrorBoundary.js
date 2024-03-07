import React from 'react'
import RNRestart from 'react-native-restart'

import ErrorView from './ErrorView'

export default function ErrorBoundary({ resetAction, networkError }) {
  let title = 'Something went wrong'
  let description = `There was an error.\nPlease try again later`
  const btn = 'Back to Home'

  if (networkError) {
    title = 'No Internet Connection'
    description = `You are not connected to the internet.\n Make sure your Wi-Fi is connected,\n and try again.`
  }

  return (
    <ErrorView
      title={title}
      description={description}
      btn={btn}
      action={resetAction ?? (() => RNRestart.Restart())}
    />
  )
}
