import React from 'react'
import Inbox from '~/components/Inbox/Inbox'
import TitleHeader from '~/ui/header/TitleHeader'
import BackgroundGradient from '~/ui/background-gradient'
import { TabBarIconWithCounter, TabBarLabel } from '~/components'
import { Inbox as InboxIcon, InboxActive } from '~/ui/icons'
import useSetHeader from '~/hooks/useSetHeader'
import { MainHeader } from '~/ui'
import HeaderTitle from '~/components/HeaderTitle'

const InboxScreen = () => {
  useSetHeader(
    <MainHeader
      LeftComponent={() => <HeaderTitle title="Inbox" isMainTitle />}
    />,
    [],
  )

  return (
    <BackgroundGradient>
      <Inbox />
    </BackgroundGradient>
  )
}

export const options = () => ({
  header: () => <TitleHeader title="Inbox" />,
  tabBarLabel: props => <TabBarLabel {...props}>Inbox</TabBarLabel>,
  tabBarIcon: props => (
    <TabBarIconWithCounter
      {...props}
      Icon={InboxIcon}
      ActiveIcon={InboxActive}
      size={18}
    />
  ),
})

export default InboxScreen
