import React from 'react'
import { createContext, useCallback, useState } from 'react'

export const UnmountPagesContext = createContext()

const UnmountPagesProvider = ({ children }) => {
  const [isUnmount, setIsUnmount] = useState(false)

  const onSetIsUnmount = useCallback(() => {
    setIsUnmount(true)
  }, [])

  return (
    <UnmountPagesContext.Provider
      value={{
        isUnmount,
        onSetIsUnmount,
      }}
    >
      {children}
    </UnmountPagesContext.Provider>
  )
}

export default UnmountPagesProvider
