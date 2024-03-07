import React from 'react'
import { createContext, useCallback, useState } from 'react'

export const DeleteAccountContext = createContext()

const DeleteAccountProvider = ({ children }) => {
  const [reasonId, setReasonId] = useState(null)

  const onSetReasonId = useCallback(id => {
    setReasonId(id)
  }, [])

  return (
    <DeleteAccountContext.Provider
      value={{
        reasonId,
        onSetReasonId,
      }}
    >
      {children}
    </DeleteAccountContext.Provider>
  )
}

export default DeleteAccountProvider
