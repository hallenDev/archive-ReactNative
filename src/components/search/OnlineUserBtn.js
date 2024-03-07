import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useSearchFilter } from '~/context/SearchFilterContext'
import { Switch } from '~/ui'
import { colors, typography } from '~/ui/theme'

const OnlineUserBtn = () => {
  const [valueSwitch, setValueSwitch] = useState(null)

  const { searchFilter, changeSearchFilter } = useSearchFilter()

  const onToggleSwitch = useCallback(() => {
    setValueSwitch(s => !s)
  }, [])

  const handleSwitch = useCallback(
    value => {
      const newValue = { searchType: value ? 'online' : '' }
      changeSearchFilter(prevParams => ({ ...prevParams, ...newValue }))
    },
    [changeSearchFilter],
  )

  useEffect(() => {
    if (valueSwitch !== null && valueSwitch !== !!searchFilter?.searchType) {
      handleSwitch(valueSwitch)
    }
  }, [valueSwitch, searchFilter?.searchType, handleSwitch])

  useEffect(() => {
    if (valueSwitch === null) {
      setValueSwitch(!!searchFilter.searchType)
    }
  }, [searchFilter?.searchType, valueSwitch])

  return (
    <View style={styles.online}>
      <Text style={styles.onlineTxt}>Users online Now</Text>
      <Switch
        value={valueSwitch}
        onChange={onToggleSwitch}
        style={styles.switch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  online: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineTxt: {
    ...typography.p2b,
    color: colors.textMain,
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
})

export default OnlineUserBtn
