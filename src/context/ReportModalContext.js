import React from 'react'
import { createContext, useCallback, useState } from 'react'

export const ReportSuccessModalContext = createContext()

const ReportSuccessModalProvider = ({ children }) => {
  const [isShowSuccessModal, setShowSuccessModal] = useState(false)

  const onToggleReportSuccessModal = useCallback(() => {
    setShowSuccessModal(s => !s)
  }, [])

  return (
    <ReportSuccessModalContext.Provider
      value={{
        isShowSuccessModal,
        onToggleReportSuccessModal,
      }}
    >
      {children}
    </ReportSuccessModalContext.Provider>
  )
}

export default ReportSuccessModalProvider
