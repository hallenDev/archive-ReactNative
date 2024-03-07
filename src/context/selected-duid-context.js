import React from 'react'

const SelectedDuidContext = React.createContext()

export function useSelectedDuidContext() {
  const context = React.useContext(SelectedDuidContext)

  if (context === undefined) {
    throw new Error(
      'useSelectedDuidContext must be used within a SelectedDuidContext',
    )
  }

  return context
}

export default function SelectedDuidContextProvider({ children, value }) {
  return (
    <SelectedDuidContext.Provider value={value}>
      {children}
    </SelectedDuidContext.Provider>
  )
}
