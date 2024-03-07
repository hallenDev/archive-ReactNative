import React from 'react'

const ThreadsUnreadTotalContext = React.createContext(0)

const ThreadsUnreadTotalProvider = ({ children, initialState = 0 }) => {
  const state = React.useState(initialState)

  return (
    <ThreadsUnreadTotalContext.Provider value={state}>
      {children}
    </ThreadsUnreadTotalContext.Provider>
  )
}

const useThreadsUnreadTotal = () => {
  const context = React.useContext(ThreadsUnreadTotalContext)

  if (context === undefined) {
    throw new Error(
      'useThreadsUnreadTotal must be used within a ThreadsUnreadTotalContext',
    )
  }

  return context
}

export { ThreadsUnreadTotalContext, useThreadsUnreadTotal }

export default ThreadsUnreadTotalProvider
