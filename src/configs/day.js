import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%dm',
    MM: '%dm',
    y: '%dy',
    yy: '%dy',
  },
})
