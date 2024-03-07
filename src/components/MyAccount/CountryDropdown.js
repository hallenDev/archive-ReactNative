import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useQuery } from 'react-query'
import { fetchCountries } from '~/shared/api'
import { ChevronDown, X } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const CountryDropdown = ({ value, onChange }) => {
  const [country, setCountry] = useState(value)
  const [openCountry, setOpenCountry] = useState(false)
  const { data: countries = [] } = useQuery('locationCountries', fetchCountries)

  // eslint-disable-next-line react/no-unstable-nested-components
  const ArrowComponent = () => <ChevronDown style={styles.icon} />
  // eslint-disable-next-line react/no-unstable-nested-components
  const CloseComponent = () => <X style={styles.icon} />

  return (
    <DropDownPicker
      open={openCountry}
      setOpen={setOpenCountry}
      value={country}
      schema={{
        label: 'country',
        value: 'iso2',
      }}
      items={countries || []}
      searchable={true}
      setValue={setCountry}
      loading
      listMode="SCROLLVIEW"
      style={styles.dropdown}
      labelStyle={styles.label}
      arrowIconStyle={{ fill: colors.white }}
      listItemLabelStyle={styles.listItem}
      listItemContainerStyle={styles.listItemContainer}
      itemSeparator
      itemSeparatorStyle={styles.separator}
      searchContainerStyle={styles.searchContainer}
      searchTextInputStyle={styles.searchTextInput}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      placeholder="Pick a country"
      placeholderStyle={styles.placeholder}
      ArrowUpIconComponent={ArrowComponent}
      ArrowDownIconComponent={ArrowComponent}
      CloseIconComponent={CloseComponent}
      onChangeValue={onChange}
    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'rgba(0,0,0,.25)',
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  dropDownContainerStyle: {
    backgroundColor: '#1A0562',
    borderColor: '#71587a',
  },
  label: {
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: '#71587a',
  },
  listItem: {
    ...typography.p3,
    color: colors.white,
    fontSize: 15,
  },
  listItemContainer: {
    flex: 1,
    height: 55,
  },
  icon: {
    color: colors.white,
  },
  placeholder: {
    ...typography.p1,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  searchContainer: {
    paddingVertical: 10,
    borderBottomColor: '#71587a',
  },
  searchTextInput: {
    color: colors.white,
    paddingVertical: 10,
    borderColor: 'rgba(0,0,0,0.25)',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
})

export default CountryDropdown
