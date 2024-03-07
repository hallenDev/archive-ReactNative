import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { colors } from '~/ui/theme'

const Body = ({ transperant, children }) => (
  <View style={[styles.fill, transperant && styles.transperant]}>
    <View style={styles.center}>{children}</View>
  </View>
)

const Overlay = ({ modal, ...props }) =>
  modal ? (
    <Modal transparent>
      <Body {...props} />
    </Modal>
  ) : (
    <Body {...props} />
  )

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.semiBlack50,
    zIndex: 10,
  },
  transperant: { backgroundColor: 'transperant' },
  center: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Overlay
