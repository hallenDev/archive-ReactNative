/**
 * 123
 * 1 123
 * 12 123
 * 123 123
 * 1 123 123
 *
 * @param points
 * @returns
 */
export const countAbbreviatedFormSpace = number => {
  return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
}

/**
 * 7
 * 77
 * 777
 * 7.7k
 * 77.7k
 * 777k
 * 7.7m
 * 77.7m
 * 777m
 *
 * @param {*} number
 */
export const countAbbreviatedForm = number => {
  if (number >= 100000000) {
    const num = number / 1000000
    return num.toFixed(1).slice(0, -2) + 'm'
  }

  if (number >= 1000000) {
    const num = number / 1000000
    return num.toFixed(2).slice(0, -1) + 'm'
  }

  if (number >= 100000) {
    const num = number / 1000
    return num.toFixed(1).slice(0, -2) + 'k'
  }

  if (number >= 1000) {
    const num = number / 1000
    return num.toFixed(2).slice(0, -1) + 'k'
  }

  return number >= 0 ? number + '' : number
}
