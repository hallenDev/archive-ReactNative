import { useCallback } from 'react'
import useProfile from '~/hooks/useProfile'
import getLocationText from '~/utils/getLocationText'
import {
  SHOW_SEARCH_LOCATION,
  SHOW_SEARCH_RADIUS_LOCATION,
  SHOW_SEARCH_LAST_LOGIN,
  FILTER_DEFAULT_PARAMS,
} from '~/configs/constants'

const useGetDefaultFilterParams = () => {
  const { data: user } = useProfile()

  const getDefaultParams = useCallback(() => {
    const params = {
      startAge: FILTER_DEFAULT_PARAMS.startAge,
      endAge: FILTER_DEFAULT_PARAMS.endAge,
      interested_in: user?.interested_in,
      location: user?.country,
      ignore_filters_for_voters:
        FILTER_DEFAULT_PARAMS.ignore_filters_for_voters,
      username: null,
    }

    if (SHOW_SEARCH_LOCATION) {
      params.location_id = user?.location_id
      params.location = getLocationText(user)
    }

    if (SHOW_SEARCH_RADIUS_LOCATION) {
      params.radius = FILTER_DEFAULT_PARAMS.maxRadiusLocation
    }

    if (SHOW_SEARCH_LAST_LOGIN) {
      params.last_login = null
    }

    return params
  }, [user])

  return getDefaultParams
}

export default useGetDefaultFilterParams
