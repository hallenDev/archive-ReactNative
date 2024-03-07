import { StyleSheet } from 'react-native'
import { colors, typography } from '~/ui/theme'

export const qualityScoreStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  qualityBtn: {
    paddingHorizontal: 8,
    minHeight: 24,
    borderRadius: 5,
    marginRight: 8,
    backgroundColor: colors.secondary,
    minWidth: 100,
  },
  btnText: {
    ...typography.c2,
  },
  iconSize: 14,
})

export const qualityBarStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  meterWrap: {
    height: 24,
    padding: 1,
    borderRadius: 5,
  },
  meterMiddleWrap: {
    backgroundColor: colors.bgGradient[0],
    height: 22,
    padding: 3,
    borderRadius: 4,
  },
  meterInnerWrap: {
    position: 'relative',
    backgroundColor: colors.textMain,
    borderRadius: 3,
  },
  qualityProgress: {
    backgroundColor: '#9f00fe',
    borderRadius: 3,
    width: '100%',
    height: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  emojiWrap: {
    borderRadius: 3,
    width: '100%',
    height: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    paddingHorizontal: 3,
    minWidth: 20,
  },
  emojiImg: {
    width: 14,
    height: 14,
  },
})

export const qualityScoreModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    position: 'relative',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 15,
  },
  modalView: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...typography.h4,
    color: colors.textMain,
    marginBottom: 10,
    fontWeight: 600,
  },
  checklistWrapper: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 20,
    marginTop: 15,
  },
  subTitle: {
    ...typography.p1,
    color: colors.textSub,
  },
  itemTitle: {
    ...typography.p1,
    color: colors.textSub,
    marginLeft: 10,
    flexShrink: 1,
    flexGrow: 1,
  },
  boldText: {
    color: colors.textMain,
    fontWeight: 600,
  },
  itemWrap: {
    marginTop: 30,
  },
  itemCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkedWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
  },
  checkedIcon: {
    color: colors.white,
  },
  uncheckWrap: {
    width: 24,
    height: 24,
    backgroundColor: colors.bgGradient[0],
    borderRadius: 12,
    borderColor: colors.border,
    borderWidth: 1,
  },
  actionBtn: {
    maxWidth: 150,
    minHeight: 36,
    marginLeft: 35,
  },
  closeBtn: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    color: colors.textSub,
  },
})
