import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { TouchableOpacity, TextInput, View, Text } from 'react-native'
import { useFormContext, Controller } from 'react-hook-form'
import Autocomplete from 'react-native-autocomplete-input'

import { fetchCitites } from '~/shared/api/members'

import getLocationText from '~/utils/getLocationText'

import { colors } from '~/ui/theme'
import noop from '~/utils/noop'
import { locationInputStyles as styles } from '~/styles'

const LocationInputComp = (
  {
    description,
    error,
    value,
    onChangeText,
    onLocationIdChange,
    inputStyle,
    countryCode,
    hideCounter,
    ...p
  },
  ref,
) => {
  const isMountRef = useRef(false)

  const [text, setText] = useState(value)
  const [cities, setCities] = useState([])
  const isLocationSelectedRef = useRef(false)

  useEffect(() => {
    if (isMountRef.current) {
      setText('')
      setCities([])
    }
  }, [countryCode])

  useEffect(() => {
    onChangeText(text)

    if (text?.length < 2) return

    const city = text.split(',')?.[0]

    isMountRef.current &&
      fetchCitites({ countryCode, city }).then(resp => {
        setCities(resp)
        isLocationSelectedRef.current = false
      })

    isMountRef.current = true
  }, [countryCode, text])

  return (
    <>
      {description && (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}

      <Autocomplete
        renderTextInput={props => (
          <TextInput
            {...p}
            {...props}
            value={text}
            placeholderTextColor={colors.placeholder.color}
            style={[styles.input, inputStyle]}
            selectionColor={colors.primary}
          />
        )}
        inputContainerStyle={[styles.container, error && styles.error]}
        listContainerStyle={[
          styles.listContainerStyle,
          { borderWidth: cities?.length ? 1 : 0 },
        ]}
        data={cities?.map(v => getLocationText({ countryCode, ...v }))}
        value={text}
        scrollEnabled={true}
        onChangeText={setText}
        placeholder="Type City..."
        flatListProps={{
          style: {
            borderWidth: 0,
            backgroundColor: 'transparent',
            margin: 0,
            maxHeight: 130,
            position: 'relative',
          },
          keyboardShouldPersistTaps: 'handled',
          nestedScrollEnabled: true,
          keyExtractor: (_, idx) => idx,
          renderItem: ({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.item,
                index === cities.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => {
                setText(item)

                const locationId = cities?.find(
                  v => item === getLocationText({ countryCode, ...v }),
                )?.locationId

                onLocationIdChange(locationId, item)

                isMountRef.current = false
                isLocationSelectedRef.current = true
                setCities([])
              }}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </>
  )
}

const LocationInput = forwardRef(LocationInputComp)

const LocationField = ({
  locationFieldName,
  name,
  onSelected = noop,
  ...props
}) => {
  const form = useFormContext()

  const [location, setLocation] = useState(form.getValues()?.location)

  useEffect(() => {
    form.register(locationFieldName)
    form.setValue(locationFieldName, props.locationId)
  }, [])

  return (
    <Controller
      name={name}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <>
          <LocationInput
            {...field}
            {...props}
            onChangeText={v => {
              if (location !== v) {
                form.setValue(locationFieldName, '')
              }

              onChange(v)

              if (form.formState.errors[name]?.message) {
                form.trigger(name)
              }
            }}
            onLocationIdChange={(value, _location) => {
              form.setValue(locationFieldName, value)
              setLocation(_location)
              onSelected()
            }}
            error={error?.message}
          />
          {error && <Text style={styles.errorMsg}>{error?.message}</Text>}
        </>
      )}
    />
  )
}

export default LocationField
