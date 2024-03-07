import React from 'react'

const RedirectNotificationContext = React.createContext()

const RedirectNotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = React.useState(null)

  return (
    <RedirectNotificationContext.Provider
      value={{ setNotification, notification }}
    >
      {children}
    </RedirectNotificationContext.Provider>
  )
}

export function useRedirectNotificationContext() {
  const context = React.useContext(RedirectNotificationContext)

  if (context === undefined) {
    throw new Error(
      'useRedirectNotificationContext must be used within a RedirectNotificationContext',
    )
  }

  return context
}

export default RedirectNotificationContextProvider
