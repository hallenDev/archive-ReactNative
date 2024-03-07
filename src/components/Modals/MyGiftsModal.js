import React from 'react'
import { StyleSheet, View, Text, Pressable, Modal, Image } from 'react-native'
import PressableHighlight from '~/ui/PressableHighlight'
import { colors, typography } from '~/ui/theme'

const MyGiftsModal = ({ modalVisible, onCancel, gifts }) => {
  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.centeredView} onPress={onCancel}>
        <Pressable style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>My Gifts</Text>
          </View>
          <View style={styles.giftsList}>
            {gifts.map((item, i) => (
              <Image
                key={i}
                source={{ uri: item.urls[40] }}
                style={styles.gift}
              />
            ))}
          </View>
          <View style={styles.separator} />
          <PressableHighlight style={styles.decline} onPress={onCancel}>
            <Text style={styles.declineText}>Cancel</Text>
          </PressableHighlight>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiBlack25,
    zIndex: 10,
  },
  modalView: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.bgViolet,
    minWidth: 300,
    maxWidth: 350,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    minWidth: 300,
    maxWidth: 350,
    marginBottom: 20,
  },
  title: {
    ...typography.h3,
    color: colors.white,
  },
  giftsList: {
    minWidth: 300,
    maxWidth: 350,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: colors.semiBlack25,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 5,
  },
  separator: {
    height: 1,
    marginTop: 20,
    backgroundColor: colors.semiTransparentWhite30,
    minWidth: 300,
    maxWidth: 350,
  },
  decline: {
    backgroundColor: colors.semiBlack25,
    borderRadius: 10,
    width: 136,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  declineText: {
    ...typography.p2,
    color: colors.white,
  },
  gift: {
    width: 35,
    height: 35,
    marginHorizontal: 2,
  },
})

export default MyGiftsModal
