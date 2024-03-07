import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function useSetHeader(renderHeader = () => null, deps = []) {
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({ header: () => renderHeader }, [...deps])
  }, [deps, navigation, renderHeader])
}
