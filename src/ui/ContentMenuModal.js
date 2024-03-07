import React from 'react'
import { StyleSheet, Text, Pressable, Modal } from 'react-native'
import PressableHighlight from '~/ui/PressableHighlight'
import SvgTrash from '~/ui/icons/Trash'
import { colors, typography } from '~/ui/theme'

const ContentMenuModal = ({
  title,
  modalVisible,
  setModalVisible,
  handlerDeleteContent,
  marginTop,
}) => {
  const handlerRequestClose = () => setModalVisible(!modalVisible)

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={handlerRequestClose}
    >
      <Pressable style={styles.centeredView} onPress={handlerRequestClose}>
        <Pressable style={[styles.modalView, { marginTop }]}>
          <PressableHighlight
            style={styles.item}
            onPress={handlerDeleteContent}
          >
            <SvgTrash width="20" height="20" color={colors.textSub} />
            <Text style={styles.trashText}>{title}</Text>
          </PressableHighlight>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalView: {
    borderRadius: 10,
    backgroundColor: colors.bgMenuModal,
    marginRight: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
  },
  trashText: {
    ...typography.p2,
    color: colors.textMain,

    marginLeft: 8,
  },
})

export default ContentMenuModal
