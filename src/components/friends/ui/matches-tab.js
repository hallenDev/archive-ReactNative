import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import PressableHighlight from '~/ui/PressableHighlight'
import { Heart2, HeartMatch } from '~/ui/icons'
import { typography, colors } from '~/ui/theme'

export default function MatchesTab({ value, onChange }) {
  return (
    <View style={styles.tabs}>
      <PressableHighlight
        style={[styles.tab, !value && styles.tabActive]}
        onPress={() => onChange(0)}
      >
        <HeartMatch
          height="16"
          width="16"
          color={!value ? colors.textMain : colors.textSub}
        />
        <Text style={[styles.tabText, !value && styles.tabActiveText]}>
          Matches
        </Text>
      </PressableHighlight>

      <View style={styles.separator} />

      <PressableHighlight
        style={[styles.tab, !!value && styles.tabActive]}
        onPress={() => onChange(1)}
      >
        <Heart2
          height="16"
          width="16"
          color={!!value ? colors.textMain : colors.textSub}
        />
        <Text style={[styles.tabText, !!value && styles.tabActiveText]}>
          Who Liked Me
        </Text>
      </PressableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.semiBlack25,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.p2,
    color: colors.textSub,

    marginLeft: 8,
  },
  tabActiveText: {
    color: colors.textMain,
  },
  separator: {
    width: 8,
  },
})
