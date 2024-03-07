import { useCallback, useEffect } from 'react'
import isMoreThanThreeDays from '~/utils/isMoreThanThreeDays'
import useStorage from './useStorage'
import FeedbackModal from '~/components/Modals/FeedbackModal'

const useFeedbackModal = ({ onShow }) => {
  const {
    feedbackModalShown,
    installDate,
    setInstallDate,
    setFeedbackModalShown,
  } = useStorage()

  const feedbackFetch = useCallback(() => {
    if (feedbackModalShown) return

    const moreThanOneWeek = isMoreThanThreeDays(installDate)
    if (!moreThanOneWeek) return

    onShow()
    setFeedbackModalShown(true)
  }, [])

  useEffect(() => {
    if (installDate) {
      feedbackFetch()
    } else {
      setInstallDate(new Date())
    }
  }, [installDate])

  return {
    FeedbackModal,
  }
}

export default useFeedbackModal
