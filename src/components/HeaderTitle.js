import React from 'react'
import { Text, View } from 'react-native'
import { headerTitleStyles as styles } from '~/styles'
import { HeaderHoney } from '~/ui/icons'

const HeaderTitle = ({ title, isMainTitle }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <HeaderHoney width={30} height={40} style={{ marginRight: 16 }} />
    <Text style={[styles.title, isMainTitle && styles.isMainTitle]}>
      {title}
    </Text>
  </View>
)

export default HeaderTitle
