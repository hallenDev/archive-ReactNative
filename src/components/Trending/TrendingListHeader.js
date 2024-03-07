import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { colors, typography } from '~/ui/theme'
import useProfile from '~/hooks/useProfile'
import getLocationText from '~/utils/getLocationText'
import FeedType from '~/shared/types/FeedType'
import noop from '~/utils/noop'

const widths = ['21%', '21%', '21%', '32%']

const TrendingListHeader = ({ filter, onChange = noop }) => {
  const navigation = useNavigation()
  const { data: user } = useProfile()

  const trendingFilter = filter || 'recent'

  return (
    <>
      <View style={styles.container}>
        {Object.keys(FeedType).map((item, index) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterItem,
              trendingFilter === item && styles.selectedItem,
              { width: widths[index] },
            ]}
            onPress={() => onChange(item)}
          >
            <Text style={styles.filterText} allowFontScaling={false}>
              {FeedType[item]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {filter === 'near_me' && (
        <TouchableHighlight
          style={styles.locationLink}
          onPress={() => navigation.navigate('LocationScreen')}
          underlayColor="transparent"
        >
          <Text style={styles.location}>{getLocationText(user)}</Text>
        </TouchableHighlight>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  location: {
    ...typography.p2,
    color: colors.textMain,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  filterItem: {
    backgroundColor: colors.inactiveButtonBg,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 100,
    maxWidth: 300,
  },
  filterText: {
    ...typography.p2,
    fontSize: Dimensions.get('window').width < 375 ? 11 : 12,
    color: colors.textMain,
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: colors.primaryGradient[1],
  },
  locationLink: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
})

export default TrendingListHeader
