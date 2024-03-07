import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSearchFilter } from '~/context/SearchFilterContext'
import useMapperFiltersParams from '~/hooks/useMapperFiltersParams'
import FilterPill from '~/ui/FilterPill/FilterPill'

const FilterPillsList = () => {
  const { searchFilter, changeSearchFilter } = useSearchFilter()

  const options = useMapperFiltersParams(searchFilter)

  const onDeleteFilterParam = useCallback(
    data => {
      const newFilterParams = {}

      if (data.id === 'age') {
        newFilterParams.startAge = 18
        newFilterParams.endAge = 99
      } else if (data.id === 'interested_in') {
        const interestList = searchFilter.interested_in.filter(
          interest => interest !== data.value,
        )

        newFilterParams.interested_in = interestList
      } else {
        newFilterParams[data.id] = ''
      }

      changeSearchFilter(prevParams => ({
        ...prevParams,
        ...newFilterParams,
      }))
    },
    [searchFilter, changeSearchFilter],
  )

  return (
    <View style={styles.filterPillsList}>
      {options.map((item, i) => (
        <FilterPill
          key={item.id + i}
          params={item}
          onDelete={onDeleteFilterParam}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  filterPillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default FilterPillsList
