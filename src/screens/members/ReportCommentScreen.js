import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import BackgroundGradient from '~/ui/background-gradient'
import ReportComment from '~/components/ReportComment/ReportComment'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const ReportCommentScreen = ({ route }) => {
  const { duid } = route?.params

  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Report" />}
    />,
    [],
  )

  return (
    <BackgroundGradient>
      <ReportComment duid={duid} />
    </BackgroundGradient>
  )
}

export default ReportCommentScreen
