import { StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const profileCounterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  btn: {
    borderRadius: 5,
    minHeight: 0,
    padding: 4,
    flex: 1,
    backgroundColor: colors.secondary,
  },
  btnContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCounter: {
    ...typography.h4,
    color: colors.textMain,
  },
  btnName: {
    ...typography.c1,
    color: colors.textMain,
  },
  centerBtn: {
    marginHorizontal: 8,
  },
})

export const profileInterestsStyles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    ...typography.p2,
    marginBottom: 10,
    marginTop: 2,
    fontWeight: 600,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 5.5,
    borderRadius: 8,
    marginBottom: 4,
    marginRight: 4,
  },
  itemText: {
    ...typography.p3,
    color: colors.textMain,
  },
  containerSkeleton: {
    borderRadius: 8,
    marginBottom: 4,
    marginRight: 4,
    overflow: 'hidden',
    height: 25,
    width: 130,
  },
})
