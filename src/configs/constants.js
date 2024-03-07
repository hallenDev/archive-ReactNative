import Config from 'react-native-config'

export const SITE_URL = Config.BASE_URL
export const PUBLIC_PATH = '/app/public'
export const MEMBER_PATH = '/app/members'
export const TERMS_URL = `${SITE_URL}${PUBLIC_PATH}/terms`
export const PRIVACY_POLICY_URL = `${SITE_URL}${PUBLIC_PATH}/privacy`
export const SUPPORT_EMAIL = Config.SUPPORT_EMAIL
export const RESET_EMAIL = Config.RESET_EMAIL
export const SITEMASTER_DUID = '69'
export const HEADER_HEIGHT = 48
export const BOTTOM_NAVBAR_HEIGHT = 80
export const RECORD_AUDIO_AVAILABLE = true
export const VIDEO_CALL_AVAILABLE = false
export const SHOW_SEARCH_LOCATION = true
export const SHOW_SEARCH_RADIUS_LOCATION = false
export const SHOW_SEARCH_LAST_LOGIN = false
export const ZENDESKCHAT_INIT_CONFIG = {
  key: 'xxBlwgEOBr4sbLQtYHoe0xQwoPCYKNjw',
  appId: '5cc0dde31eb5644906ede43a38969c5bebf869051b7dcddd',
  url: 'https://gpnerds.zendesk.com',
  clientId: 'mobile_sdk_client_40edbf74e9fc9a1188f9',
}
export const WS_URL = 'wss://ws.gpstreaming.com/connection/websocket'
export const VIDEOCHAT_URL = 'wss://lk.gpstreaming.com'
export const START_PRIVATE_VIDEO_CHAT = 'start_private_video_chat'
export const MIN_VIDEO_FOR_AUTOPLAY_ENABLE = 4
export const FILTER_DEFAULT_PARAMS = {
  startAge: 18,
  endAge: 99,
  minRadiusLocation: 10,
  maxRadiusLocation: 3000,
  showAllVoted: false,
}
export const APP_DISPLAY_NAME = Config.DISPLAY_NAME
