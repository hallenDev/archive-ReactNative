import React, { createContext, useState, useCallback } from 'react'

export const BlurHeaderContext = createContext()

const BlurHeaderProvider = ({ children }) => {
  const [isBlurHeader, setSetBlurHeader] = useState(false)

  const handleBlurHeader = useCallback(param => {
    setSetBlurHeader(param)
  }, [])

  return (
    <BlurHeaderContext.Provider value={{ isBlurHeader, handleBlurHeader }}>
      {children}
    </BlurHeaderContext.Provider>
  )
}

export default BlurHeaderProvider
