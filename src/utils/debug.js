const debug = (title = '', value) => {
  if (!__DEV__) return

  console.group(title)
  console.log(value)
  console.groupEnd()
}

export default debug
