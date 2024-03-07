import React, { useContext } from 'react'
import { View } from 'react-native'
import { CheckInternetConnectionContext } from '~/context/CheckInternetConnectionProvider'
import ErrorPage from '~/components/ErrorPage/ErrorPage'
import LinearGradient from '~/ui/LinearGradient'
import globalStyle from '~/ui/globalStyle'
import { colors } from '~/ui/theme'

const ErrorScreen = ({ navigation, route }) => {
  const { withoutConnection } = useContext(CheckInternetConnectionContext)

  return (
    <View style={globalStyle.flex}>
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <ErrorPage
          navigation={navigation}
          statusCode={route.params?.statusCode}
          title={route.params?.title}
          description={route.params?.description}
          isDisabled={withoutConnection}
        />
      </LinearGradient>
    </View>
  )
}

export const options = () => ({
  headerShown: false,
})

export default ErrorScreen
