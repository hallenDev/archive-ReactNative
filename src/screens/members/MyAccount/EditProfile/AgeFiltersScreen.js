import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import BackgroundGradient from '~/ui/background-gradient'
import { MainHeader } from '~/ui'
import EditAgeFilters from '~/components/EditProfile/EditAgeFilters'
import HeaderTitle from '~/components/HeaderTitle'

const AgeFiltersScreen = ({ route }) => {
  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Age Filters" />}
    />,
    [route.name],
  )

  return (
    <BackgroundGradient>
      <EditAgeFilters />
    </BackgroundGradient>
  )
}

export default AgeFiltersScreen
