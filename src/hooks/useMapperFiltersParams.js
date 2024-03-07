import { useMemo } from 'react'

const EXCLUDE_KEYS = [
  'country',
  'startAge',
  'endAge',
  'location_id',
  'seeking',
  'last_login_label',
  'searchType',
]

const useMapperFiltersParams = params => {
  return useMemo(() => {
    const newParams = []

    Object.entries(params).forEach(item => {
      if (!EXCLUDE_KEYS.includes(item[0]) && !!item[1]) {
        if (item[0] === 'radius') {
          newParams.push({
            id: item[0],
            value: item[1] + 'mi',
          })
        } else if (Array.isArray(item[1])) {
          item[1].forEach(interested => {
            let interestValue

            switch (interested) {
              case 'MEET_IN_PERSON':
                interestValue = 'Meet In Person'
                break
              case 'OTHER':
                interestValue = 'Serious Relationship'
                break
              default:
                interestValue =
                  interested.charAt(0) + interested.slice(1).toLowerCase()
            }

            newParams.push({
              id: item[0],
              value: interested,
              interestValue: interestValue,
            })
          })
        } else {
          newParams.push({
            id: item[0],
            value: item[1],
          })
        }
      }
    })

    if (
      params.startAge &&
      params.endAge &&
      (Number(params.startAge) !== 18 || Number(params.endAge) !== 99)
    ) {
      newParams.push({
        id: 'age',
        value: `${params.startAge}-${params.endAge}`,
      })
    }

    return newParams
  }, [params])
}

export default useMapperFiltersParams
