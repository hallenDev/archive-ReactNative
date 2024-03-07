import { useEffect, useState, useCallback } from 'react'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage'

import { getStorage, removeStorage } from '~/services/storageService'

export const StorageType = {
  LAUNCH_KEY: 'LAUNCH_KEY',
  SEARCH_FILTER: 'SEARCH_FILTER',
  MATCH_FILTER: 'MATCH_FILTER',
  HAS_LAUNCHED: 'hasLaunched',
  USER_SESSION: 'user_session',
  AUTH_TOKEN: 'auth_token',
  FIREBASE_TOKEN: 'firebaseToken',
  CHECK_UPDATE_NEEDED: 'check_update_needed',
  FEEDBACK_MODAL_SHOWN: 'FEEDBACK_MODAL_SHOWN',
  INSTALL_DATE: 'INSTALL_DATE',
}

const storage = new MMKVLoader().initialize()

const useDefaultStoreValues = () => {
  const [defaultUserStore, setDefaultUserStore] = useState(null)
  const [defaultAuthToken, setDefaultAuthToken] = useState(null)
  const [defaultAppLaunched, setDefaultAppLaunched] = useState(null)
  const [defaultSearchFilter, setDefaultSearchFilter] = useState(null)
  const [defaultMatchFilter, setDefaultMatchFilter] = useState(null)
  const [defaultFirebaseToken, setDefaultFirebaseToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getUserStore = useCallback(async () => {
    return await getStorage(StorageType.USER_SESSION)
  }, [])

  const getAuthToken = useCallback(async () => {
    return await getStorage(StorageType.AUTH_TOKEN)
  }, [])

  const getAppLaunched = useCallback(async () => {
    return await getStorage(StorageType.HAS_LAUNCHED)
  }, [])

  const getSearchFilter = useCallback(async () => {
    return await getStorage(StorageType.SEARCH_FILTER)
  }, [])

  const getMatchFilter = useCallback(async () => {
    return await getStorage(StorageType.MATCH_FILTER)
  }, [])

  const getFirebaseToken = useCallback(async () => {
    return await getStorage(StorageType.FIREBASE_TOKEN)
  }, [])

  useEffect(() => {
    const loadDefaultValues = async () => {
      setIsLoading(true)
      setDefaultUserStore(await getUserStore())
      setDefaultAuthToken(await getAuthToken())
      setDefaultAppLaunched(await getAppLaunched())
      setDefaultSearchFilter(await getSearchFilter())
      setDefaultMatchFilter(await getMatchFilter())
      setDefaultFirebaseToken(await getFirebaseToken())
      setIsLoading(false)
    }

    loadDefaultValues()
  }, [
    getAppLaunched,
    getAuthToken,
    getFirebaseToken,
    getMatchFilter,
    getSearchFilter,
    getUserStore,
  ])

  const defaultValues = {
    isLoading,
    defaultUserStore,
    defaultAuthToken,
    defaultAppLaunched,
    defaultSearchFilter,
    defaultMatchFilter,
    defaultFirebaseToken,
  }

  return defaultValues
}

const useStorage = () => {
  const {
    isLoading,
    defaultUserStore,
    defaultAuthToken,
    defaultAppLaunched,
    defaultSearchFilter,
    defaultMatchFilter,
    defaultFirebaseToken,
  } = useDefaultStoreValues()

  const [userStore, setUserStore] = useMMKVStorage(
    'userStore',
    storage,
    defaultUserStore,
  )

  const [authToken, setAuthToken] = useMMKVStorage(
    'authToken',
    storage,
    defaultAuthToken,
  )

  const [appLaunched, setAppLaunched] = useMMKVStorage(
    'appLaunched',
    storage,
    defaultAppLaunched,
  )

  const [searchFilter, setSearchFilter] = useMMKVStorage(
    'searchFilter',
    storage,
    defaultSearchFilter,
  )

  const [matchFilter, setMatchFilter] = useMMKVStorage(
    'matchFilter',
    storage,
    defaultMatchFilter,
  )

  const [firebaseToken, setFirebaseToken] = useMMKVStorage(
    'firebaseToken',
    storage,
    defaultFirebaseToken,
  )

  const [installDate, setInstallDate] = useMMKVStorage(
    StorageType.INSTALL_DATE,
    storage,
  )

  const [feedbackModalShown, setFeedbackModalShown] = useMMKVStorage(
    StorageType.FEEDBACK_MODAL_SHOWN,
    storage,
    false,
  )

  const removeAuthToken = useCallback(async () => {
    storage.removeItem('authToken')
    return await removeStorage(StorageType.AUTH_TOKEN)
  }, [])

  const removeSearchStore = useCallback(async () => {
    storage.removeItem('searchFilter')
    return await removeStorage(StorageType.SEARCH_FILTER)
  }, [])

  const removeMatchStore = useCallback(async () => {
    storage.removeItem('matchFilter')
    return await removeStorage(StorageType.MATCH_FILTER)
  }, [])

  const storeDetails = {
    isLoading,
    userStore,
    setUserStore,
    authToken,
    setAuthToken,
    removeAuthToken,
    appLaunched,
    setAppLaunched,
    searchFilter,
    setSearchFilter,
    removeSearchStore,
    matchFilter,
    setMatchFilter,
    removeMatchStore,
    firebaseToken,
    setFirebaseToken,
    installDate,
    setInstallDate,
    feedbackModalShown,
    setFeedbackModalShown,
  }

  return storeDetails
}

export default useStorage
