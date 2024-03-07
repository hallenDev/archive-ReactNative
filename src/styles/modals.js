import { StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const userActionModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalView: {
    width: 160,
    borderRadius: 10,
    backgroundColor: colors.bgGradient[0],
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
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    elevation: 2,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  redText: {
    ...typography.p2,
    color: colors.redAlert,

    marginLeft: 8,
  },
  trashText: {
    ...typography.p2,
    color: colors.textMain,

    marginLeft: 8,
  },
})
