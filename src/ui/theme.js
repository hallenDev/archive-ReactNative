import percentage from '~/utils/percentage'

/**
 * Height 785,.. -> fontSize = 11
 * Height 1000 -> fontSize = 14
 * Height 1285,.. -> fontSize = 18
 * @returns
 */
// const baseFontSize = Math.floor(Dimensions.get('window').height * 0.014)

export const text = {
  regular: {
    fontFamily: 'Poppins-Regular',
  },
  semiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  boldItalic: {
    fontFamily: 'Poppins-BoldItalic',
  },
  title: {
    fontFamily: 'MonkeyAct-PersonalUse',
  },
}

export const label = {
  REQUEST_TO_FRIEND: 'Add to Friends',
}

const COLOR = {
  PRIMARY: '#FEBF2F',
  PRIMARY_SHADE: '#F4AB00',
  SECONDARY: '#FFFFFF',

  TEXT: '#1D1F2B',
  TEXT_SUB: '#6F7495',
  BACKGROUND: '#ECEEFC',
  BACKGROUND2: '#ECEEFC',

  BORDER: '#DEE2F0',
  INPUT_BACKGROUND: '#F2F4FC',
  WHITE: '#FFFFFF',
}

export const colors = {
  primary: COLOR.PRIMARY,
  primaryShade: COLOR.PRIMARY_SHADE,
  primaryGradient: [COLOR.PRIMARY, COLOR.PRIMARY_SHADE, COLOR.PRIMARY_SHADE],
  secondary: COLOR.SECONDARY,

  titleHeader: COLOR.TEXT,
  linerGradient: [COLOR.PRIMARY, COLOR.PRIMARY_SHADE],
  text: COLOR.TEXT,
  textMain: COLOR.TEXT,
  textSub: COLOR.TEXT_SUB,
  textInactive: COLOR.TEXT_SUB,

  qualityScoreGradient: [COLOR.PRIMARY, COLOR.PRIMARY_SHADE],
  qualityProgressGradient: [COLOR.PRIMARY, COLOR.PRIMARY_SHADE],
  bgGradient: [COLOR.BACKGROUND, COLOR.BACKGROUND2],

  white: COLOR.WHITE,
  border: COLOR.BORDER,
  transparent: '#00000000',
  buttonIcon: COLOR.TEXT,
  buttonIconBg: '#EAECF6',

  chatMessageBgLeft: '#D9DBE8',
  inputBackground: COLOR.INPUT_BACKGROUND,
  placeholder: COLOR.TEXT_SUB,

  overlayContainer: COLOR.WHITE,
  actionSheetBg: COLOR.WHITE,
  checkActive: 'rgba(115, 195, 35, 1)',
  checkInactive: 'rgba(255, 255, 255, 0.3)',
  checkBackground: COLOR.WHITE,
  railBackground: COLOR.WHITE,
  butonSubText: COLOR.TEXT,

  loadingGradientFade: '#FFFFFF',
  voiceRecordBg: COLOR.WHITE,
  postBackground: COLOR.WHITE,
  header: COLOR.WHITE,
  headerBorder: COLOR.BORDER,

  switchTrack: {
    true: COLOR.BORDER,
    false: COLOR.BORDER,
  },
  switchThumb: {
    active: COLOR.PRIMARY,
    inactive: COLOR.TEXT_SUB,
  },

  inactiveButtonBg: COLOR.WHITE,

  // new
  darkBlack: '#010101',
  black: '#252525',
  pureBlack: '#2E3138',
  semiBlack50: 'rgba(0, 0, 0, 0.5)',
  semiBlack20: 'rgba(0, 0, 0, 0.2)',
  semiBlack25: 'rgba(0, 0, 0, 0.2)',
  semiBlack15: 'rgba(0, 0, 0, 0.15)',
  violent: 'rgba(71, 33, 81, 1)',
  darkViolet: '#472151',
  darkVioletBg: '#331a3c',
  semiGray: '#9C8FA3',

  semiTransparentWhite15: 'rgba(255, 255, 255, 0.15)',
  semiTransparentWhite30: 'rgba(255, 255, 255, 0.3)',
  semiTransparentWhite50: 'rgba(255, 255, 255, 0.5)',
  green: 'rgba(115, 195, 35, 1)',
  orange: 'rgba(255, 163, 0, 1)',
  alert: 'rgba(232, 48, 48, 1)',
  greenApprove: '#73C323',
  redAlert: '#E83030',
  grey: '#737B8C',

  bgBlack: '#daddf5',
  bgMenuModal: COLOR.BACKGROUND,
  bgHeader: '#FFFFFF',

  goldGradient: ['rgba(240, 193, 117, 1)', 'rgba(247, 224, 186, 1)'],

  linerGradientOpacity: ['#FFF', '#FFF'],
  userCardGradient: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.75)'],
  baseGraient: ['#73C323', '#73C323'],

  lightBlueGradient: ['#00FFF0', '#0085FF'],
  bgViolet: '#200c4c',

  cursorColor: COLOR.TEXT,
}

export const typography = {
  //Headres
  registrationHeader: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 40,
    lineHeight: percentage(40, 120),
    color: colors.textMain,
  },
  titleHeader: {
    fontFamily: text.title.fontFamily,
    fontSize: 34,
    lineHeight: percentage(36, 120),
    color: colors.titleHeader,
  },
  slogan: {
    fontFamily: text.bold.fontFamily,
    fontSize: 28,
    lineHeight: percentage(28, 120),
    color: colors.titleHeader,
  },
  h1: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 32,
    lineHeight: percentage(32, 120),
    color: colors.text,
  },
  h2: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 24,
    lineHeight: percentage(24, 120),
    color: colors.text,
  },
  h3: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: percentage(20, 120),
    color: colors.text,
  },
  h4: {
    fontFamily: text.regular.fontFamily,
    fontSize: 20,
    lineHeight: percentage(20, 120),
    color: colors.text,
  },
  h5: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  //Paragraphs
  p1b: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 16,
    lineHeight: percentage(16, 150),
    color: colors.text,
  },
  p2b: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 14,
    lineHeight: percentage(14, 140),
    color: colors.text,
  },
  p3b: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 12,
    lineHeight: percentage(12, 140),
    color: colors.text,
  },
  p1: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    lineHeight: percentage(16, 150),
    color: colors.text,
  },
  p2: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.text,
  },
  p3: {
    fontFamily: text.regular.fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: percentage(12, 140),
    color: colors.text,
  },
  //Captions
  c1: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 10,
    lineHeight: percentage(10, 120),
    color: colors.text,
  },
  c2: {
    fontFamily: text.regular.fontFamily,
    fontSize: 10,
    lineHeight: percentage(10, 120),
    color: colors.text,
  },
  errorParams: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 86,
    color: colors.semiGray,
  },
}
