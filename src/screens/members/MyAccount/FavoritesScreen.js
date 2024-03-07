import React from 'react'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import FavoritesList from '~/components/friends/favorites-list'
import ReportSuccessModal from '~/components/Modals/ReportSuccessModal'
import { colors } from '~/ui/theme'

const FavoritesScreen = ({ navigation }) => {
  return (
    <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
      <FavoritesList />
      <ReportSuccessModal />
    </LinearGradient>
  )
}

FavoritesScreen.options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title="Favorites"
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default FavoritesScreen
