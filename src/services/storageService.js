import AsyncStorage from '@react-native-async-storage/async-storage'

import debug from '~/utils/debug'

export const getStorage = async key => {
  try {
    const session = await AsyncStorage.getItem(key)
    return session ? JSON.parse(session) : null
  } catch (error) {}
}

export const setStorage = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    debug('setStorage', error)
  }
}

export const removeStorage = async key => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch (error) {
    debug('removeStorage', error)
  }
}

export const clearStorage = async () => {
  try {
    return await AsyncStorage.clear()
  } catch (error) {
    debug('clearStorage', error)
  }
}
