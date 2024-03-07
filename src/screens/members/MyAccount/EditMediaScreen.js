import React from 'react'
import useSetHeader from '~/hooks/useSetHeader'
import EditMedia from '~/components/EditMedia/EditMedia'
import { MainHeader } from '~/ui'
import BackgroundGradient from '~/ui/background-gradient'

const EditMediaScreen = () => {
  useSetHeader(<MainHeader withLogo withBackBtn />)

  return (
    <BackgroundGradient>
      <EditMedia />
    </BackgroundGradient>
  )
}

export default EditMediaScreen
