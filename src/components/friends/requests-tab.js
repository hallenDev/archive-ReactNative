import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { UpArrow, DownArrow } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'
import PressableHighlight from '~/ui/PressableHighlight'

export default function RequestsTab({ children }) {
  const [tab, setTab] = React.useState(0)

  function getColor(value) {
    return tab === value ? colors.textMain : colors.textInactive
  }

  return (
    <>
      <View style={styles.tabs}>
        <PressableHighlight style={styles.tab} onPress={() => setTab(0)}>
          <DownArrow
            width="16"
            height="16"
            color={getColor(0)}
            style={styles.icon}
          />
          <Text style={[styles.tabText, { color: getColor(0) }]}>Incoming</Text>
        </PressableHighlight>
        <PressableHighlight style={styles.tab} onPress={() => setTab(1)}>
          <UpArrow
            width="16"
            height="16"
            color={getColor(1)}
            style={styles.icon}
          />

          <Text style={[styles.tabText, { color: getColor(1) }]}>Outgoing</Text>
        </PressableHighlight>
        <View style={[styles.activeTab, tab ? { right: 0 } : { left: 0 }]} />
      </View>

      {children.length ? children[tab] : children}
    </>
  )
}

const styles = StyleSheet.create({
  tabs: {
    height: 40,
    marginTop: 6,
    marginHorizontal: 20,

    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.semiTransparentWhite15,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    ...typography.p2,
    color: colors.textMain,
  },
  icon: {
    marginTop: 2,
    marginRight: 4,
  },
  activeTab: {
    position: 'absolute',
    bottom: 0,
    // left: 0,
    height: 2,
    backgroundColor: colors.primary,
    width: '50%',
  },
})
