import dayjs from 'dayjs'

export const formatAnswerDate = (date = '') => dayjs(date).format('HH:mm')
export const formatInboxDate = (ctime = '') => {
  return dayjs(ctime).isToday()
    ? dayjs(ctime).format('hh:mm a')
    : dayjs(ctime).format('MM/DD/YYYY')
}
export const formatBirthday = (date = '') => dayjs(date).format('DD MMMM YYYY')
export const formatPostsDate = (ctime = '') => {
  const date = dayjs.tz(ctime, 'America/New_York')
  const isLessMinute = dayjs().isSameOrBefore(date, 'minute')
  if (isLessMinute) return 'now'

  const isLessHour = dayjs().isSameOrBefore(date, 'hour')
  if (isLessHour) return `${dayjs().diff(date, 'minute')}m ago`

  const isLessDay = dayjs().isSameOrBefore(date, 'day')
  if (isLessDay) {
    const hours = dayjs().diff(date, 'hour')

    return hours ? `${hours}h ago` : `${dayjs().diff(date, 'minute')}m ago`
  }

  return date.format('MM/DD/YYYY')
}
export const getStartBirthdayValue = (year = 18) => {
  return dayjs().subtract(year, 'year').subtract(1, 'days').toDate()
}
