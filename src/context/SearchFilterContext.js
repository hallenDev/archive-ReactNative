import React, { useEffect, createContext, useContext, useState } from 'react'
import useStorage from '~/hooks/useStorage'
import { useUser } from './UserContext'

const SearchFilterContext = createContext()

const SearchFilterProvider = ({ children }) => {
  const { user } = useUser()

  const {
    isLoading: isStoreLoading,
    searchFilter: searchValue,
    matchFilter: matchValue,
    setSearchFilter: setSearchFilterStorage,
    setMatchFilter: setMatchFilterStorage,
    removeSearchStore,
    removeMatchStore,
  } = useStorage()

  const [searchFilter, setSearchFilter] = useState({})
  const [matchFilter, setMatchFilter] = useState({})

  useEffect(() => {
    let isMounted = true

    if (!isStoreLoading) {
      const defaultParams = {}
      if (user.gender === 'WOMAN') {
        defaultParams.startAge = user.preferences?.ageStart
        defaultParams.endAge = user.preferences?.ageEnd
      }

      if (isMounted) {
        setSearchFilter(searchValue || defaultParams)
        setMatchFilter(matchValue || defaultParams)
      }
    }

    return () => {
      isMounted = false

      removeSearchStore()
      removeMatchStore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStoreLoading])

  const changeSearchFilter = fn => {
    const value = fn(searchFilter)

    setSearchFilterStorage(value)
    setSearchFilter(value)
  }

  const changeMatchFilter = fn => {
    const value = fn(matchFilter)

    setMatchFilterStorage(value)
    setMatchFilter(value)
  }

  return (
    <SearchFilterContext.Provider
      value={{
        searchFilter,
        changeSearchFilter,
        matchFilter,
        changeMatchFilter,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  )
}

const useSearchFilter = () => {
  const context = useContext(SearchFilterContext)

  if (context === undefined) {
    throw new Error('useSearchFilter must be used within a SearchFilterContext')
  }

  return context
}

export { SearchFilterContext, useSearchFilter }

export default SearchFilterProvider
