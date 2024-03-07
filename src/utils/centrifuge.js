import Centrifuge from 'centrifuge'
import { WS_URL } from '~/configs/constants'
import { SITE_URL, MEMBER_PATH } from '~/configs/constants'

let _centrifuge = null

const _initializeCentrifuge = jwt => {
  if (_centrifuge) return _centrifuge

  try {
    _centrifuge = new Centrifuge(WS_URL, {
      debug: __DEV__,
      refreshEndpoint: `${SITE_URL}${MEMBER_PATH}/jwt/refresh`,
      refreshHeaders: { Authorization: `Bearer: ${jwt}` },
      refreshAttempts: 5,
    })
  } catch (error) {
    _centrifuge = null
  }

  return _centrifuge
}

export const connectToCentrifuge = jwt => {
  const centrifuge = _initializeCentrifuge(jwt)

  if (!centrifuge?.isConnected()) {
    centrifuge?.setToken(jwt)
    centrifuge?.connect()
  }

  return () => {
    centrifuge?.disconnect()
    _centrifuge = null
  }
}

export const subscribeToChannel = channel => {
  const centrifuge = _initializeCentrifuge()
  return centrifuge?.subscribe(channel)
}
