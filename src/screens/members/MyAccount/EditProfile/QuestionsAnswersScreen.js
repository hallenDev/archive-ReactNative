import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import BackgroundGradient from '~/ui/background-gradient'
import EditQuestionAnswer from '~/components/EditProfile/EditQuestionAnswer'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const QuestionsAnswersScreen = () => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Question / Answer" />}
    />,
    [],
  )

  return (
    <BackgroundGradient>
      <EditQuestionAnswer />
    </BackgroundGradient>
  )
}

export default QuestionsAnswersScreen
