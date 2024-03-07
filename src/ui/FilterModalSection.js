import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { colors, typography } from '~/ui/theme'

const FilterModalSection = ({
  children,
  title,
  titleStyle,
  currentLocation = '',
}) => (
  <View style={[styles.container]}>
    <View style={[styles.title, titleStyle]}>
      <Text style={styles.titleTxt}>{title}</Text>
      {currentLocation && (
        <Text style={styles.location}>{currentLocation}</Text>
      )}
    </View>
    {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.semiTransparentWhite15,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    ...typography.p1b,
    paddingVertical: 8,
    color: colors.textMain,
    marginRight: 10,
  },
  location: {
    ...typography.p3,
    color: colors.textMain,
  },
})

export default FilterModalSection
