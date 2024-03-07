import { useEffect } from 'react'
import ZendeskChat from 'react-native-zendesk-chat'
import { ZENDESKCHAT_INIT_CONFIG } from '~/configs/constants'

export default function useZendeskChat() {
  useEffect(() => {
    ZendeskChat.init(ZENDESKCHAT_INIT_CONFIG.key, ZENDESKCHAT_INIT_CONFIG.appId)
  }, [])
}
