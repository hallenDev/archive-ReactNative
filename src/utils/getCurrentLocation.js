import { Platform, PermissionsAndroid } from 'react-native'
import Geolocation from '~/services/Geolocation'
import { fetchGeo } from '~/shared/api/members'

const getCurrentLocation = () => {
  return new Promise(function (resolve, reject) {
    if (Platform.OS === 'android') {
      resolve(
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location update Permissions',
            message: 'To access location, we require permission',
            buttonNegative: 'Select Manually',
            buttonPositive: 'Allow',
          },
        ),
      )
    } else {
      Geolocation.requestAuthorization('whenInUse').then(result => {
        resolve(result)
      })
    }
  })
    .then(result => {
      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        throw 'Location permission not granted'
      }

      return result
    })
    .then(granted => {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            resolve(position)
          },
          error => {
            reject(error)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
      })
    })
    .then(({ coords = {}, timestamp }) => {
      return {
        accuracy: coords.accuracy,
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp,
        error: null,
      }
    })
    .then(location => {
      return location
    })
    .then(location => {
      return fetchGeo({ ...location }).then(response => {
        return response
      })
    })
}

export default getCurrentLocation
