import React from 'react'

export const SelectedThreadIdContext = React.createContext()

export function useSelectedThreadIdContext() {
  const context = React.useContext(SelectedThreadIdContext)

  if (context === undefined) {
    throw new Error(
      'useSelectedthreadIdContext must be used within a SelectedThreadIdContext',
    )
  }

  return context
}

export default function SelectedThreadIdProvider({ children, value }) {
  return (
    <SelectedThreadIdContext.Provider value={value}>
      {children}
    </SelectedThreadIdContext.Provider>
  )
}
