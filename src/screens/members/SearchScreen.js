import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

import useSetHeader from '~/hooks/useSetHeader'
import { useSearchFilter } from '~/context/SearchFilterContext'
import UploadPhotoOverlay from '~/components/UploadPhotoOverlay'
import SearchModal from '~/components/SearchModal'
import BackgroundGradient from '~/ui/background-gradient'
import SearchResult from '~/components/search/search-result'
import FilterPillsList from '~/components/search/FilterPillsList'
import OnlineUserBtn from '~/components/search/OnlineUserBtn'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import { MainHeader } from '~/ui'
import { TabBarIcon, TabBarLabel } from '~/components'
import FilterButton from '~/ui/FilterButton'
import { Search, SearchActive } from '~/ui/icons'
import HeaderTitle from '~/components/HeaderTitle'

const SearchScreen = ({ route }) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false)

  const { searchFilter, changeSearchFilter } = useSearchFilter()

  const toggleModal = useCallback(() => {
    setMenuModalVisible(s => !s)
  }, [])

  const handleSearchParams = newParams => {
    changeSearchFilter(prevParams => ({
      searchType: prevParams.searchType,
      ...newParams,
    }))
  }

  useSetHeader(
    <MainHeader
      LeftComponent={() => <HeaderTitle title={route.name} isMainTitle />}
      RightComponent={() => <FilterButton showSearchModal={toggleModal} />}
      CenterComponent={() => <OnlineUserBtn />}
    />,
    [route.name, toggleModal],
  )

  return (
    <BackgroundGradient>
      <UploadPhotoOverlay />
      <SearchModal
        onSave={handleSearchParams}
        defaultValues={searchFilter}
        modalVisible={menuModalVisible}
        closeAction={toggleModal}
      />
      <View style={styles.container}>
        <FilterPillsList />
      </View>
      {!menuModalVisible && <SearchResult />}
      <ReportSuccessModal />
    </BackgroundGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
})

export const options = () => ({
  tabBarLabel: props => <TabBarLabel {...props}>Search</TabBarLabel>,
  tabBarIcon: props => (
    <TabBarIcon {...props} Icon={Search} ActiveIcon={SearchActive} size={16} />
  ),
})

export default SearchScreen
