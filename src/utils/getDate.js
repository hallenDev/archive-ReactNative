import dayjs from 'dayjs'

const getDate = date => dayjs.tz(date, 'America/New_York').toDate()

export default getDate
