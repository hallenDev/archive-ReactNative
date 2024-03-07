import { useEffect } from 'react'
import { Platform } from 'react-native'
import VersionNumber from 'react-native-version-number'
import axios from 'axios'

import noop from '~/utils/noop'
import accountStatusMap from '~/shared/types/AccountStatusMap'
// import debug from '~/utils/debug'
import useStorage from './useStorage'
import Bugsnag from '@bugsnag/react-native'

export default function useAxiosConfig({
  onImmediateLogoutAndRestart = noop,
  onDisabledUser = noop,
}) {
  const { authToken } = useStorage()

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      config.headers['X-APP-VERSION'] = VersionNumber.appVersion
      config.headers['X-BUILD-VERSION'] = VersionNumber.buildVersion
      config.headers['X-OS'] = Platform.OS
      config.headers['X-VERSION'] = Platform.Version

      if (authToken) {
        config.headers.authorization = `Bearer ${authToken}`
      } else {
        delete axios.defaults.headers.authorization
      }

      config.withCredentials = true

      // debug('->', config)

      return config
    })

    const responseInterceptor = axios.interceptors.response.use(
      response => {
        // debug(`-> ${response?.config?.url}`, response)

        return response?.data
      },
      error => {
        // debug(`-> ${error?.response?.config?.url}`, error)

        if (
          error?.response?.data?.error &&
          error?.response?.data?.error[accountStatusMap.USER_DISABLED]
        ) {
          onDisabledUser()
        }

        if (
          (authToken && error?.response?.data?.error?.unauthorized) ||
          error?.response?.status === 401
        ) {
          Bugsnag.notify(
            new Error('User unauthorized status 401'),
            function (event) {
              event.severity = 'info'
              event.addMetadata('Request info', {
                url: error?.response?.config?.url,
                error: error?.response?.data?.errors,
                headers: error?.response?.config?.headers,
              })
            },
          )

          onImmediateLogoutAndRestart()
        }

        return Promise.reject(error?.response ? error?.response : error)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken])
}
