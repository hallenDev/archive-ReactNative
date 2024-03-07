import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ButtonGradient from '~/ui/ButtonGradient'
import { colors, typography } from '~/ui/theme'

const Empty = ({ visible, onResetFilter }) => {
  if (!visible) {
    return null
  }

  return (
    <View style={styles.empty}>
      <Text style={styles.info}>
        There are no more matches for the{'\n'}
        filters you selected.{'\n'} Try updating your filters?
      </Text>
      <ButtonGradient
        title="Reset All"
        onAction={onResetFilter}
        className={styles.btnGradient}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    ...typography.p1,
    textAlign: 'center',
    color: colors.textMain,
  },
  btnGradient: {
    maxHeight: 50,
    width: 200,
    marginTop: 40,
  },
})

export default Empty
