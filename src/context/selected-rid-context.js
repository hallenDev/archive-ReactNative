import React from 'react'

const SelectedRidContext = React.createContext()

export function useSelectedRidContext() {
  const context = React.useContext(SelectedRidContext)

  if (context === undefined) {
    throw new Error(
      'useSelectedRidContext must be used within a SelectedRidContext',
    )
  }

  return context
}

export default function SelectedRidContextProvider({ children, value }) {
  return (
    <SelectedRidContext.Provider value={value}>
      {children}
    </SelectedRidContext.Provider>
  )
}
