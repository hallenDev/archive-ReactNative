import React, { useState } from 'react'
import { Text, View } from 'react-native'

import useSetHeader from '~/hooks/useSetHeader'
import { useSearchFilter } from '~/context/SearchFilterContext'
import LoadingScreen from '~/components/LoadingScreen'
import SearchModal from '~/components/SearchModal'
import UploadPhotoOverlay from '~/components/UploadPhotoOverlay'
import { MainHeader } from '~/ui'
import { TabBarIcon, TabBarLabel } from '~/components'

import { Match, MatchActive, HoneyDrop1, HoneyDrop2 } from '~/ui/icons'
import { MatchGame } from '~/components'
import { typography } from '~/ui/theme'

const MatchScreen = () => {
  const { matchFilter, changeMatchFilter } = useSearchFilter()

  const [loading, setLoading] = useState(true)
  const [menuModalVisible, setMenuModalVisible] = useState(false)

  const handleSearchParams = newParams => changeMatchFilter(() => newParams)
  const toggleModal = () => setMenuModalVisible(s => !s)

  useSetHeader(
    <MainHeader
      RightComponent={() => <HoneyDrop2 width={30} height={44} />}
      LeftComponent={() => <HoneyDrop1 width={30} height={44} />}
      CenterComponent={() => (
        <Text
          style={{ ...typography.titleHeader, fontSize: 44, lineHeight: 52 }}
        >
          Match
        </Text>
      )}
    />,
  )

  return (
    <LoadingScreen loading={loading}>
      <UploadPhotoOverlay />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchModal
          isMatchFilter
          onSave={handleSearchParams}
          defaultValues={matchFilter}
          modalVisible={menuModalVisible}
          disableUsername
          closeAction={toggleModal}
        />
        <MatchGame onLoading={setLoading} />
      </View>
    </LoadingScreen>
  )
}

MatchScreen.options = () => {
  return {
    tabBarLabel: props => <TabBarLabel {...props}>Match</TabBarLabel>,
    tabBarIcon: props => (
      <TabBarIcon
        {...props}
        Icon={Match}
        ActiveIcon={MatchActive}
        size={20}
        isMatch
      />
    ),
  }
}

export default MatchScreen
