import React, { useCallback } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { debounce } from 'lodash'

import Autocomplete from '~/ui/Autocomplete'
import { fetchCitites } from '~/shared/api/members'
import { colors, typography } from '~/ui/theme'
import getLocationText from '~/utils/getLocationText'

const MyAccountAutocompleteCity = ({
  country = '',
  defaultValue = '',
  onChange,
}) => {
  const isMountRef = React.useRef(false)
  const [text, setText] = React.useState(defaultValue)
  const [cities, setCities] = React.useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFetchCities = useCallback(
    debounce(city => {
      fetchCitites({ country, city }).then(resp => {
        setCities(resp)
      })
    }, 300),
    [],
  )

  React.useEffect(() => {
    if (isMountRef.current) {
      setText('')
      setCities([])
    }
  }, [country])

  React.useEffect(() => {
    if (text?.length < 2) return

    const city = text.split(',')?.[0]
    if (isMountRef.current) {
      debounceFetchCities(city)
    }

    isMountRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <View style={styles.wrapper}>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          inputContainerStyle={styles.inputContainerStyle}
          listContainerStyle={[
            styles.listContainerStyle,
            { borderWidth: cities?.length ? 1 : 0 },
          ]}
          data={cities?.map(v =>
            getLocationText({ countryCode: country, ...v }),
          )}
          style={styles.autoComplete}
          selectionColor={colors.primary}
          value={text}
          onChangeText={setText}
          placeholder="Enter City"
          placeholderTextColor={colors.textSub}
          flatListProps={{
            nestedScrollEnabled: true,
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setText(item)

                  const locationId = cities?.find(
                    v =>
                      item === getLocationText({ countryCode: country, ...v }),
                  )?.locationId

                  onChange({ location_id: locationId, location: item })

                  isMountRef.current = false
                  setCities([])
                }}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    minHeight: 50,
    zIndex: 10,
  },
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  autoComplete: {
    fontSize: 15,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 15,
    color: colors.textMain,
  },
  title: {
    ...typography.bodyBold14,
    marginVertical: 12,
  },
  marginTop20: {
    marginTop: 20,
  },
  link: {
    marginTop: 60,
    alignItems: 'center',
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#71587a',
  },
  text: {
    ...typography.bodyRegular14,
    color: colors.white,
    paddingHorizontal: 10,
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  listContainerStyle: {
    top: 3,
    backgroundColor: '#1A0562',
    borderColor: '#71587a',
    borderWidth: 1,
    maxHeight: 150,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
})

export default MyAccountAutocompleteCity
