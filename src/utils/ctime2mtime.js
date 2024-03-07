/**
 * ctime: "2022-11-09 03:41:38"
 * mtime: "2022-11-09T03:51:27-05:00"
 *
 * @param {*} ctime
 * @returns
 */
export default function ctime2mtime(ctime = '') {
  const mtime = ctime.split(' ').join('T') + '-04:00'
  return mtime
}
