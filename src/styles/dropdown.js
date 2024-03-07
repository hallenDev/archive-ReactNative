import { StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const dropdownStyles = StyleSheet.create({
  dropdown: {
    maxHeight: 40,
    height: 40,
    backgroundColor: colors.white,
  },
})

export const dropdownListStyles = StyleSheet.create({
  dropdown: {
    backgroundColor: colors.semiBlack25,
    borderWidth: 0,
    borderColor: colors.semiBlack25,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.bgGradient[0],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    color: colors.textMain,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  listItem: {
    ...typography.p3,
    color: colors.textSub,
    fontSize: 15,
  },
  listItemContainer: {
    flex: 1,
    minHeight: 36,
    borderTopWidth: 1,
    borderTopColor: colors.bgGradient[0],
    overflow: 'scroll',
    padding: 0,
  },
  placeholder: {
    ...typography.p1,
    color: colors.textMain,
  },
  icon: {
    color: colors.textMain,
  },
  dropDownTopContainerStyle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})

export const birthdayPickerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  dropdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  dropDownContainerStyle: {
    backgroundColor: 'rgba(0,0,0,.25)',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    position: 'relative',
    marginTop: -50,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: colors.white,
  },
  listItem: {
    ...typography.p3,
    color: colors.text,
    fontSize: 15,
  },
  listItemContainer: {
    flex: 1,
    height: 55,
  },
  placeholder: {
    ...typography.p1,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  icon: {
    color: colors.text,
  },
  searchContainer: {
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
  },
  monthWrapper: {
    maxWidth: 100,
  },
  dateWrapper: {
    maxWidth: 100,
  },
  yearWrapper: {
    maxWidth: 120,
  },
  zIndex1: {
    zIndex: 1,
  },
})
